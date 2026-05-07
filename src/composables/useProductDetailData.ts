import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";
import { useI18n } from "vue-i18n";
import applications from "@/data/applications";
import { videoCards } from "@/data/videos";
import {
  getRelatedApplications,
  getRelatedVideos,
  hasProductRelations,
} from "@/data/productRelations";
import { getProductCenterCardById } from "@/data/product-center";
import type {
  ProductCase,
  ProductDetail,
  ProductDownload,
  ProductFeature,
  ProductParam,
} from "@/data/productDetails";

interface UseProductDetailDataOptions {
  baseDetail?: MaybeRefOrGetter<ProductDetail | null | undefined>;
  showApplications?: MaybeRefOrGetter<boolean>;
  showVideos?: MaybeRefOrGetter<boolean>;
}

export function normalizeCollection<T>(value: unknown, fallback: T[]): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  // 仅处理纯对象（排除 null、Date、RegExp 等），避免 Object.values 产生空数组
  if (
    value !== null &&
    typeof value === "object" &&
    (value as object).constructor === Object
  ) {
    return Object.values(value as Record<string, T>);
  }

  return fallback;
}

export function useProductDetailData(
  slug: MaybeRefOrGetter<string>,
  options: UseProductDetailDataOptions = {}
) {
  const { t, te, tm } = useI18n();

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
      familyTitleKey: record.familyTitleKey,
      titleKey: record.card.titleKey,
      summaryKey: record.card.summaryKey,
      metrics: [],
    };
  });
  const baseDetail = computed(() => toValue(options.baseDetail) ?? null);
  const showApplications = computed(() => toValue(options.showApplications) ?? true);
  const showVideos = computed(() => toValue(options.showVideos) ?? true);

  const i18nKey = slugValue;
  const detailKey = computed(() => `productDetails.${i18nKey.value}`);
  const hasDetailTranslation = computed(() => te(`${detailKey.value}.title`));

  const createFallbackDetail = (): ProductDetail | null => {
    if (!currentProduct.value) {
      return null;
    }

    return {
      title: te(`${detailKey.value}.title`)
        ? t(`${detailKey.value}.title`)
        : t(currentProduct.value.titleKey),
      desc: te(`${detailKey.value}.desc`)
        ? t(`${detailKey.value}.desc`)
        : t(currentProduct.value.summaryKey),
      image: currentProduct.value.image,
      features: [],
      cases: [],
      scenes: [],
      params: [],
      downloads: [],
    };
  };

  const localizedProduct = computed<ProductDetail | null>(() => {
    if (!hasDetailTranslation.value && !baseDetail.value) {
      return createFallbackDetail();
    }

    const fallbackTitle =
      baseDetail.value?.title ||
      (currentProduct.value
        ? (te(`${detailKey.value}.title`)
            ? (typeof tm(`${detailKey.value}.title`) === "string"
              ? tm(`${detailKey.value}.title`) as string
              : t(currentProduct.value.titleKey))
            : t(currentProduct.value.titleKey))
        : "");
    const fallbackDesc =
      baseDetail.value?.desc ||
      (currentProduct.value
        ? (te(`${detailKey.value}.desc`)
            ? (typeof tm(`${detailKey.value}.desc`) === "string"
              ? tm(`${detailKey.value}.desc`) as string
              : t(currentProduct.value.summaryKey))
            : t(currentProduct.value.summaryKey))
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
      // tm() 可能返回嵌套对象而非原始值，需要运行时类型检查
      if (typeof translated === "string") {
        return translated as T;
      }
      return fallback;
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
      features: resolveCollection<string | ProductFeature>("features", fallbackFeatures),
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

    return t(currentProduct.value.familyTitleKey);
  });

  const normalizedParams = computed(() =>
    (localizedProduct.value?.params || [])
      .map((param) => (typeof param === "string" ? null : param))
      .filter(
        (param): param is ProductParam =>
          param !== null && Boolean(param.key) && Boolean(param.value)
      )
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

  const productFeatures = computed((): Array<string | ProductFeature> => {
    return localizedProduct.value?.features || baseDetail.value?.features || [];
  });

  const activeVideoIndex = ref(-1);

  const handleVideoHover = (index: number) => {
    activeVideoIndex.value = index;
  };

  const handleVideoLeave = () => {
    activeVideoIndex.value = -1;
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
  };
}
