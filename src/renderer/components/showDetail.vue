<template>
  <div>
    <div v-if="childFolderInfos">
      <div v-for="file in childFolderInfos" :key="file.id" class="out-item-box">
        <div>{{file.name}}</div>
        <div class="item-box">
          <div v-for="item in file.fileInfos" :key="item.id" class="file-item-box">
            <img class="img" :src="fp+'/'+item.id" alt />
            <p :title="item.name">名称：{{item.name}}</p>
            <p>大小：{{size(item.size)}}kb</p>
            <p>作者：{{item.author}}</p>
            <i class="el-icon-download icon_down" @click="down(item.name,item.id,item.path)"></i>
          </div>
          <div class="dload">
            <div class="sc">上传</div>
            <div class="xz" @click="alldown(file.id)">下载</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { remote, ipcRenderer } from 'electron'

import { log } from "util";


export default {
  props: ["childFolderInfos"],

  data() {
    return {
      tasks: [],

    };
  },

  methods: {
    // readTask(data) {
    //   readFile(this.default_path + "\\download.json")
    //     .then((res) => {
    //       this.tasks = res;
    //       this.tasks.push(data);
    //       writeFile(this.default_path + "\\download.json", this.tasks);
    //     })
    // },
    size(size) {
      return (size / 1024).toFixed(2);
    },

    down(name, id,imgUrl) {
      const wid = remote.getGlobal('downloadWindowId')
      console.log(name, id,imgUrl)
       //显示下载窗口
      ipcRenderer.send("download");
      //发送数据
      remote.BrowserWindow.fromId(wid).webContents.send('download-task', {name,id,imgUrl})
    },
    alldown(id) {
      let arr = this.childFolderInfos.filter((item) => {
        return item.id == id;
      })[0].fileInfos;
      for (let key of arr) {
        this.down(key.name,key.id,key.path);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.out-item-box {
  padding: 20px 30px;
}
.item-box {
  // border: 1px solid aquamarine;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  .file-item-box {
    border-radius: 6px;
    border: 1px solid rgb(198, 198, 198);
    background: rgb(243, 245, 235);
    width: 15%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-right: 14px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    .icon_down {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: none;
    }
    .img {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
    p {
      font-size: 14px;
      margin-top: 8px;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }

  .dload {
    margin-top: 20px;
    min-width: 30px;
    height: 200px;
    overflow: hidden;
    // margin-left: 10px;
    > div {
      width: 80px;
      height: 80px;
      background: #fff;
      border: 1px solid #ccc;
      float: left;
    }
    .sc {
      margin-right: 10px;
    }
  }
  .file-item-box:hover .icon_down {
    display: block;
  }
}
</style>