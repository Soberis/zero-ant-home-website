<template>
  <div class="solutions">
    <h1>{{ $t("solutions.title") }}</h1>
    <p>{{ $t("solutions.introduction") }}</p>

    <section class="solution-list">
      <h2>{{ $t("solutions.header") }}</h2>
      <ul>
        <li>
          <h3>{{ $t("solutions.automation") }}</h3>
          <p>{{ $t("solutions.automationDescription") }}</p>
        </li>
        <li>
          <h3>{{ $t("solutions.efficiency") }}</h3>
          <p>{{ $t("solutions.efficiencyDescription") }}</p>
        </li>
        <li>
          <h3>{{ $t("solutions.accuracy") }}</h3>
          <p>{{ $t("solutions.accuracyDescription") }}</p>
        </li>
        <li>
          <h3>{{ $t("solutions.customization") }}</h3>
          <p>{{ $t("solutions.customizationDescription") }}</p>
        </li>
      </ul>
    </section>

    <section class="case-studies">
      <h2>{{ $t("solutions.caseStudies") }}</h2>
      <p>{{ $t("solutions.caseStudiesDescription") }}</p>
      <ul>
        <li>{{ $t("solutions.caseStudy1") }}</li>
        <li>{{ $t("solutions.caseStudy2") }}</li>
        <li>{{ $t("solutions.caseStudy3") }}</li>
      </ul>
    </section>

    <section class="call-to-action">
      <h2>{{ $t("solutions.contactUs") }}</h2>
      <p>{{ $t("solutions.contactDescription") }}</p>
      <router-link to="/contact" class="btn btn-primary">{{ $t("solutions.getInTouch") }}</router-link>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.solutions {
  padding: 20px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

h2 {
  font-size: 2em;
  margin-top: 30px;
}

.solution-list,
.case-studies {
  margin-bottom: 40px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
}

.call-to-action {
  margin-top: 50px;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #1e6bc9;
  color: white;
  text-decoration: none;
}

.btn:hover {
  background-color: #1a5db0;
}
</style>