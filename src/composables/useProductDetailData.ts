import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications from "@/data/applications";
import { products } from "@/data/products";
import { videoCards } from "@/data/videos";
import {
  getCustomFeatures,
  getRelatedApplications,
  getRelatedVideos,
  hasProductRelations,
} from "@/data/productRelations";
import { slugToI18nKey } from "@/data/productDetails";
import type {
  ProductCase,
  ProductDetail,
  ProductDownload,
  ProductParam,
} from "@/data/productDetails";

export interface UseProductDetailDataOptions {
  baseDetail?: MaybeRefOrGetter<ProductDetail | null | undefined>;
  showApplications?: MaybeRefOrGetter<boolean>;
  showVideos?: MaybeRefOrGetter<boolean>;
}

function normalizeCollection<T>(value: unknown, fallback: T[]): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === "object") {
    return Object.values(value as Record<string, T>);
  }

  return fallback;
}

export function useProductDetailData(
  slug: MaybeRefOrGetter<string>,
  options: UseProductDetailDataOptions = {}
) {
  const { t, te, tm } = useI18n();
  const router = useRouter();

  const slugValue = computed(() => String(toValue(slug) || ""));
  const currentProduct = computed(() =>
    products.find((item) => item.slug === slugValue.value)
  );
  const baseDetail = computed(() => toValue(options.baseDetail) ?? null);
  const showApplications = computed(() => toValue(options.showApplications) ?? true);
  const showVideos = computed(() => toValue(options.showVideos) ?? true);

  const i18nKey = computed(() => slugToI18nKey(slugValue.value));
  const detailKey = computed(() => `productDetails.${i18nKey.value}`);
  const hasDetailTranslation = computed(() => te(detailKey.value));

  const localizedProduct = computed<ProductDetail | null>(() => {
    if (!hasDetailTranslation.value && !baseDetail.value) {
      return null;
    }

    const fallbackTitle =
      baseDetail.value?.title || (currentProduct.value ? t(currentProduct.value.name) : "");
    const fallbackDesc =
      baseDetail.value?.desc || (currentProduct.value ? t(currentProduct.value.desc) : "");
    const fallbackImage = baseDetail.value?.image || currentProduct.value?.image || "";
    const fallbackFeatures = baseDetail.value?.features || [];
    const fallbackCases = baseDetail.value?.cases || [];
    const fallbackScenes = baseDetail.value?.scenes || [];
    const fallbackParams = baseDetail.value?.params || [];
    const fallbackDownloads = baseDetail.value?.downloads || [];

    const resolveScalar = <T,>(field: "title" | "desc" | "image", fallback: T): T => {
      const fullKey = `${detailKey.value}.${field}`;
      if (!te(fullKey)) {
        return fallback;
      }

      const translated = tm(fullKey);
      return (translated as T) || fallback;
    };

    const resolveCollection = <T,>(
      field: "features" | "cases" | "scenes" | "params" | "downloads",
      fallback: T[]
    ): T[] => {
      const fullKey = `${detailKey.value}.${field}`;
      if (!te(fullKey)) {
        return fallback;
      }

      return normalizeCollection<T>(tm(fullKey), fallback);
    };

    return {
      title: resolveScalar("title", fallbackTitle),
      desc: resolveScalar("desc", fallbackDesc),
      image: resolveScalar("image", fallbackImage),
      features: resolveCollection<string>("features", fallbackFeatures),
      cases: resolveCollection<ProductCase>("cases", fallbackCases),
      scenes: resolveCollection<string>("scenes", fallbackScenes),
      params: resolveCollection<ProductParam>("params", fallbackParams),
      downloads: resolveCollection<ProductDownload>("downloads", fallbackDownloads),
    };
  });

  const detail = localizedProduct;

  const categoryLabel = computed(() =>
    currentProduct.value?.category === "robot"
      ? t("home.coreProducts.robotLabel")
      : t("home.coreProducts.systemLabel")
  );

  const normalizedParams = computed(() =>
    (localizedProduct.value?.params || [])
      .map((param) => (typeof param === "string" ? null : param))
      .filter((param): param is ProductParam => Boolean(param))
  );

  const normalizedDownloads = computed(() =>
    (localizedProduct.value?.downloads || [])
      .map((item) => {
        if (typeof item === "string") {
          return item ? { name: item, url: item } : null;
        }
        return item?.url ? item : null;
      })
      .filter((item): item is ProductDownload => Boolean(item))
  );

  const heroMetrics = computed(() => {
    if (normalizedParams.value.length > 0) {
      return normalizedParams.value.slice(0, 4).map((param) => ({
        label: param.key,
        value: param.value,
      }));
    }

    return (currentProduct.value?.metrics || []).slice(0, 4).map((metric) => ({
      label: t(metric.label),
      value: t(metric.value),
    }));
  });

  const relatedApplications = computed(() => {
    if (!showApplications.value) {
      return [];
    }

    if (hasProductRelations(slugValue.value)) {
      return getRelatedApplications(slugValue.value);
    }

    return applications.slice(0, 6);
  });

  const relatedVideos = computed(() => {
    if (!showVideos.value) {
      return [];
    }

    if (hasProductRelations(slugValue.value)) {
      return getRelatedVideos(slugValue.value);
    }

    return videoCards.slice(0, 6);
  });

  const productFeatures = computed((): string[] => {
    const translatedFeatures = localizedProduct.value?.features || [];
    if (Array.isArray(translatedFeatures) && translatedFeatures.length > 0) {
      return translatedFeatures;
    }

    const customFeatures = getCustomFeatures(slugValue.value);
    if (customFeatures?.length) {
      return customFeatures;
    }

    return baseDetail.value?.features || [];
  });

  const sectionLinks = computed(() => {
    const links = [
      { id: "product-overview", label: t("productDetail.anchorOverview") },
    ];

    if (productFeatures.value.length) {
      links.push({ id: "features-section", label: t("productDetail.anchorFeatures") });
    }
    if (showApplications.value && relatedApplications.value.length) {
      links.push({ id: "applications-section", label: t("productDetail.anchorApplications") });
    }
    if (showVideos.value && relatedVideos.value.length) {
      links.push({ id: "cases-section", label: t("productDetail.anchorCases") });
    }
    if (normalizedParams.value.length) {
      links.push({ id: "parameters-section", label: t("productDetail.anchorParameters") });
    }
    links.push({ id: "downloads-section", label: t("productDetail.anchorDownloads") });

    return links;
  });

  const activeVideoIndex = ref(-1);

  const handleVideoHover = (index: number) => {
    activeVideoIndex.value = index;
  };

  const handleVideoLeave = () => {
    activeVideoIndex.value = -1;
  };

  const handleVideoClick = (index: number) => {
    const video = relatedVideos.value[index];
    if (video) {
      router.push(`/video/${video.slug}`);
    }
  };

  return {
    slug: slugValue,
    currentProduct,
    detail,
    localizedProduct,
    categoryLabel,
    normalizedParams,
    normalizedDownloads,
    heroMetrics,
    sectionLinks,
    relatedApplications,
    relatedVideos,
    productFeatures,
    activeVideoIndex,
    handleVideoHover,
    handleVideoLeave,
    handleVideoClick,
  };
}
