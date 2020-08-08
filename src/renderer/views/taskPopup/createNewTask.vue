<template>
	<div class="new-task no-drag">
		<div class="popup" v-show="show" @click="show = false"></div>
		
		<transition name="content" appear appear-class="content-enter" appear-active-class="content-enter-active">
			<div class="content" v-show="show">
				
				<div class="task-header">
					<div class="title">
						<span class="c-pointer">创建任务</span>
					</div>
					<i class="el-icon-close c-pointer" @click.stop="show = false"></i>
				</div>
				
				<div class="task-content">
					<div class="task-title">
						<textarea class="textarea no-border c-word-break" placeholder="输入标题以创建任务"></textarea>
					</div>
					<div class="main">
						<el-avatar icon="el-icon-user-solid" :size="20"></el-avatar>username
						<div style="margin-left: 15px; position: relative;">
							<img :src="require('@/assets/images/date_icon.svg')"/>
							<span>设置开始时间</span>-<span>设置截至时间</span>
							<el-date-picker
								v-model="value"
								type="datetimerange"
								value-format="yyyy-MM-dd HH:mm"
								placeholder="选择日期"
								class="date-picker">
							</el-date-picker>
							
						</div>
					</div>
					<div class="main activity">
						<el-dropdown trigger="click">
							<span>专题活动<i class="el-icon-arrow-down el-icon--right"></i></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>1</el-dropdown-item>
								<el-dropdown-item>2</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						
						<div style="margin-left: 15px;">
							<textarea class="file-title no-border c-word-break" placeholder="请输入专题名称用来创建文件夹目录"></textarea>
						</div>
					</div>
					<div class="item">
						<div class="left">
							<img :src="require('@/assets/images/remark_icon.svg')"/><span style="display: inline-block;">备注</span>
						</div>
						<div class="right">
							<textarea rows="10" class="bz-text"></textarea>
						</div>
					</div>
					
					<div class="item">
						<div class="left">
							<img :src="require('@/assets/images/priority_icon.svg')"/><span style="display: inline-block;">优先级</span>
						</div>
						<div class="right">
							
						</div>
					</div>
					
					<div class="item">
						<div class="left">
							<img :src="require('@/assets/images/fujian_icon.svg')"/><span style="display: inline-block;">附件</span>
						</div>
						<div class="right" style="font-size: 14px; color: #c4c4c4;">点击添加附件</div>
					</div>
					
					<div class="partner">
						<div class="partner-title">参与者</div>
						<el-avatar icon="el-icon-user-solid" :size="20"></el-avatar>
					</div>
					
					<div class="btn">
						<el-button class="btn_item" size="small" @click="show = false">取消</el-button>
						<el-button class="btn_item" type="success" size="small">完成</el-button>
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
				value: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.new-task {
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
			top: 52px;
			left: 380px;
			background-color: #FFFFFF;
			width: 490px;
			height: 90%;
			border-radius: 3px;
			font-size: 16px;
			box-shadow: 0 0 10px #909399;
			display: flex;
			flex-direction: column;
			z-index: 500;
			
			.task-header {
				padding: 12px 10px;
				display: flex;
				justify-content: space-between;
				position: relative;
				
				.title {
					font-size: 14px;
				}
				
				.el-icon-close {
					position: absolute;
					right: 5px;
					top: 10px;
					font-size: 25px;
				}
				
			}
			.task-content {
				padding: 20px 30px;
				display: flex;
				flex-direction: column;
				
				.task-title {
					height: 80px;
					width: 80%;
					
					.textarea {
						resize: none;
						width: 400px;
						overflow-y: auto;
						color: #c4c4c4;
						font-weight: bold;
						
					}
				}
				.main {
					display: flex;
					align-items: flex-start;
					flex-direction: row;
					margin-bottom: 15px;
					
					.date-picker {
						opacity: 0;
						position: absolute;
						top: -20px;
						left: 0;
						right: 0;
						bottom: 0;
					}
					.file-title {
						resize: none;
						width: 300px;
						overflow-y: auto;
						font-size: 15px;
					}
				}
				.activity {
					border-bottom: solid 1px #c4c4c4;
				}

					
				
				
				.item {
					display: flex;
					margin-bottom: 40px;
					align-items: flex-start;
					font-size: 15px;
					
					.left {
						width: 110px;
						display: flex;
						align-items: center;
					}
					.right {
						.bz-text{
							width: 360px;
							resize: none;
							overflow-y: auto;
						}
					}
				}
				
				.partner {
					display: flex;
					flex-direction: column;
					.partner-title {
						padding: 10px 0;
					}
				}
				.btn {
					margin-left: auto;
					&_item {
						width: 95px;
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
	  transition-timing-function: cubic-bezier(0.8,0.5,0.9,0.06);
	  transform: translate3d(0,-30px,0);
	  }
	  70%{
	  transition-timing-function: cubic-bezier(0.8,0.05,0.9,0.06);
	  transform: translate3d(0,-15px,0);
	  }
	  90%{
	  transform: translate3d(0,-6px,0);
	  }
	}
</style>

