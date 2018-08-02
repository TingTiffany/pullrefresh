<template>
  <div class="main">
  	<header>vue-pull-down-refresh</header>
  	<pull-refresh :top-load-method="refreshData" :top-config="tconfig">
  		<ul>
				<li class="list-item" v-for="(item, key) in dataLst" v-bind:key="key">{{item}}</li>
			</ul>
  	</pull-refresh>
  </div>
</template>

<script>
import pullRefresh from '@/components/pullrefresh'
export default {
  name: 'pageOne',
  components: {
  	'pull-refresh': pullRefresh
  },
  data(){
  	return {
  		dataLst: [],
  		tconfig: {
  			pullText: 'pull to refresh',
			  triggerText: 'release to refresh',
			  loadingText: 'loading...',
			  doneText: 'loaded successfully',
			  failText: 'loaded failed',
			  loadedStayTime: 800, // 加载完后停留的时间ms
			  triggerDistance: 100 // 下拉刷新触发的距离
  		}
  	}
  },
  methods: {
  	refreshData(fn) {
			let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			let c = '';
			setTimeout(()=>{
				this.dataLst = [];
				for(let i = 0; i < 26; i++){
					c = parseInt(Math.random() * 26);
					this.dataLst.push('item' + letter[c]);
				}
				fn(1);
			}, 1000);
		}
  }
}
</script>

<style>
</style>
