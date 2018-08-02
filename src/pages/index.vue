<template>
	<div class="main">
		<header>practice</header>
		<ul class="nav">
			<li>
				<router-link :to="{name:'pageOne'}" class="clear">
					下拉刷新
				</router-link>
			</li>
			<li>
				<router-link :to="{name:'pageTwo'}" class="clear">
					上拉加载
				</router-link>
			</li>
			<li>
				<router-link :to="{name:'pageThree'}" class="clear">
					自动加载
				</router-link>
			</li>
			<li>
				<router-link :to="{name:'pageFour'}" class="clear">
					刷新&自动加载
				</router-link>
			</li>
			<li>
				<router-link :to="{name:'pageFive'}" class="clear">
					侧滑呼出菜单
				</router-link>
			</li>
			<li>
				<router-link :to="{name:'pageSix'}" class="clear">
					刷新&自动加载&侧滑
				</router-link>
			</li>
			<li>
				<router-link :to="{name:'pageSeven'}" class="clear">
					翻页
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style>
ul.nav{
	position: relative;
	padding-top: 50px;
}
ul.nav>li{
	padding: 0 15px;
	line-height: 50px;
}
ul.nav>li>.clear{
	position: relative;
	display: block;
	color: #42B983;;
}
</style>