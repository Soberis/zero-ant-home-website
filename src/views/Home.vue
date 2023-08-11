<template>
  <div class="home">
    <section class="video-hero">
		<div class="overlay"></div>
			<div class="display-t text-center">
				<div class="display-tc">
					<div class="container">
						<div class="col-md-12 col-md-offset-0">
							<div class="animate-box">
								<h2 class="slogan">简单便捷的头影测量软件</h2>
								<p class="slogan2">带来非同凡响的使用体验</p>
								<p class="btn-g">
                  <a href="https://pc.huazhengcl.com/update/win/%E5%8D%8E%E6%AD%A3%E5%A4%B4%E5%BD%B1%E6%B5%8B%E9%87%8F%20Setup%200.0.1071.exe" class="btn btn-primary btn-lg btn-custom download_btn">下载Windows版</a>
                  <a href="https://pc.huazhengcl.com/update/mac/%E5%8D%8E%E6%AD%A3%E5%A4%B4%E5%BD%B1%E6%B5%8B%E9%87%8F-0.0.1071-mac.zip" class="btn btn-info btn-lg btn-custom download_btn">下载Mac版</a>
                </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    <div class="buttom-info">mac版暂时不支持自动更新，请手动下载最新版使用<br/>(如有疑问，请联系liqingfengzzu@163.com)</div>
  </div>
</template>

<style lang="less" scoped>
.btn {
  width: 180px;
}
.home {
  height: 100%;
  .video-hero {
    height: calc(100% - 80px);
  }

  .download_btn {
    margin-left: 5px;
    margin-right: 5px;
  }
}
@media screen and (max-width: 991px){
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
  color: #aaaaaa;
  font-size: 10px;
}

}
</style>
