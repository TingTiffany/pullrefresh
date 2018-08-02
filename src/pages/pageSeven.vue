<template>
	<ul class="page" :style="`transform:translateY(${moveH+'%'})`">
		<li class="one">
			<div class="arrow">
				<i class="icon" @click="nextPage"></i>
			</div>
		</li>
		<li class="two">
			<div class="arrow">
				<i class="icon" @click="nextPage"></i>
			</div>
		</li>
		<li class="three">
			<div class="arrow">
				<i class="icon" @click="nextPage"></i>
			</div>
		</li>
		<li class="four"></li>
	</ul>
</template>

<script>
	export default {
		name: 'pageSeven',
		data() {
			return {
				moveH: 0,
				startY: 0,
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init(){
				this.$el.addEventListener('touchstart', this._touchStart);
				this.$el.addEventListener('touchend', this._touchEnd);
			},
			_touchStart(e) {
				let t = e.changedTouches[0];
				this.startY = t.clientY;
			},
			_touchEnd(e) {
				let t = e.changedTouches[0],
						moveY = t.clientY - this.startY;
				if(moveY <= -100){
					this.nextPage();
				}else if(moveY >= 100){
					this.prevPage();
				}
			},
			nextPage() {
				if(this.moveH > -300){
					this.moveH -= 100;	
				}
			},
			prevPage() {
				if(this.moveH < 0){
					this.moveH += 100;	
				}
			}
		}
	}
</script>

<style>
ul.page{
	width: 100%;
	height: 100%;
	transition: transform .5s ease-in;
}
ul.page>li{
	position: relative;
	width: 100%;
	height: 100%;
}
ul.page>li.one{
	background-color: #f9cfc3;
}
ul.page>li.two{
	background-color: #fd9f84;
}
ul.page>li.three{
	background-color: #fd8a68;
}
ul.page>li.four{
	background-color: #f77a57;
}
ul.page .arrow{
	position: absolute;
	bottom: -25px;
	width: 100%;
	text-align: center;
}
ul.page .arrow>.icon{
	display: inline-block;
	position: relative;
	border-width: 30px;
	border-style: solid;
	border-color: #fff transparent transparent transparent;
	animation: move 1s linear infinite;
}
ul.page .arrow>.icon:after{
	content: '';
	display: inline-block;
	position: absolute;
	top: -40px;
  left: -30px;
	border-width: 30px;
	border-style: solid;
}
ul.page>li.one>.arrow>.icon:after{
	border-color: #f9cfc3 transparent transparent transparent;
}
ul.page>li.two>.arrow>.icon:after{
	border-color: #fd9f84 transparent transparent transparent;
}
ul.page>li.three>.arrow>.icon:after{
	border-color: #fd8a68 transparent transparent transparent;
}
ul.page>li.four>.arrow>.icon:after{
	border-color: #f77a57 transparent transparent transparent;
}
@keyframes move{
	0%{
		transform: translateY(0);
	}
	50%{
		transform: translateY(-10px);
	}
	100%{
		transform: translateY(0);
	}
}
</style>