<template> 
	<div class="info">
		<div class="left-content">
			<div class="title">618购物O2O专题活动设计</div>
			<ul class="content-list">
				<li class="content-item">
					<div class="left">
						<el-checkbox class="icon"></el-checkbox>状态
					</div>
					<span class="right">未完成</span>
				</li>
				<li class="content-item">
					<div class="left">
						<img :src="require('@/assets/images/creator.svg')" class="icon"/>创建者
					</div>
					<span class="right">zhan</span>
				</li>
				<li class="content-item">
					<div class="left">
						<img :src="require('@/assets/images/executor.svg')" class="icon"/>执行者
					</div>
					<span class="right">zhan</span>
				</li>
				<li class="content-item">
					<div class="left">
						<img :src="require('@/assets/images/date_icon.svg')" class="icon"/>截至时间
					</div>
					<span class="right">2020/8/5</span>
				</li>
				<li class="content-item">
					<span class="left">
						<img :src="require('@/assets/images/project_icon.svg')" class="icon"/>项目
					</span>
					<span class="right">专题活动</span>
				</li>
				<li class="content-item">
					<div class="left">
						<img :src="require('@/assets/images/priority.svg')" class="icon"/>优先级
						</div>
					<span class="right">
						<div style="color:#FFFFFF;display: flex; justify-content: center; align-items: center; width: 30px;height: 30px;border-radius: 50%;background-color: red;">高</div>
					</span>
				</li>
				<li class="content-item">
					<div class="left">
						<img :src="require('@/assets/images/remark.svg')" class="icon"/>备注
					</div>
					<span class="right">添加备注</span>
				</li>
				<li class="content-item">
					<div class="left">
						<img :src="require('@/assets/images/fujian_icon.svg')" class="icon"/>附件
					</div>
					<span class="fujian" style="color: #959595;">
						<span style="display: inline-block;">点击添加附件</span>
						<div>显示文件名的组件</div>
					</span>	
				</li>
			</ul>
			
		</div>
		<div class="right-content">
			<div class="top">
				<span class="title">参与者</span>
			</div>
			<div class="content">
				<span class="all">所有动态</span>
				<div class="update">
					<span>用户更新了动态</span> <span>时间</span>
				</div>
				<div class="commit-content"><span style="margin-left: 3px;">33333333333333333</span></div>
			</div>
			<div class="commit">
				<textarea class="text" placeholder="按ENTER快速发布评论动态" type="textarea" rows="2"></textarea>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.info {
		height: 100%;
		display: flex;
		flex-direction: row;
		
		.left-content {
			padding: 0 20px;
			box-sizing: border-box;
			width: 50%;
			border-right: solid 1px #c4c4c4;
			overflow-y: auto;
			
			.title {
				font-size: 18px;
				padding: 20px 0;
			}
			
			.content-list {
				.content-item {
					height: 50px;
					display: flex;
					flex-direction: row;
					
					.left {
						width: 168px;
						color: #959595;
						display: flex;
						align-items: center;
						// overflow: hidden;
						
						.icon {
							margin-right: 8px;
						}
						
					}
					.right {
						margin-left: 5px;
						width: 168px;
						display: flex;
						align-items: center;
						cursor: pointer;
					}
					
					.fujian{
						padding-top: 15px;
						display: flex;
						align-items: flex-start;
						flex-direction: column;
						cursor: pointer;
					}
				}
			}
		}
		
		.right-content {
			flex: 1;
			overflow: hidden;
			position: relative;
			border-bottom: solid 1px #c4c4c4;
			
			.top {
				border-bottom: solid 1px #c4c4c4;
				height: 90px;
				
				.title {
					display: inline-block;
					padding: 10px; 
					font-weight: bold;
					font-size: 17px;
				}
			}
			.content {
				margin: 0 10px;
				font-size: 16px;
				height: 500px;
				
				.all {
					display: inline-block;
					padding: 20px 0 0 15px;
				}
				.update {
					margin-top: 20px;
					display: flex;
					justify-content: space-between;
				}
				.commit-content {
					background-color: #f2efef;
					height: 50px;
					line-height: 50px;
					margin-left: 30px;
				}
			}
			.commit {
				border-top: solid 1px #c4c4c4;
				// overflow-y: auto;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				.text {
					width: 100%;
					height: 60px;
					border: none;
					outline: none;
					font-size: 14px;
					margin: 10px 0 0 10px;
					text-align: justify;
					text-justify: newspaper;
					word-break: break-all;
					
				}
				
			}
		}
	}
</style>
