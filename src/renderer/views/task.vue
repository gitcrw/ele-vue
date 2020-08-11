<template>
	<div class="task-box" >
		<div class="top">
			<div class="top-left" v-if="total">
				<span @click="action(2)" :class="type==2?'active':''">我执行的({{total.executor}})</span>
				<span @click="action(1)" :class="type==1?'active':''">我创建的({{total.creator}})</span>
				<span @click="action(3)" :class="type==3?'active':''">我参与的({{total.partaker}})</span>
			</div>
			<div class="top-right">
				<span>筛选</span>
				<span>新建任务</span>
			</div>
		</div>
		<div class="task">
			<div class="task-item" v-for="item in taskData" :key="item.id"> 
				<el-checkbox></el-checkbox>
				<span class="btn">紧急</span>
				<span class="title c-pointer" @click="showDetail(item.id)">{{item.title}}</span>
				<div class="content">
					
					<ul class="content-box">
						<li class="content_item">
							<img :src="require('@/assets/images/project_icon.svg')"/>
							<span style="margin: 0 5px;">项目：{{item.projectName}}</span>
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
				isShowTaskPopup: false,
				taskData:[],
				type:2,
				total:'',
			}
		},
		created(){
			let params = {type:2,pageNumber:1}
			this.ajaxData(params)
		},
		methods: {
			ajaxData(params){
				this.$api.GET_TASKS(params).then(res=>{
					this.total = res.data.relateMeDataResult
					this.taskData = res.data.assignmentPageArrayListResults
					console.log(res)
				})
			},
			action(type){
				this.type = type
				this.taskData = null
				let params = {type,pageNumber:1}
				this.ajaxData(params)
			},
			showDetail (id) {
				this.$store.commit('taskId',id)
				this.$refs.detail.visible = true

				// this.$api.GET_TASKSDETAIL2(params).then(res=>{
				// 	console.log(res)
				// })
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

<style lang="scss" scoped>
.active{
	color: blue;
}
	.task-box {
		width: 100%;
		overflow: hidden;
		height: 100%;
		.top{
			padding: 8px 15px 0 24px;
			width: 100%;
			line-height: 40px;
			height: 40px;
			overflow: hidden;
			// background: #fff;
			.top-left{
				float: left;
				span{
						margin-right: 20px;
						cursor: pointer;
				}
				// margin-right: 10px;
			}
			.top-right{
				float: right;
			}
		}






		.task {
			height: 100%;
			overflow-y: auto;
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			padding-bottom: 30px;
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

