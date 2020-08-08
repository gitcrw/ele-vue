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
          <el-form-item label="旧密码" prop="oldpwd">
            <el-input v-model="ruleForm.oldpwd"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <div class="bottom">
            <el-form-item>
              <el-button class="cancel" type="info" plain @click="action(0)">取消</el-button>
              <el-button class="save" type="success" @click="action(1)">保存</el-button>
              <!-- <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkOldPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入旧密码"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("请输入大于6位数的密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      id: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        oldpwd: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpwd: [{ validator: checkOldPwd, trigger: "blur" }],
      },
    };
  },
  created() {
    let id = this.$global.lcStorage("get", { name: "userInfo" }).user.id;
    this.id = id;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过,发起请求
          let params = {
            id: this.id,
            newPassword: this.ruleForm.pass,
            oldPassword: this.ruleForm.oldpwd,
          };
          this.updatePwd(params);
        } else {
          //验证失败
          return false;
        }
      });
    },
    updatePwd(params) {
      this.$api.POST_UPDATEPWD(params).then((res) => {
        if (res.status) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.action(0)
        }else{
            this.$message.error(res.message);
        }
      });
    },
    action(index) {
      if (index == 0) {
        this.$store.commit("showPopup", "");
        this.$store.commit("mb", false);
      } else if (index == 1) {
        //检验表单
        this.submitForm("ruleForm");
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