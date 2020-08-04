<template>
  <el-breadcrumb class="no-drag nav-path">
    <el-breadcrumb-item :to="{ path: '/main/home' }">图库</el-breadcrumb-item>
    <el-breadcrumb-item @click.native="clearPath(name)">
      <span class="c-pointer">{{title}}</span>
    </el-breadcrumb-item>
    <span v-if="name=='images'&&showNavPath.length">
      <el-breadcrumb-item
        @click.native="goback(index)"
        v-for="(item,index) in showNavPath"
        :key="item.index"
      ><span class="c-pointer">{{item.title}}</span></el-breadcrumb-item>
    </span>
  </el-breadcrumb>
</template>

<script lang="ts">
export default {
  data() {
    return {
      title: "首页",
      images_path: "",
      home_path: "",
      task_path: "",
      users_path: "",
      showNavPath: "",
      name: "",
    };
  },
  methods: {
    goback(index) {
      let data = JSON.parse(JSON.stringify(this.$store.state.images_path));
      let length = data.length;
      console.log(data);
      if (index + 1 == length) {
        //不执行
      } else {
        let newPath = data.splice(0, index + 1);
        this.$store.commit("clear_images_path");
        this.$store.commit("images_path", ...newPath);
        console.log(newPath);
        console.log(this.$store);
        // this.showNavPath = data.splice(0,index+1)
        // console.log(this.$store.state.images_path)
      }
    },
    clearPath(name) {
      console.log(name);
      this.$store.commit(`clear_${name}_path`);
    },
  },
  computed: {},
  watch: {
    $route: function (to, from) {
      this.title = to.meta.title;
      this.name = to.name;
    },
    "$store.state.images_path": function (to, from) {
      this.showNavPath = to;
      console.log(this.showNavPath);
    },
  },
};
</script>

<style lang="scss">
.nav-path {
  margin-left: 20px;
  .el-breadcrumb__separator {
    font-weight: normal;
    color: #101010;
  }

  .is-link {
    font-weight: 400 !important;
    color: #606266 !important;
    cursor: pointer;
  }
}
</style>
