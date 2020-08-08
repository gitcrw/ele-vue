<template>
	<el-drawer
	class="drawer-box"
	:visible.sync="visible"
	size="80%"
	:show-close="false"
	append-to-body
	destroy-on-close
	:modal="false"
	custom-class="task-details"
	@close="onClose">
		<template slot="title">
			<img style="flex: 0;" :src="require('@/assets/images/task_icon_1.svg')"/>
			<span style="font-weight: bolder;color: #0563AE;margin-left: 8px;">任务</span>
			<span class="close c-pointer" style="color: #101010; margin-left: auto" @click="visible = false">关闭</span>
		</template>
		<div class="task-details-wrap" v-if="visible">
			<ul class="wrap-menu">
				<li class="menu-item c-pointer" :class="{ active: contentType === 1 }" @click="changeContent(1)">基础信息</li>
				<li class="menu-item c-pointer" :class="{ active: contentType === 2 }" @click="changeContent(2)">资料上传</li>
			</ul>
			<div class="task-components">
				<keep-alive>
					<base-information v-if="contentType === 1" ></base-information>
					<folder-content v-else-if="contentType === 2"></folder-content>
				</keep-alive>
			</div>
		</div>
	</el-drawer>
</template>

<script>
	import BaseInformation from '@/views/taskPopup/baseInformation';
	import FolderContent from '@/views/taskPopup/folderContent';
	export default {
		data() {
			return {
				visible: false,
				contentType: 1
			}
		},
		mounted() {},
		methods: {
			changeContent(type) {
				if (type === 2 && !this.isInitFolderContent) this.initFolderContent()
				this.contentType = type
			},
			isInitFolderContent () {
				console.log('FolderContent')
			},
			onClose() {
				this.contentType = 1,
				console.log(this.contentType,'this.contentType')
			}
		},
		components: {
			BaseInformation,
			FolderContent
		}
	}
</script>

<style lang="scss">
	// 去掉弹框focus时的边框
	.el-drawer__container:focus, .el-drawer:focus {
		outline: none;
	}
	
	.task-details {
		.el-drawer__header {
			margin-bottom: 0;
			padding-top: 0;
			height: 45px;
		}
		.el-drawer__body {
			overflow: hidden;
		}
	}
	
	.drawer-box {
		top: 52px !important;
	}
	
	.task-details-wrap {
		display: flex;
		flex-direction: row;
		border-top: solid 1px #c4c4c4;
		height: 100%;
		
		.wrap-menu { 
			width: 100px;
			border-right: solid 1px #c4c4c4;
	
			.menu-item {
				width: 100px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				border-bottom: solid 1px #c4c4c4;
	
				&.active{
					font-weight: bold;
				}
			}
		}
	
		.task-components {
			flex:1;
			overflow: auto;
		}
	}
</style>
