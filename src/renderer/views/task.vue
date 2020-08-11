<template>
	<div class="task-box" >
		<ct :allProject="allProject" @showPopup="handleCreateTask"></ct>
		<div class="task">
			<div class="task-item" v-for="item in 3" :key="item"> 
				<el-checkbox></el-checkbox>
				<span class="btn">紧急</span>
				<span class="title c-pointer" @click="showDetail">618天猫活动</span>
				<div class="content">
					
					<ul class="content-box">
						<li class="content_item">
							<img :src="require('@/assets/images/project_icon.svg')"/>
							<span style="margin: 0 5px;">项目：专题活动</span>
						</li>
						<li class="content_item">
							<img :src="require('@/assets/images/fujian_icon.svg')"/>
							<span style="margin: 0 5px;">内含附件</span>
						</li>
						<li class="content_item">
							<img :src="require('@/assets/images/date_icon.svg')"/>
							<span style="margin: 0 5px;">2020/8/4</span>
						</li>
					</ul>
					
				</div>
				
			</div>
		</div>
		<task-detail ref="detail"></task-detail>
		<create-task ref="create"></create-task>
	</div>
</template>

<script>
	import createTask from '@/views/taskPopup/createNewTask';
	import taskDetail from '@/views/taskPopup/taskDetailPopup';
	import ct from '@/components/ContentTop';
	export default {
		props: ["allProject"],
		data() {
			return {
				isShowTaskPopup: false
			}
		},
		methods: {
			showDetail () {
				this.$refs.detail.visible = true
			},
			/**
			 * 显示新建任务弹框
			 */
			handleCreateTask() {
				this.$refs.create.show = true
				console.log(this.$refs.create.show, 'show')
			}
		},
		components: {
			ct,
			taskDetail,
			createTask
		}
	}
</script>

<style lang="scss">
	.task-box {
		width: 100%;
		// height: 90%;
		.task {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			
			.task-item {	
				text-align: left;
				align-items: center;
				flex-wrap: nowrap;
				margin: 15px 10px;
				

				.btn {
					width: 30px;
					height: 12px;
					background-color: red;
					border-radius: 15px;
					text-align: center;
					color: #FFFFFF;
				}
				
				
				.content {
					color: darkgrey;
					margin-top: 15px;
					font-size: 12px;
					
					.content-box {
						display: flex;
						flex-wrap: nowrap;
						margin-left: 20px;
						
						&_item {
							margin-right: 10px;
						}
					}
					
				}
			}
		}
	}
</style>

