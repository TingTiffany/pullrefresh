<template>
  <div class="main">
  	<header>vue-refresh-and-load</header>
  	<refresh-load :top-load-method="refreshData" :bottom-load-method="loadData">
  		<ul>
				<li class="list-item" v-for="(item, key) in dataLst" v-bind:key="key">{{item}}</li>
			</ul>
  	</refresh-load>
  </div>
</template>

<script>
import refreshLoad from '@/components/refreshload'
export default {
  name: 'pageFour',
  components: {
  	'refresh-load': refreshLoad
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
			setTimeout(()=>{
				this.dataLst = [];
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
		}
  }
}
</script>

<style>
</style>
