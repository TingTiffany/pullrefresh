<template>
  <div class="main">
  	<header>vue-refresh-and-load-and-swipeout</header>
  	<refresh-load :top-load-method="refreshData" :bottom-load-method="loadData" :ban-method="ban" :unban-method="unban" ref="freshload">
  		<ul>
				<li class="list-item" v-for="(item, key) in dataLst" v-bind:key="key">
					<swipe-out :ban-method="bans" :unban-method="unbans" ref="swipe">
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
  	</refresh-load>
  </div>
</template>

<script>
import refreshLoad from '@/components/refreshload'
import swipeout from '@/components/swipeout'
import swipeoutButton from '@/components/swipeoutbutton'
export default {
  name: 'pageFour',
  components: {
  	'refresh-load': refreshLoad,
  	'swipe-out': swipeout,
  	'swipeout-button': swipeoutButton
  },
  data(){
  	return {
  		letter:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  		dataLst: [],
  		loadCnt: 0
  	}
  },
	mounted() {
		let c = '';
		for(let i = 0; i < 26; i++){
			c = parseInt(Math.random() * 26);
			this.dataLst.push('item' + this.letter[c]);
		}
	},
  methods: {
  	refreshData(fn) {
			let c = '';
			this.dataLst = [];
			setTimeout(()=>{
				for(let i = 0; i < 26; i++){
					c = parseInt(Math.random() * 26);
					this.dataLst.push('item' + this.letter[c]);
				}
				fn(0);
				this.loadCnt = 0;
			}, 1000);
		},
		loadData(fn) {
			let c = '';
			setTimeout(()=>{
				if(this.loadCnt == 1){
					fn(1);
				}else{
					for(let i = 0; i < 20; i++){
						c = parseInt(Math.random() * 20);
						this.dataLst.push('item' + this.letter[c]);
					}
					if(this.loadCnt >= 5){
						fn(2);
					}else{
						fn(0);
					}
				}
				this.loadCnt += 1;
			}, 1000);
		},
		ban() {
			this.$refs.swipe.forEach(function(ele){
				ele.unbindTouchEvent();
			});
		},
		unban() {
			this.$refs.swipe.forEach(function(ele){
				ele.bindTouchEvent();
			});
		},
		bans() {
			this.$refs.freshload.unbindTouchEvent();
		},
		unbans() {
			this.$refs.freshload.bindTouchEvent();
		}
  }
}
</script>

<style>
</style>
