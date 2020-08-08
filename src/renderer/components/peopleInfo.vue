<template>
  <div>
    <transition mode="out-in"></transition>
    <div class="people">
      <div class="title">
        <span>个人资料</span>
        <i class="el-icon-close close" @click="action(0)"></i>
      </div>
      <div class="content">
        <div class="headimg">
          <span>头像</span>
          <div class="headimg-info">
            <el-avatar class="top_bar-avatar c-pointer tx" :src="avatar">
              <i slot="default" class="el-icon-user-solid" style="font-size: 19px;"></i>
            </el-avatar>
          </div>
          <!--  -->
          <div style="cursor"></div>
          <div class="setHead">
            <span class>更换头像</span>
            <input
              class="file"
              type="file"
              ref="file"
              @change="selectImg"
              accept="image/x-png, image/jpeg, image/bmp"
            />
          </div>
        </div>
        <div class="name">
          <span>姓名</span>
          <input type="text" v-model="nickname" value=""/>
        </div>
        <div class="phone">
          <span>联系电话</span>
          <input type="text" v-model="mobile" />
        </div>
        <div class="bottom">
          <el-button class="cancel" type="info" plain @click="action(0)">取消</el-button>
          <el-button class="save" type="success" @click="action(1)">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: new FormData(),
      userInfo:'',
      avatar:'',
      id:'',
      mobile:'',
      nickname:'',
      
    };
  },
  created() {
    
    let userInfo = this.$global.lcStorage('get',{name:'userInfo'})
    let {avatar,id,mobile,nickname} = userInfo.user
    this.userInfo = userInfo
    this.avatar = avatar
    this.id = id
    this.mobile = mobile
    this.nickname = nickname
  },
  methods: {
    
    reviseData(parmas){
        this.$api.POST_UPUSERINFO(parmas).then(res=>{
            this.userInfo.user[parmas.attribute] = parmas.value
            this.$global.lcStorage('set',{name:'userInfo',value:this.userInfo})
            if(parmas.attribute=='avatar'){
                this.$store.commit('avatar',parmas.value)
            }
        })
    },
    //检验哪个数据修改进行请求
    compare(){
        let {avatar,id,mobile,nickname} = this.$global.lcStorage('get',{name:'userInfo'}).user
        if(this.avatar!=avatar){
            let parmas =  {
                attribute:'avatar',
                id,
                value:this.avatar
            }
            this.reviseData(parmas)
        }
        if(this.nickname!=nickname){
            let parmas =  {
                attribute:'nickname',
                id,
                value:this.nickname
            }
            this.reviseData(parmas)
        }
        if(this.mobile!=mobile){
            let parmas =  {
                attribute:'mobile',
                id,
                value:this.mobile
            }
            this.reviseData(parmas)

        }
    },
    //上传图片
    selectImg() {
      let file = this.$refs.file.files[0];
      this.formData.append("file", file);
      this.$api.POST_UPLOAD(this.formData).then((res) => {
          this.avatar = res.message;
        this.formData.delete("file");
        console.log(this.userinfo)
      });
    },
    action(index) {
      if (index == 0) {
        this.$store.commit("showPopup", "");
        this.$store.commit("mb", false);
      } else if (index == 1) {
        this.compare()
        this.action(0)
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.people {
  z-index: 100;
  background: #ffffff;
  box-shadow: 0px 1px 6px rgb(147, 147, 147);
  border-radius: 4px;
  overflow: hidden;
  width: 55vw;
  height: 55vh;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  .title {
    font-size: 16px;
    height: 40px;
    border: 1px solid #f1f1f1;
    line-height: 40px;
    text-align: center;
    position: relative;
    .close {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  }
  .content {
    padding: 20px 30px;
    font-size: 0;
    > div {
      margin-bottom: 30px;
      span {
        font-size: 16px;
        display: inline-block;
        width: 80px;
      }
      input {
        height: 40px;
        width: 50%;
        display: inline-block;
        padding-left: 10px;
        font-size: 14px;
      }
    }
    .headimg {
      display: flex;
      font-size: 16px;
      align-items: center;
      .headimg-info {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        .tx {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            font-size: 50px !important;
          }
        }
      }
      .setHead {
        margin-left: 20px;
        color: rgb(247, 147, 150);
        background: rgb(241, 242, 243);
        border: 1px solid rgb(247, 147, 150);
        padding: 4px 10px;
        border-radius: 6px;
        position: relative;
        text-align: center;
        clear: both;
        overflow: hidden;
        width: 100px;
        height: 30px;
        .file {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          &::after {
            top: 0;
            left: 0;

            position: absolute;
            width: 100%;
            height: 100%;
            // position: relative;
            display: block;
            content: "";
            cursor: pointer;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      right: 30px;
      .cancel {
        width: 100px;
      }
      .save {
        width: 100px;
      }
    }
  }
}
</style>