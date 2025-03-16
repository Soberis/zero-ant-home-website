\views\Home.vue
<template>
  <div class="home">
    <section class="video-hero">
      <div class="overlay"></div>
      <div class="display-t text-center">
        <div class="display-tc">
          <div class="container">
            <div class="col-md-12 col-md-offset-0">
              <div class="animate-box">
                <h2 class="slogan">{{ $t("slogan") }}</h2>
                <p class="slogan2">{{ $t("slogan2") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="buttom-info">
      {{ $t("contact", { email: "liqingfengzzu@163.com" }) }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn {
  width: 180px;
}
.home {
  height: 100%;
  .video-hero {
    height: calc(100% - 30px);
  }

  .download_btn {
    margin-left: 5px;
    margin-right: 5px;
  }
}
@media screen and (max-width: 991px) {
  .animate-box {
    .slogan {
      font-size: 22px;
    }
    .slogan2 {
      font-size: 18px;
    }
    .btn-g {
      .btn {
        width: 150px;
        height: 50px;
        font-size: 12px;
      }
    }
  }
  .buttom-info {
    margin-top: 10px;
  }
}
</style>
