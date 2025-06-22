<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="@/assets/zeroant_logo.png" alt="Zero Ant Logo" />
      </div>
      <div class="footer-links">
        <a href="#">{{ $t("footer.home") }}</a>
        <a href="#">{{ $t("footer.products") }}</a>
        <a href="#">{{ $t("footer.solutions") }}</a>
        <a href="#">{{ $t("footer.applications") }}</a>
        <a href="#">{{ $t("footer.about") }}</a>
        <a href="#">{{ $t("footer.contact") }}</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Zero Ant. {{ $t("footer.rightsReserved") }}</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-logo img {
  width: 100px;
}

.footer-links {
  display: flex;
  gap: 15px;
}

.footer-links a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.footer-links a:hover {
  color: #1e6bc9;
}

.footer-bottom {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}
</style>