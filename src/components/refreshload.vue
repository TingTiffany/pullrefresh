<template>
	<div class="refresh-load" :style="{ transform:`translate3d(0, ${moveH}px, 0)` }">
		<div class="refresh-load-main">
			<div class="refresh-txt"><i :class="`fa ${clas}`"></i>{{rtxt}}</div>
			<div class="scroll-cont">
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
import {TOP_DEFAULT_CONFIG} from '../assets/js/config.js'

export default{
	name: 'refreshLoad',
	props: {
		topConfig: {
			type: Object,
			default: () => {
				return {};
			}
		},
    topLoadMethod: {
      type: Function
    },
    bottomLoadMethod: {
      type: Function
    },
    banMethod: {
    	type: Function,
			default: () => {}
    },
    unbanMethod: {
    	type: Function,
			default: () => {}
    }
	},
	data() {
		return {
			rtxt: '',
			el: '',
			startX: '',
			startY: '',
			moveH: '',
			clas: 'fa-long-arrow-down',
			loadState: 0,
			loading: false
		}
	},
	computed: {
		_topConfig() {
			return Object.assign({}, TOP_DEFAULT_CONFIG, this.topConfig);
		}
	},
	watch: {
		loadState(val) {
			if(val == 2){
				this.unbindTouchEvent();
			}else{
				this.bindTouchEvent();
			}
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.rtxt = this._topConfig.pullText;
			this.el = this.$el.querySelector('.scroll-cont');
			this.bindTouchEvent();
		},
		bindTouchEvent() {
			this.el.addEventListener('touchstart', this._touchStart);
			this.el.addEventListener('touchmove', this._touchMove);
			this.el.addEventListener('touchend', this._touchEnd);
			this.el.addEventListener('scroll', this._scroll);
		},
		unbindTouchEvent() {
			this.el.removeEventListener('touchstart', this._touchStart);
			this.el.removeEventListener('touchmove', this._touchMove);
			this.el.removeEventListener('touchend', this._touchEnd);
			this.el.removeEventListener('scroll', this._scroll);
		},
		_touchStart(e) {
			let t = e.changedTouches[0];
			this.startX = t.clientX;
			this.startY = t.clientY;
			this.clas = 'fa-long-arrow-down';
			this.rtxt = this._topConfig.pullText;
		},
		_touchMove(e) {
			let t = e.changedTouches[0];
			let x = t.clientX - this.startX;
			let y = t.clientY - this.startY;
			if(y > 30 && y > Math.abs(x) && this.el.scrollTop == 0){
				this.banMethod();
				e.preventDefault();
				e.stopPropagation();
				this.moveH = y;
				if(y > this._topConfig.triggerDistance){
					this.clas = 'fa-long-arrow-down rotate';
					this.rtxt = this._topConfig.triggerText;
				}
			}
		},
		_touchEnd() {
			if(this.moveH > this._topConfig.triggerDistance){
				this.clas = 'fa-spinner fa-spin fa-3x fa-fw';
				this.rtxt = this._topConfig.loadingText;
				this.loadState = 3;
				this._refreshData();
			}else{
				this.scrollTo(0);
			}
		},
		_scroll() {
			this.banMethod();
			let sh = this.el.scrollHeight - this.el.scrollTop;
			let ch = this.el.clientHeight + 30;
			if(sh <= ch && !this.loading && this.loadState != 1){
				this._loadData();
			}
		},
		_refreshData() {
			this.scrollTo(50);
			this.topLoadMethod.call(this, (state) => {
				this.loadState = state;
				if(state == 0){
					this.clas = 'fa-check-circle-o';
					this.rtxt = this._topConfig.doneText;
				}else if(state == 1){
					this.clas = 'fa-times-circle-o';
					this.rtxt = this._topConfig.failText;
				}
				setTimeout(()=>{
					this.scrollTo(0);
				}, this._topConfig.loadedStayTime);
			});
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
			this._loadData();
		},
		scrollTo(y, duration = 200) {
			this.unbanMethod();
			this.$el.style.transition = `${duration}ms`;
      this.moveH = y;
      setTimeout(() => {
        this.$el.style.transition = '';
      }, duration);
		}
	}
}
</script>

<style>
.refresh-load{
  box-sizing: border-box;
	height: 100%;
	padding-top: 50px;
}
.refresh-load-main{
	display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
	height: 100%;
}
.refresh-txt{
	margin-top: -50px;
	line-height: 50px;	
	text-align: center;
	color: #42B983;
}
.refresh-txt>.fa{
	margin-right: 5px;
	font-size: 16px;
}
.refresh-txt>.fa.rotate{
	-webkit-transition: transform 0.3s ease;
	-moz-transition: transform 0.3s ease;
	-ms-transition: transform 0.3s ease;
	transition: transform 0.3s ease;
	-webkit-transform: rotate(180deg);
	-moz-transform: rotate(180deg);
	-ms-transform: rotate(180deg);
	transform: rotate(180deg);
}
.scroll-cont{
	-webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
	overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.scroll-cont>ul{
	padding: 0 15px;
	line-height: 30px;
	list-style: none;
}
.scroll-cont>.load-txt,
.scroll-cont>.fail-txt,
.scroll-cont>.finish-txt{
	line-height: 50px;	
	text-align: center;
}
.scroll-cont>.load-txt,
.scroll-cont>.fail-txt{
	color: #42B983;
}
.scroll-cont>.finish-txt{
	color: #ddd;
}
.scroll-cont>.load-txt>.fa,
.scroll-cont>.fail-txt>.fa{
	margin-right: 5px;
	font-size: 16px;
}
</style>