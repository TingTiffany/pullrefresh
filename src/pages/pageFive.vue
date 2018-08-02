<template>
  <div class="main">
  	<header>vue-swipeout</header>
  	<ul class="demo-cont">
			<li v-for="(item, key) in dataLst" v-bind:key="key">
				<swipe-out>
					<div slot="left-menu">
						<swipeout-button type="primary" width="70">收藏</swipeout-button>
						<swipeout-button type="warn" width="70">删除</swipeout-button>
						<swipeout-button type="default" width="70">忽略</swipeout-button>
					</div>
					<div slot="right-menu">
						<swipeout-button type="warn" width="70">删除</swipeout-button>
					</div>
					<div slot="content">{{item}}</div>
				</swipe-out>
			</li>
		</ul>
  </div>
</template>

<script>
import swipeout from '@/components/swipeout'
import swipeoutButton from '@/components/swipeoutbutton'
export default {
  name: 'pageFour',
  components: {
  	'swipe-out': swipeout,
  	'swipeout-button': swipeoutButton
  },
  data(){
  	return {
  		letter:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  		dataLst: []
  	}
  },
	mounted() {
		let c = '';
		for(let i = 0; i < 10; i++){
			c = parseInt(Math.random() * 10);
			this.dataLst.push('item' + this.letter[c]);
		}
	}
}
</script>

<style>
.demo-cont{
	box-sizing: border-box;
	height: 100%;
	padding-top: 50px;
	line-height: 30px;
	list-style: none;
}
</style>
