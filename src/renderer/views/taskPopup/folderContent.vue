<template>
	<div class="folder">
		<!--  拍摄文件 PSD文件 主图文件 详情图文件 -->
		<div class="photo-file" v-for="item in 4" :key="item">
			<p class="title">拍摄文件</p>
			<div class="info-box">
				<div class="info" v-for="item in 3" :key="item">
					<img class="img" v-if="showImg" src="http://haowanjia.oss-cn-shenzhen.aliyuncs.com/hwj-oss/20200716/09648f1d5b1844bc8411dcb974e34565.png"/>
					<img class="img  border" v-else />
					<p class="infos-item">
						<span class="item-left">名称</span>
						<span class="item-right">001.PSD</span>
					</p>
					<p class="infos-item">
						<span class="item-left">大小</span>
						<span class="item-right">308kb</span>
					</p>
					<p class="infos-item">
						<span class="item-left">作者</span>
						<span class="item-right">administrator</span>
					</p>
					<i class="el-icon-error c-pointer"></i>
				</div>
				<div class="update">
					<img :src="require('@/assets/images/upload.svg')"/>
					<span style="color: #0c77c6;font-weight: bold;">补充上传</span>
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showImg: true
			}
		}
	}
</script>

<style lang="scss">
	.border {
		background-color: #fffff;
	}
	
	.folder {
		flex: 1;
		overflow: auto;
		
		.photo-file {
			margin: 10px 0 25px 15px;
			.title {
				padding: 10px;
				display: inline-block;
				font-weight: bold;
			}
			
			.info-box{
				display: flex;
				flex-wrap: nowrap;
				.info {
					width: 145px;
					height: 190px;
					border: solid 1px #c4c4c4;
					border-radius: 5px;
					margin: 10px;
					position: relative;
					display: flex;
					flex-direction: column;
					background-color: #f3f2eb;
					
					.img {
						width: 80px;
						height: 80px;
						text-align: center;
						margin: 10px auto;
						display: block;
					}
					
					.infos-item {
						vertical-align: middle;
						margin-bottom: 10px;
						
						.item-left {
							padding: 10px 5px;
							box-sizing: border-box;
						}
						
						.item-right {
						}
					}
					
					.el-icon-error {
						position: absolute;
						top: -11px;
						right: -11px;
						color: #ed5050;
						font-size: 23px;
					}
					
				}
				.update {
					width: 100px;
					height: 100px;
					border: solid 1px #c4c4c4;
					margin-top: 10px;
					border-radius: 5px;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
				}
				
			}
		}
	}
</style>
