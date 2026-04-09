import { computed } from "vue";
import { useRoute } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import {
  getLocaleFromPath,
  localizeRouteLocation,
  withLocalePrefix,
} from "@/utils/localeRoute";

export function useLocalizedPath() {
  const route = useRoute();

  const currentLocale = computed(() => getLocaleFromPath(route.path));

  const localizePath = (path: string) => withLocalePrefix(path, currentLocale.value);
  const localizeTo = (to: RouteLocationRaw) =>
    localizeRouteLocation(to, currentLocale.value);

  return {
    currentLocale,
    localizePath,
    localizeTo,
  };
}
