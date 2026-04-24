import { createRouter, createWebHistory } from "vue-router";

import { registerRouterGuards } from "./guards";
import { routes } from "./routes";
import { preserveScrollForNextNavigation, scrollBehavior } from "./scrollBehavior";

export { preserveScrollForNextNavigation };

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

registerRouterGuards(router);

export default router;
