import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications from "@/data/applications";
import { videoCards } from "@/data/videos";
import {
  getRelatedApplications,
  getRelatedVideos,
  hasProductRelations,
} from "@/data/productRelations";
import { createEmptyProductDetail, slugToI18nKey } from "@/data/productDetails";
import { getProductCenterCardById } from "@/data/product-center";
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
  const { t, te, tm, locale } = useI18n();
  const router = useRouter();

  const slugValue = computed(() => String(toValue(slug) || ""));
  const currentProduct = computed(() => {
    const record = getProductCenterCardById(slugValue.value);
    if (!record) {
      return null;
    }

    return {
      slug: record.card.id,
      image: record.card.image,
      familyId: record.familyId,
      familyTitle: record.familyTitle,
      title: record.card.title,
      summary: record.card.summary,
      metrics: [],
    };
  });
  const baseDetail = computed(() => toValue(options.baseDetail) ?? null);
  const showApplications = computed(() => toValue(options.showApplications) ?? true);
  const showVideos = computed(() => toValue(options.showVideos) ?? true);

  const i18nKey = computed(() => slugToI18nKey(slugValue.value));
  const detailKey = computed(() => `productDetails.${i18nKey.value}`);
  const hasDetailTranslation = computed(() => te(`${detailKey.value}.title`));

  const createFallbackDetail = (): ProductDetail | null => {
    if (!currentProduct.value) {
      return null;
    }

    const detail = createEmptyProductDetail();
    detail.title =
      t(`productDetails.${slugValue.value}.title`) ||
      (locale.value === "en"
        ? currentProduct.value.title.en
        : currentProduct.value.title.zh);
    detail.desc =
      t(`productDetails.${slugValue.value}.desc`) ||
      (locale.value === "en"
        ? currentProduct.value.summary.en
        : currentProduct.value.summary.zh);
    detail.image = currentProduct.value.image;
    return detail;
  };

  const localizedProduct = computed<ProductDetail | null>(() => {
    if (!hasDetailTranslation.value && !baseDetail.value) {
      return createFallbackDetail();
    }

    const fallbackTitle =
      baseDetail.value?.title ||
      (currentProduct.value
        ? (te(`${detailKey.value}.title`)
            ? String(tm(`${detailKey.value}.title`))
            : locale.value === "en"
              ? currentProduct.value.title.en
              : currentProduct.value.title.zh)
        : "");
    const fallbackDesc =
      baseDetail.value?.desc ||
      (currentProduct.value
        ? (te(`${detailKey.value}.desc`)
            ? String(tm(`${detailKey.value}.desc`))
            : locale.value === "en"
              ? currentProduct.value.summary.en
              : currentProduct.value.summary.zh)
        : "");
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
      const translated = tm(fullKey);
      const normalized = normalizeCollection<T>(translated, fallback);
      return normalized.length > 0 ? normalized : fallback;
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

  const categoryLabel = computed(() => {
    if (!currentProduct.value) {
      return "";
    }

    return locale.value === "en"
      ? currentProduct.value.familyTitle.en
      : currentProduct.value.familyTitle.zh;
  });

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

    return [];
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

    return videoCards.slice(0, 3);
  });

  const productFeatures = computed((): string[] => {
    return localizedProduct.value?.features || baseDetail.value?.features || [];
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
    relatedApplications,
    relatedVideos,
    productFeatures,
    activeVideoIndex,
    handleVideoHover,
    handleVideoLeave,
    handleVideoClick,
  };
}
