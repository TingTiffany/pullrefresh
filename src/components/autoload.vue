<template>
	<div class="auto-load">
		<div class="load-main">
			<div class="load-cont">
				<slot></slot>
				<div class="load-txt" v-if="loadState == 0">
					<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
					loading
				</div>
				<div class="fail-txt" v-if="loadState == 1" @click="reload">
					<i class="fa fa-refresh"></i>
					加载失败，点击重新加载
				</div>
				<div class="finish-txt" v-if="loadState == 2">
					no more data
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name: 'load',
	props: {
    bottomLoadMethod: {
      type: Function
    }
	},
	data() {
		return {
			el: '',
			loadState: 0,
			loading: false
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.el = this.$el.querySelector('.load-cont');
			this.bindTouchEvent();
		},
		bindTouchEvent() {
			this.el.addEventListener('scroll', this._scroll);
		},
		unbindTouchEvent() {
			this.el.removeEventListener('scroll', this._scroll);
		},
		_scroll() {
			let sh = this.el.scrollHeight - this.el.scrollTop;
			let ch = this.el.clientHeight + 30;
			if(sh <= ch && !this.loading){
				this._loadData();
			}
			if(this.loadState == 2){
				this.unbindTouchEvent();
			}
		},
		_loadData() {
			this.loading = true;
			this.bottomLoadMethod.call(this, (state) => {
				this.loading = false;
				this.loadState = state;
			});
		},
		reload() {
			this.loadState = 0;
			this.bindTouchEvent();
			this._loadData();
		}
	}
}
</script>

<style>
.auto-load{
  box-sizing: border-box;
	height: 100%;
	padding-top: 50px;
}
.load-main{
	display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
	height: 100%;
}
.load-cont{
	-webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.load-cont>ul{
	padding: 0 15px;
	line-height: 30px;
	list-style: none;
}
.load-cont>.load-txt,
.load-cont>.fail-txt,
.load-cont>.finish-txt{
	line-height: 50px;	
	text-align: center;
}
.load-cont>.load-txt,
.load-cont>.fail-txt{
	color: #42B983;
}
.load-cont>.finish-txt{
	color: #ddd;
}
.load-cont>.load-txt>.fa,
.load-cont>.fail-txt>.fa{
	margin-right: 5px;
	font-size: 16px;
}
</style>