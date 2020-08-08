<template>
  <div>
    <ct :allProject="allProject" :index="index" ></ct>
    <transition mode="out-in">
      <div class="content" v-if="viewStyle=='card'" key="card">
        <div v-if="index!=2">
          <div v-if="index==0" class="project">
            <div v-for="item in showData" :key="item.name" class="item-box c-pointer">
              <div class="item-info" @dblclick="dbClick(item.id,item.name)">
                <img src="@/assets/folder.png" alt />
                <span>{{item.name}}</span>
                <span class="ts">双击进入</span>
              </div>
            </div>
          </div>
          <div v-if="index==1" class="project">
            <div v-for="item in showFolderPro" :key="item.name" class="item-box c-pointer">
              <div class="item-info" @dblclick="dbClick(item.folderId,item.folderName)">
                <img src="@/assets/folder.png" alt />
                <span>{{item.folderName}}</span>
                <span class="ts">双击进入</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-else>zanshi</div> -->
      </div>
      <div class="content" v-if="viewStyle=='list'" key="list">
        <div v-if="index!=2">
          <div v-if="index==0" class="list-box">
            <div v-for="item in showData" :key="item.name" class="item-box c-pointer">
              <div class="item-info" @dblclick="dbClick(item.id,item.name)">
                <img class="icon" src="@/assets/folder.png" alt />
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
          <div v-if="index==1" class="list-box">
            <div v-for="item in showFolderPro" :key="item.name" class="item-box c-pointer">
              <div class="item-info" @dblclick="dbClick(item.folderId,item.folderName)">
                <img class="icon" src="@/assets/folder.png" alt />
                <span>{{item.folderName}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-else>zanshi</div> -->
      </div>
    </transition>
    <div v-if="index==2">
      <sd :childFolderInfos="childFolderInfos"></sd>
    </div>
  </div>
</template>

<script >
import ct from "../components/ContentTop";
import sd from "../components/showDetail";
export default {
  props: ["allProject"], //所有项目
  components: { ct, sd },
  data() {
    return {
      index: 0, //当前层级 index 0：所有项目 1：文件夹项目 2：详情
      folderProject: "", //文件夹项目
      showFolderPro: "", //文件夹项目展示
      nav_path: [],
      viewStyle: "card",
      childFolderInfos: "", //详细内容
      searchKey: "", //搜索关键字
      showData: "",
    };
  },

  methods: {
    getSearch(key) {
      if (this.index == 0) {
        let oo = this.showData.filter((item) => {
          return item.name.indexOf(key) != -1;
        });
        this.showData = oo;
      } else if (this.index == 1) {
        console.log(this.folderProject);
        let oo = this.showFolderPro.filter((item) => {
          return item.folderName.indexOf(key) != -1;
        });
        this.showFolderPro = oo;
      }
    },
    dbClick(id, title) {
      if (this.index === 0) {
        //进入文件夹
        this.$api.GET_FOLDERPROJECT({ projectId: id }).then((res) => {
          this.showFolderPro = res.data;
          this.folderProject = res.data;
          this.index = 1;
        });
      } else if (this.index === 1) {
        //进入展示图片界面
        this.$api.GET_FOLDERDETAIL({ folderId: id }).then((res) => {
          this.childFolderInfos = res.data.childFolderInfos;
          this.index = 2;
          console.log(this.childFolderInfos);
        });
      }
      let obj = {
        index: this.index + 1,
        title,
      };
      this.$store.commit("images_path", obj);
    },
    resetShow() {
      if (this.index == 0) {
        this.showData = this.allProject;
      } else if (this.index == 1) {
        this.showFolderPro = this.folderProject;
      }
    },
  },
  watch: {
    "allProject": {
      handler:function (to, from) {
        this.showData = to;
      },
      immediate:true
    },
    "$store.state.images_path": function (to, from) {
      if (this.index == to.length) {
      } else {
        this.index = to.length;
      }
      //路径更改清空searchKey
      this.$store.commit("searchKey", "");
      this.resetShow()
    },
    "$store.state.viewStyle": function (to, from) {
      this.viewStyle = to;
    },
    "$store.state.searchKey": function (to, from) {
      if (to.length > 0) {
        this.getSearch(to);
      } else {
        this.resetShow()
      }
    },
  },
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

  .list-box {
    .item-box {
      margin-bottom: 14px;
      overflow: hidden;
      padding-right: 24px;
    }

    .item-info {
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      background: rgb(243, 242, 235);
      padding: 12px;
      border-radius: 8px;
      border: 2px solid transparent;
      transition: all 0.3s;
    }
    .item-info:hover {
      border: 2px solid rgb(107, 135, 247);
    }
    .icon {
      width: 30px;
      height: 40px;
      margin-right: 20px;
    }
  }
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
