<template>
  <div>
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
        <el-dropdown style="margin-left:20px" >
          <span class="el-dropdown-link">
            项目名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>项目名称排列</el-dropdown-item>
            <el-dropdown-item>创建时间排列</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         <el-button type="danger" size="small" style="margin-left:20px">创建项目</el-button>
      </div>
    </div>
    <!--  -->
    <div class="ct" v-if="id==2">
      <div class="left">全部项目(4)</div>
      <div class="right">{{viewStyle=='card'?'卡片视图':'列表视图'}}</div>
    </div>
    <!--  -->
    <div class="ct" v-if="id==3">
      <div class="left">
        <span style="margin-right: 5px;">我执行的(2)</span>
        <span style="margin-right: 5px;">我创建的(0)</span>
      	<span style="margin-right: 5px;">我参与的(0)</span>
      </div>
      <div class="right">
      	<el-dropdown>
					<el-dropdown-menu></el-dropdown-menu>
      	  <span class="el-dropdown-link" style="margin-right: 5px;">
      	    <span>未完成</span>
      	    <i class="el-icon-arrow-down el-icon--right"></i>
      	  </span>
      	  <span class="el-dropdown-link" style="margin-right: 5px;">
      	    <span>按最近创建</span>
      	    <i class="el-icon-arrow-down el-icon--right"></i>
      	  </span>
      	</el-dropdown>
        <el-button type="danger" size="mini" @click.native="createTask">新建任务</el-button>
      </div>
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
  props: ["allProject"],
  data() {
    return {
      id: 1,
      viewStyle:'card'
    };
  },
  methods: {
    goto(index) {
      this.$emit("xx", index);
    },
    handleCommand(command){
      this.$store.commit('viewStyle',command)
    },
		createTask() {
			console.log(133333333)
			this.$emit('showPopup')
		}
  },
  created() {
    let id = this.$route.meta.id;
    this.id = id;
  },
	mounted() {
		console.log(this.$parent, this.$parent.isShowTaskPopup, 'parent');
	},
  watch:{
    '$store.state.viewStyle':function(to,from){
        this.viewStyle = to
    }
  }


};
</script>
<style lang="scss" scoped>
.ct {
  padding: 15px 24px 25px 20px;
	box-sizing: border-box;
  font-size: 14px;
  overflow: hidden;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
</style>