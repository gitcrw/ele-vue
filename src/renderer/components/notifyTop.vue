<template>
	<div class="notify-box">
		<div class="popup" @click="show = false" v-show="show"></div>
		
		<transition name="content">
			<div class="content" v-show="show">
				<div class="notify-header">
					<div class="notify-left-box">
						<span class="all-notify c-pointer">全部通知</span>
						<span class="not-read c-pointer">未读(3)</span>
					</div>
					<span style="font-size: 30px; font-weight: bold;"><i class="el-icon-close c-pointer" @click.stop="show = false"></i></span>
				</div>
				<div class="notify">
					<div class="notify-content" v-if="!show">
						<span>通知111235566</span>
						<p>通知45757777777</p>
					</div>
					<div class="notify-empty" v-if="show">
						<img :src="require('@/assets/images/notify_empty.svg')"/>
						<p style="margin-top: 15px;">暂无通知</p>
					</div>
				</div>
			</div>
		</transition>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		}
	}
</script>

<style lang="scss">
	.notify-box {
		.popup {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: grey;
			opacity: .3;
			z-index: 500;
		}
		
		.content {
			position: absolute;
			top: 0;
			margin-top: 100px;
			background-color: #FFFFFF;
			width: 30%;
			height: 80%;
			left: 200px;
			border-radius: 3px;
			box-shadow: 0 0 10px #909399;
			display: flex;
			flex-direction: column;
			z-index: 500;
			
			.notify-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: solid 1px grey;
				padding: 0 15px;
				
				.notify-left-box {
					font-size: 14px;
					
					& :active, :hover {
						color:#7e9ef8;
					}
					
				}
			}
			.notify {
				display: flex;
				flex-direction: column;
				.notify-content {
					
				}
				.notify-empty {
					display: flex;
					margin-top: 130px;
					align-items: center;
					justify-content: center;
					flex-direction: column;
				}
				
			}
		}
	}
	.content-enter-active, .content-leave-active {
		animation: content 1s;
	}
	.content-enter,.content-leave-to {
		opacity: 0;
	}

	
	@keyframes content {
		0% {
			transform: translateY(-300px);
		}
	  100%,
	  50%,
	  80% 
		{
	  transition-timing-function: cubic-bezier(0.3,0.7,0.355,1); /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
	  transform: translate3d(0,0,0); /*设置只在Z轴上移动*/
	  }
	  40%,
	  43%{
	  transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
	  transform: translate3d(0,-30px,0);
	  }
	  70%{
	  transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
	  transform: translate3d(0,-15px,0);
	  }
	  90%{
	  transform: translate3d(0,-6px,0);
	  }
	}
</style>

