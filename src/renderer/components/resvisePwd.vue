<template>
  <div>
    <div class="people">
      <div class="title">
        <span>修改密码</span>
        <i class="el-icon-close close" @click="action(0)"></i>
      </div>
      <div class="content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

        <div class="bottom">
          <el-button class="cancel" type="info" plain>取消</el-button>
          <!-- <span class="cancel">取消</span> -->
          <el-button class="save" type="success" @click="action(1)">保存</el-button>
          <!-- <span class="save"></span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      id: "",
      oldpwd: "",
      newpwd: "",
      conpwd: "",
      ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
    //   form: {
    //     workMeals: "",
    //   },
    //   rules: {
    //     workMeals: [
    //       {
    //         required: true,
    //         message: "请输入工作餐费",
    //         trigger: "blur",
    //       },
    //       {
    //         pattern: /^[0-9]+(.[0-9]{2})?$/,
    //         message: "请输入正确的数值",
    //       },
    //     ],
    //   },
    };
  },
  created() {
    let id = this.$global.lcStorage("get", { name: "userInfo" }).user.id;
    this.id = id;
  },
  methods: {
    updatePwd(params) {
      this.$api.POST_UPDATEPWD(params).then((res) => {
        console.log(res);
      });
    },
    action(index) {
      if (index == 0) {
        this.$store.commit("showPopup", "");
        this.$store.commit("mb", false);
      } else if (index == 1) {
        if (this.newpwd !== this.conpwd) {
          console.log("no");
        } else {
          //发起请求
          let params = {
            id: this.id,
            newPassword: this.newpwd,
            oldPassword: this.oldpwd,
          };
          this.updatePwd(params);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  display: inline-block;
  vertical-align: middle;
}

label {
  vertical-align: middle;
}
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
    padding: 50px 30px 20px;
    font-size: 0;

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