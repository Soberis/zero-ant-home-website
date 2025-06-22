<template>
  <div class="applications">
    <h1>{{ $t("applications.title") }}</h1>
    <p>{{ $t("applications.introduction") }}</p>

    <section class="application-list">
      <h2>{{ $t("applications.listTitle") }}</h2>
      <ul>
        <li>
          <h3>{{ $t("applications.autoParts.title") }}</h3>
          <p>{{ $t("applications.autoParts.description") }}</p>
        </li>
        <li>
          <h3>{{ $t("applications.electronics.title") }}</h3>
          <p>{{ $t("applications.electronics.description") }}</p>
        </li>
        <li>
          <h3>{{ $t("applications.metal.title") }}</h3>
          <p>{{ $t("applications.metal.description") }}</p>
        </li>
        <li>
          <h3>{{ $t("applications.food.title") }}</h3>
          <p>{{ $t("applications.food.description") }}</p>
        </li>
        <li>
          <h3>{{ $t("applications.medical.title") }}</h3>
          <p>{{ $t("applications.medical.description") }}</p>
        </li>
        <li>
          <h3>{{ $t("applications.retail.title") }}</h3>
          <p>{{ $t("applications.retail.description") }}</p>
        </li>
      </ul>
    </section>

    <section class="conclusion">
      <h2>{{ $t("applications.conclusionTitle") }}</h2>
      <p>{{ $t("applications.conclusionText") }}</p>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.applications {
  padding: 20px;
}

.application-list {
  margin-top: 20px;
}

.application-list ul {
  list-style-type: none;
  padding: 0;
}

.application-list li {
  margin-bottom: 15px;
}

.application-list h3 {
  margin: 0;
  font-size: 20px;
}

.conclusion {
  margin-top: 30px;
}
</style>