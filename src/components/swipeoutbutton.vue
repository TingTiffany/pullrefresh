<template>
		<button type="button" :class="`swipeout-btn ${clas}`" :style="`width:${width}px;`"><slot></slot></button>
</template>

<script>
export default {
	name: 'swipeoutButton',
	props: {
		type: {
      type: String,
      default(){
      	return '';
      }
    },
    width: {
    	type: String,
    	default() {
    		return 80;
    	}
    }
	},
  data() {
  	return {
  		clas: ''
  	}
  },
  mounted() {
  	if(this.type == '' || this.type == 'default'){
  		this.clas = 'swipeout-btn-default';
  	}else if(this.type == 'primary'){
  		this.clas = 'swipeout-btn-primary';
  	}else if(this.type == 'warn'){
  		this.clas = 'swipeout-btn-warn';
  	}
  }
}
</script>

<style>
.swipeout-btn{
  height: 100%;
  text-align: center;
  font-size: 14px;
  color: #FFF;
  border: none;
}
.swipeout-btn.swipeout-btn-default{
  background-color: #c8c7cd;
}
.swipeout-btn.swipeout-btn-primary{
	background-color: #1AAD19;
}
.swipeout-btn.swipeout-btn-warn{
	background-color: #E64340;
}
</style>