<template>
  <div class="main">
  	<header>vue-pull-up-load</header>
  	<pull-load :bottom-load-method="loadData" :bottom-config="bconfig" :finish-load="isFinish">
  		<ul>
				<li class="list-item" v-for="(item, key) in dataLst" v-bind:key="key">{{item}}</li>
			</ul>
  	</pull-load>
  </div>
</template>

<script>
import pullLoad from '@/components/pullload'
export default {
  name: 'pageTwo',
  components: {
  	'pull-load': pullLoad
  },
  data(){
  	return {
  		dataLst: [],
  		bconfig: {
  			pullText: 'pull up loading',
			  triggerText: 'release to refresh',
			  loadingText: 'loading...',
			  doneText: 'loaded successfully',
			  failText: 'loaded failed',
			  loadedStayTime: 800, // 加载完后停留的时间ms
			  triggerDistance: 100 // 下拉刷新触发的距离
  		},
  		loadCnt: 0,
  		isFinish: false
  	}
  },
  methods: {
  	loadData(fn) {
			let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			let c = '';
			setTimeout(()=>{
				this.loadCnt += 1;
				for(let i = 0; i < 26; i++){
					c = parseInt(Math.random() * 26);
					this.dataLst.push('item' + letter[c]);
				}
				fn(1);
				if(this.loadCnt >= 5){
					this.isFinish = true;
				}
			}, 1000);
		}
  }
}
</script>

<style>
</style>
