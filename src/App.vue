<template>
  <div id="app">
  	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body{
	height: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
ul{
	margin: 0;
	padding: 0;
}
#app,
.main{
	height: 100%;
}
header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
	color: #fff;
	background-color: #42B983;
	z-index: 1;
}
.clearfix{
	zoom: 1;	
}
.clearfix:after{
	content: '';
	display: block;
	visibility: visible;
	height: 0;
	clear: both;
}
.pull-left{
	float: left;
}
</style>
