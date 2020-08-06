<template>
  <div v-if="index!=2">
    <!--  -->
    <div class="ct" v-if="id==1">
      <div class="left">全部项目({{allProject.length}})</div>
      <div class="right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{viewStyle=='card'?'卡片视图':'列表视图'}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="card">卡片视图</el-dropdown-item>
            <el-dropdown-item command="list">列表视图</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--  -->
        <el-dropdown style="margin-left:20px">
          <span class="el-dropdown-link">
            项目名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>项目名称排列</el-dropdown-item>
            <el-dropdown-item>创建时间排列</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="danger" size="small" style="margin-left:20px" @click="createPro()">创建项目</el-button>
      </div>
    </div>
    <!--  -->
    <div class="ct" v-if="id==2">
      <div class="left">
        <input class="search" type="text" placeholder="请输入关键词搜索" v-model="key" @keyup.enter="search">
      </div>
      <div class="right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{viewStyle=='card'?'卡片视图':'列表视图'}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="card">卡片视图</el-dropdown-item>
            <el-dropdown-item command="list">列表视图</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--  -->
    <div class="ct" v-if="id==3">
      <div class="left">全部项目(4)</div>
      <div class="right">卡片视图</div>
    </div>
    <!--  -->
    <div class="ct" v-if="id==4">
      <div class="left">
        <span @click="goto(1)">全部用户(2)</span>
        <span @click="goto(2)">角色权限</span>
      </div>
      <div class="right">
        <span>全部</span>
        <span>创建用户</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["allProject",'index','isSearch'],
  data() {
    return {
      id: 1,
      viewStyle: "card",
      key:''
    };
  },
  methods: {
    search(){
      console.log(this.key)
      this.$store.commit('searchKey',this.key)
    },
    goto(index) {
      this.$emit("xx", index);
    },
    handleCommand(command) {
      this.$store.commit("viewStyle", command);
    },
    createPro(){
      let params =
        {"description":"","endTime":"","folderName":"呵呵1","priority":1,"projectId":3,"startTime":"","title":"阿","annexes":[],"executor":5,"partakers":""}

      this.$api.POST_CREATEPRO(params).then(res=>{
        console.log(res)
      })
    }
  },
  created() {
    let id = this.$route.meta.id;
    this.id = id;
    console.log(id);
  },
  watch: {
    "$store.state.viewStyle": function (to, from) {
      this.viewStyle = to;
    },
  },
};
</script>
<style lang="scss" scoped>
.ct {
  margin: 10px 24px 30px 20px;
  font-size: 14px;
  overflow: hidden;
  .left {
    float: left;
    .search{
      height: 30px;
      margin-left: 10px;
      border-radius: 12px;
      padding-left: 30px;
      font-size: 12px;
      width: 240px;
    }
  }
  .right {
    float: right;
  }
}
</style>