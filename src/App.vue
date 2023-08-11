<script setup lang="ts">

</script>

<template>
<div id="app" class="page">
      <nav class="colorlib-nav" role="navigation">
			<div class="top-menu">
				<div class="container">
					<div class="row">
            <div class="col-md-2">
							<div id="colorlib-logo">
                <router-link to="/">华正头影</router-link>
              </div>
						</div>
					</div>
				</div>
			</div>
		</nav>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}

</style>
