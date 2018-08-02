<template>
	<div class="pull-refresh" :style="{ transform:`translate3d(0, ${moveH}px, 0)` }">
		<div class="refresh-main">
			<div class="refresh-txt"><i :class="`fa ${clas}`"></i>{{rtxt}}</div>
			<div class="refresh-cont">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
import {TOP_DEFAULT_CONFIG} from '../assets/js/config.js'

export default{
	name: 'refresh',
	props: {
		topConfig: {
			type: Object,
			default: () => {
				return {};
			}
		},
    topLoadMethod: {
      type: Function
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
		_topConfig() {
			return Object.assign({}, TOP_DEFAULT_CONFIG, this.topConfig);
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.rtxt = this._topConfig.pullText;
			this.el = this.$el.querySelector('.refresh-cont');
			this.topLoadMethod.call(this, () => {});
			this.bindTouchEvent();
		},
		bindTouchEvent() {
			this.el.addEventListener('touchstart', this._touchStart);
			this.el.addEventListener('touchmove', this._touchMove);
			this.el.addEventListener('touchend', this._touchEnd);
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
			let m = t.clientY - this.startY;
			if(m > 10 && this.el.scrollTop == 0){
				e.preventDefault();
				e.stopPropagation();
				this.moveH = m;
				if(m > this._topConfig.triggerDistance){
					this.clas = 'fa-long-arrow-down rotate';
					this.rtxt = this._topConfig.triggerText;
				}
			}
		},
		_touchEnd() {
			if(this.moveH > this._topConfig.triggerDistance){
				this.clas = 'fa-spinner fa-spin fa-3x fa-fw';
				this.rtxt = this._topConfig.loadingText;
				this._loadData();
			}else{
				this.scrollTo(0);
			}
		},
		_loadData() {
			this.scrollTo(50);
			this.topLoadMethod.call(this, (flag) => {
				if(flag == 1){
					this.clas = 'fa-check-circle-o';
					this.rtxt = this._topConfig.doneText;
				}else if(flag == 0){
					this.clas = 'fa-times-circle-o';
					this.rtxt = this._topConfig.failText;
				}
				setTimeout(()=>{
					this.scrollTo(0);
				}, this._topConfig.loadedStayTime);
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
.pull-refresh{
  box-sizing: border-box;
	height: 100%;
	padding-top: 50px;
}
.refresh-main{
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
.refresh-cont{
	-webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
	overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.refresh-cont>ul{
	padding: 0 15px;
	line-height: 30px;
	list-style: none;
}
</style>