<template>
  <transition name="fade">
  	<div class="login-wrap drag" v-show="show">
  		<div class="wrap-left">
  			<img :src="require('@/assets/images/login_img1.png')" class="content-1 c-cover"/>
  			<div class="content-2">
  				<img :src="require('@/assets/images/login_img2.png')" class="content-2-img"/>
  				<p class="content-2-title">好万家图库系统</p>
  			</div>
  		</div>
  		
  		<div class="wrap-right">
  			<div class="no-drag">
  				<p class="login-title">账号登录</p>
  				<el-input v-model="username" placeholder="请输入用户名" class="login-input"></el-input>
  				<el-input v-model="password" placeholder="请输入密码" type="password" class="login-input"></el-input>
  				<el-button type="danger" class="login-btn" @click="login">登录</el-button>
  			</div>
  			<div class="el-icon-minus c-pointer no-drag" @click="$electron.ipcRenderer.send('mini')"></div>
  			<div class="el-icon-close c-pointer no-drag" @click="$electron.ipcRenderer.send('close')"></div>
  		</div>
  	</div>
  </transition>
</template>
<script>

import qs from 'qs'
import { ipcRenderer } from 'electron'

export default{
  data () {
    return {
      hh: '',
			username: '',
			password: '',
			show: true
    }
  },
  methods: {
    login () {
			if (!this.username) {
				this.$message.error('请输入用户名')
			} else if (!this.password) {
				this.$message.error('请输入密码')
			} else {
				setTimeout(() => {
					this.show = false
					setTimeout(() => {
						let data = {
							username: 'crw',
							password: '123456'
						}
						this.$api.POST_LOGIN(data).then(res => {
							// 发送登录成功给主进程
							ipcRenderer.send('into')
							this.$router.push('/main/home')
							this.$global.lcStorage('set',{name:'token',value:res.data.token})
							this.$global.lcStorage('set',{name:'userInfo',value:res.data})
						})		
					}, 150)
				}, 1500)  
		}
      // this.$http({
      //   url: 'http://192.168.41.220:2030',
      //   method: 'POST',
      //   data: qs.stringify(data)
      // }).then(res => {
      //   console.log(res)
      //   // 发送登录成功给主进程
      //   ipcRenderer.send('into')
      //   this.$router.push('/main')
      //   localStorage.setItem('token', res.data.data.token)
      // })
    }
  }
}
</script>
<style lang="scss">
	.login-wrap {
		
		border-top: 3px solid #714BDD;
		display: flex;
				
		.wrap-left {
			position: relative;
			padding-top: 48px;
			width: 50%;
			.content-1 {
				width: 420px;
				height: 313px;
			}
			
			.content-2 {
				position: absolute;
				top: 23px;
				left: 145px;
				font-size: 22px;
				text-align: center;
				
				.content-2-img {
					width: 182px;
				}
				.content-2-title {
					font-size: 25px;
				}
			}
		}
		
		.wrap-right {
			position: relative;
			padding: 37px 30px 30px 30px;
			box-sizing: border-box;
			
			.login-title {
				font-size: 17px;
				font-weight: bold;
				margin-bottom: 39px;
			}
			
			.login-input {
				margin-bottom: 14px;
			}
			
			.login-btn {
				margin-top: 16px;
				width: 100%;
			}
			
			.el-icon-minus, .el-icon-close {
				position:absolute;
				top: 7px;
				color: #918686;
				transition: color .4s;
				
				&:hover {
					color: #101010;
				}
			}
			
			.el-icon-minus {
				font-size: 18px;
				right: 41px;
			}
			
			.el-icon-close {
				right: 7px;
				font-size: 20px;
			}
		}
	}
</style>