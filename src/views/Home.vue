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
      {{ $t("contact", { email: "liqingfeng@zeroant.com" }) }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn {
  width: 180px;
}
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .video-hero {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full screen height */
  }

  .display-t {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .display-tc {
    text-align: center;
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
