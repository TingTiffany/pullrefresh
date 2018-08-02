<template>
  <div class="main">
  	<header>vue-auto-load</header>
  	<auto-load :bottom-load-method="loadData">
  		<ul class="list">
				<li class="list-item" v-for="(item, key) in dataLst" v-bind:key="key">{{item}}</li>
			</ul>
  	</auto-load>
  </div>
</template>

<script>
import autoLoad from '@/components/autoload'
export default {
  name: 'pageThree',
  components: {
  	'auto-load': autoLoad
  },
  data(){
  	return {
  		dataLst: [],
  		loadCnt: 0
  	}
  },
  mounted() {
  	let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			let c = '';
			for(let i = 0; i < 26; i++){
				c = parseInt(Math.random() * 26);
				this.dataLst.push('item' + letter[c]);
			}
  },
  methods: {
  	loadData(fn) {
			let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			let c = '';
			setTimeout(()=>{
				if(this.loadCnt == 1){
					fn(1);
				}else{
					for(let i = 0; i < 26; i++){
						c = parseInt(Math.random() * 26);
						this.dataLst.push('item' + letter[c]);
					}
					if(this.loadCnt >= 5){
						fn(2);
					}else{
						fn(0);
					}
				}
				this.loadCnt += 1;
			}, 1000);
		}
  }
}
</script>

<style>
</style>
