<template>
	<div class="swipeout">
		<div class="swipeout-item">
			<div class="swipeout-btn-box swipeout-btn-box-left">
				<slot name="left-menu"></slot>
			</div>
			<div class="swipeout-btn-box">
				<slot name="right-menu"></slot>
			</div>
			<div class="swipeout-cont" :style="{ transform:`translate3d(${moveW}px, 0, 0)` }">
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name: 'swipeout',
	props: {
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
			li: '',
			startX: '',
			startY: '',
			moveW: '',
			maxL: '',
			maxR: ''
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.li = this.$el.querySelector('.swipeout-item');
			let box = this.li.children[0];
			this.maxL = box.children[0].children.length * box.children[0].children[0].clientWidth;
			box = this.li.children[1];
			this.maxR = -box.children[0].children.length * box.children[0].children[0].clientWidth;
			this.bindTouchEvent();
		},
		bindTouchEvent() {
			this.li.addEventListener('touchstart', this._touchStart);
			this.li.addEventListener('touchmove', this._touchMove);
			this.li.addEventListener('touchend', this._touchEnd);
		},
		unbindTouchEvent() {
			this.li.removeEventListener('touchstart', this._touchStart);
			this.li.removeEventListener('touchmove', this._touchMove);
			this.li.removeEventListener('touchend', this._touchEnd);
		},
		_touchStart(e) {
			let t = e.changedTouches[0];
			this.startX = t.clientX;
			this.startY = t.clientY;
			this.moveW = 0;
			this.li.children[0].style.display = 'none';
			this.li.children[1].style.display = 'none';
		},
		_touchMove(e) {
			let t = e.changedTouches[0];
			let x = t.clientX - this.startX;
			let y = t.clientY - this.startY;
			if(Math.abs(y) <= 30 && Math.abs(x) >= 10){
				this.banMethod();
				e.preventDefault();
				e.stopPropagation();
				this.moveW = x;
				if(x > 0){
					this.li.children[0].style.display = 'block';
					this.li.children[1].style.display = 'none';
				}else if(x < 0){
					this.li.children[0].style.display = 'none';
					this.li.children[1].style.display = 'block';
				}
			}
		},
		_touchEnd() {
			if(this.moveW < 0){
				this.moveW = this.maxR;
			}else if(this.moveW > 0){
				this.moveW = this.maxL;
			}
			this.unbanMethod();
		}
	}
}
</script>

<style>
.swipeout{
  width: 100%;
  overflow: hidden;
}
.swipeout>.swipeout-item{
	position: relative;
}
.swipeout .swipeout-btn-box{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
	font-size: 0;
	text-align: right;
}
.swipeout .swipeout-btn-box.swipeout-btn-box-left{
	text-align: left;
}
.swipeout .swipeout-btn-box>div{
	height: 100%;
}
.swipeout .swipeout-cont{
	position: relative;
	background-color: #fff;
	-webkit-transition: transform 0.2s;
	-moz-transition: transform 0.2s;
	-ms-transition: transform 0.2s;
	transition: transform 0.2s;
	z-index: 1;
}
.swipeout .swipeout-cont>div{
	padding: 10px;
}
</style>