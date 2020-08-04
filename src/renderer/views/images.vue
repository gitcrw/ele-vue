<template>
  <div>
    <ct :allProject="allProject"></ct>
    <div class="content">
      <div v-if="index!=2">
        <div v-if="index==0" class="project">
          <div v-for="item in allProject" :key="item.name" class="item-box">
            <div class="item-info" @dblclick="dbClick(item.id,item.name)">
              <img src="@/assets/folder.png" alt />
              <span>{{item.name}}</span>
              <span class="ts">双击进入</span>
            </div>
          </div>
        </div>
        <div v-if="index==1" class="project">
          <div v-for="item in folderProject" :key="item.name" class="item-box">
            <div class="item-info" @dblclick="dbClick(item.folderId,item.folderName)">
              <img src="@/assets/folder.png" alt />
              <span>{{item.folderName}}</span>
              <span class="ts">双击进入</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>zanshi</div>
    </div>
  </div>
</template>

<script >
import ct from '../components/ContentTop'
export default {
  props: ["allProject"], //所有项目
  components:{ct},
  data() {
    return {
      index: 0, //当前层级 index 0：所有项目 1：文件夹项目 2：详情
      folderProject: "", //文件夹项目
      nav_path: [],
    };
  },
  created() {},
  methods: {
    dbClick(id, title) {
      if (this.index === 0) {
        //进入文件夹
        this.$api.GET_FOLDERPROJECT({ projectId: id }).then((res) => {
          this.folderProject = res.data;
          this.index = 1;
        });
      } else if (this.index === 1) {
        //进入展示图片界面
        this.$api.GET_FOLDERDETAIL({ folderId: id }).then((res) => {
          this.index = 2;
        });
      }
      let obj = {
        index:this.index+1,
        title
      }
      this.$store.commit('images_path',obj)
    }
  },
  watch:{
      '$store.state.images_path':function(to,from){
        if(this.index==to.length){}else { this.index = to.length}
      }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding-left: 30px;
  .project {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .item-box {
      width: 20%;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      .item-info {
        img {
          width: 80px;
          height: 120px;
          margin-bottom: 30px;
        }
        height: 260px;
        width: 195px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgb(243, 242, 235);
        border-radius: 8px;
        transition: all 0.3s;
        border: 1px solid transparent;
        position: relative;
        .ts {
          color: rgb(163, 73, 164);
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: 600;
        }
      }
    }
    .item-info:hover {
      border: 1px solid rgb(163, 73, 164);
      .ts {
        display: block;
      }
    }
  }
}
</style>
