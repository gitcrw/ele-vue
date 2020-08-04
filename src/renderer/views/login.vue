<template>
  <div class="no-drag">
    <div>
      <span>账号：</span>
      <input type="text">
    </div>
    <div>
      <span>密码：</span>
      <input type="text">
    </div>
    <button @click="login">登录</button>
  </div>
</template>
<script>

import qs from 'qs'
import { ipcRenderer } from 'electron'

export default{
  data () {
    return {
      hh: ''
    }
  },
  methods: {
    login () {
      let data = {
        username: 'crw',
        password: '123456'
      }
      this.$api.POST_LOGIN(data).then(res => {
        // 发送登录成功给主进程
        ipcRenderer.send('into')
        this.$router.push('/main/home')
        localStorage.setItem('token', res.data.data.token)
      })
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