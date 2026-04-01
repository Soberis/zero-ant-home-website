<template>
  <section class="route-not-found">
    <div class="route-not-found__card">
      <p class="route-not-found__eyebrow">{{ eyebrow }}</p>
      <h1 class="route-not-found__title">{{ title }}</h1>
      <p class="route-not-found__desc">{{ description }}</p>
      <RouterLink class="btn btn-primary route-not-found__action" :to="to">
        {{ actionLabel }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router";

withDefaults(
  defineProps<{
    title: string;
    description: string;
    actionLabel: string;
    to: RouteLocationRaw;
    eyebrow?: string;
  }>(),
  {
    eyebrow: "404",
  }
);
</script>

<style scoped>
.route-not-found {
  width: 100%;
  min-height: calc(100vh - var(--nav-height) - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px 96px;
  background:
    radial-gradient(circle at top, rgba(20, 54, 127, 0.08), transparent 38%),
    #ffffff;
}

.route-not-found__card {
  width: min(100%, 640px);
  text-align: center;
  padding: 56px 40px;
  border-radius: 28px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.08);
}

.route-not-found__eyebrow {
  margin: 0 0 18px;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  color: #14367f;
}

.route-not-found__title {
  margin: 0;
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
}

.route-not-found__desc {
  margin: 20px auto 0;
  max-width: 460px;
  color: #64748b;
  font-size: 1.02rem;
  line-height: 1.75;
}

.route-not-found__action {
  display: inline-flex;
  margin-top: 30px;
  min-width: 190px;
  justify-content: center;
}

@media (max-width: 768px) {
  .route-not-found {
    min-height: calc(100vh - var(--nav-height) - 72px);
    padding: 32px 16px 72px;
  }

  .route-not-found__card {
    padding: 40px 24px;
    border-radius: 22px;
  }

  .route-not-found__desc {
    font-size: 0.98rem;
  }

  .route-not-found__action {
    width: 100%;
  }
}
</style>
