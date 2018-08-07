<template>
  <div id="app" class="page">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
      <nav class="colorlib-nav" role="navigation">
			<div class="top-menu">
				<div class="container">
					<div class="row">
            <div class="col-md-2">
							<div id="colorlib-logo">
                <router-link to="/">华正头影</router-link>
              </div>
						</div>
						<!-- <div class="col-md-2">
							<div id="colorlib-logo"><a href="index.html">Unapp</a></div>
						</div>
						<div class="col-md-10 text-right menu-1">
							<ul>
								<li class="active"><a href="index.html">Home</a></li>
								<li class="has-dropdown">
									<a href="work.html">Works</a>
									<ul class="dropdown">
										<li><a href="work-grid.html">Works grid with text</a></li>
										<li><a href="work-grid-without-text.html">Works grid w/o text</a></li>
									</ul>
								</li>
								<li><a href="services.html">Services</a></li>
								<li><a href="blog.html">Blog</a></li>
								<li><a href="about.html">About</a></li>
								<li><a href="shop.html">Shop</a></li>
								<li><a href="contact.html">Contact</a></li>
							</ul>
						</div> -->
					</div>
				</div>
			</div>
		</nav>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
