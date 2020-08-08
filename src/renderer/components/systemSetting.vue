<template>
	<div class="download-box" >
		<div class="popup" v-show="show" @click="show = false"></div>
		
		<transition name="content" appear appear-class="content-enter" appear-active-class="content-enter-active">
			<div class="content" v-show="show">
				
				<div class="system-header">
					<div class="title">
						<span class="c-pointer">系统设置</span>
					</div>
					<i class="el-icon-close c-pointer" @click.stop="show = false"></i>
				</div>
				
				<div class="system-content">
					<div class="item">
						<div class="left">下载目录</div>
						<div class="path-box">
							{{ path }}
						</div>
						<el-button plain size="medium">选择目录</el-button>
					</div>
					<div class="item">
						<div class="left">下载完成提示</div>
						<el-tooltip content="下载完成提示" effect="light">
							<el-switch
							active-color="#13ce66"
							v-model="value"
							class="switch"
							>
							</el-switch>
						</el-tooltip>
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
				show: false,
				value: true,    //下载完成提示
				path: 'C:/Desktop/tuku/download'
			}
		}
	}
</script>

<style lang="scss">
	.download-box {
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
			top: 135px;
			left: 340px;

			background-color: #FFFFFF;
			width: 600px;
			height: 50%;
			border-radius: 3px;
			font-size: 16px;
			box-shadow: 0 0 10px #909399;
			display: flex;
			flex-direction: column;
			z-index: 500;
			
			.system-header {
				border-bottom: solid 1px #c4c4c4;
				padding: 10px 0;
				position: relative;
				
				.title {
					text-align: center;
					font-size: 14px;
				}
				
				.el-icon-close {
					position: absolute;
					right: 5px;
					top: 10px;
					font-size: 25px;
				}
				
			}
			.system-content {
				padding: 40px 30px;
				display: flex;
				flex-direction: column;
				
				.item {
					display: flex;
					margin-bottom: 40px;
					align-items: center;
					font-size: 14px;
					
					.left {
						width: 110px;
					}
					
					.path-box {
						border: solid 1px #dddddd;
						width: 350px;
						line-height: 36px;
						padding-left: 10px;
						margin-right: 10px;
						box-sizing: border-box;
					}
					.switch {
						transform: scale(1.5);
					}
					
				}
			}
		}
	}
	.content-enter, .content-leave-to {
		opacity: 0;
	}
	.content-enter-active, .content-leave-active {
		animation: content .8s;
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
