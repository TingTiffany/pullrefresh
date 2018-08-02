<template>
	<div class="pull-load" :style="{ transform:`translate3d(0, ${moveH}px, 0)` }">
		<div class="load-main">
			<div class="load-cont">
				<slot></slot>
				<div class="finish-txt" v-if="finishLoad">no more data</div>
			</div>
			<div class="load-txt" v-if="!finishLoad"><i :class="`fa ${clas}`"></i>{{rtxt}}</div>
		</div>
	</div>
</template>

<script>
import {BOTTOM_DEFAULT_CONFIG} from '../assets/js/config.js'

export default{
	name: 'load',
	props: {
		bottomConfig: {
			type: Object,
			default: () => {
				return {};
			}
		},
    bottomLoadMethod: {
      type: Function
    },
    finishLoad: {
    	type: Boolean,
    	default: () => {
    		return false;
    	}
    }
	},
	data() {
		return {
			rtxt: '',
			el: '',
			startX: '',
			startY: '',
			moveH: '',
			clas: 'fa-long-arrow-down'
		}
	},
	computed: {
		_bottomConfig() {
			return Object.assign({}, BOTTOM_DEFAULT_CONFIG, this.bottomConfig);
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.rtxt = this._bottomConfig.pullText;
			this.el = this.$el.querySelector('.load-cont');
			this.bottomLoadMethod.call(this, () => {});
			this.bindTouchEvent();
		},
		bindTouchEvent() {
			this.el.addEventListener('touchstart', this._touchStart);
			this.el.addEventListener('touchmove', this._touchMove);
			this.el.addEventListener('touchend', this._touchEnd);
		},
		unbindTouchEvent() {
			this.el.removeEventListener('touchstart', this._touchStart);
			this.el.removeEventListener('touchmove', this._touchMove);
			this.el.removeEventListener('touchend', this._touchEnd);
		},
		_touchStart(e) {
			let t = e.changedTouches[0];
			this.startX = t.clientX;
			this.startY = t.clientY;
			this.clas = 'fa-long-arrow-down';
			this.rtxt = this._bottomConfig.pullText;
		},
		_touchMove(e) {
			let t = e.changedTouches[0];
			let m = t.clientY - this.startY;
			let sh = this.el.scrollHeight - this.el.scrollTop;
			let ch = this.el.clientHeight;
			if(m < 10 && sh == ch){
				e.preventDefault();
				e.stopPropagation();
				this.moveH = m;
				if(-m > this._bottomConfig.triggerDistance){
					this.clas = 'fa-long-arrow-down rotate';
					this.rtxt = this._bottomConfig.triggerText;
				}
			}
		},
		_touchEnd() {
			if(this.finishLoad){
				this.unbindTouchEvent();
			}else{
				if(-this.moveH > this._bottomConfig.triggerDistance){
					this.clas = 'fa-spinner fa-spin fa-3x fa-fw';
					this.rtxt = this._bottomConfig.loadingText;
					this._loadData();
				}else{
					this.scrollTo(0);
				}
			}
		},
		_loadData() {
			this.scrollTo(-50);
			this.bottomLoadMethod.call(this, (flag) => {
				if(flag == 1){
					this.clas = 'fa-check-circle-o';
					this.rtxt = this._bottomConfig.doneText;
				}else if(flag == 0){
					this.clas = 'fa-times-circle-o';
					this.rtxt = this._bottomConfig.failText;
				}
				setTimeout(()=>{
					this.scrollTo(0);
				}, this._bottomConfig.loadedStayTime);
			});
		},
		scrollTo(y, duration = 200) {
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
.pull-load{
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
.load-txt{
	margin-bottom: -50px;
	line-height: 50px;	
	text-align: center;
	color: #42B983;
}
.finish-txt{
	line-height: 50px;	
	text-align: center;
	color: #ddd;
}
.load-txt>.fa{
	margin-right: 5px;
	font-size: 16px;
}
.load-txt>.fa.rotate{
	-webkit-transition: transform 0.3s ease;
	-moz-transition: transform 0.3s ease;
	-ms-transition: transform 0.3s ease;
	transition: transform 0.3s ease;
	-webkit-transform: rotate(180deg);
	-moz-transform: rotate(180deg);
	-ms-transform: rotate(180deg);
	transform: rotate(180deg);
}
.load-cont{
	-webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
	overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.load-cont>ul{
	padding: 0 15px;
	line-height: 30px;
	list-style: none;
}
</style>