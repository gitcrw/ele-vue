<template>
  <div>
    <div v-if="childFolderInfos||type==2">
      <div v-for="(file,index) in childFolderInfos" :key="file.id" class="out-item-box">
        <div>{{file.name}}</div>
        <div class="item-box">
          <div v-for="item in file.fileInfos" :key="item.id" class="file-item-box">
            <img class="img" :src="fp+'/'+item.id" alt />
            <p :title="item.name">名称：{{item.name}}</p>
            <p>大小：{{size(item.size)}}kb</p>
            <p>作者：{{item.author}}</p>
            <i class="c-pointer el-icon-download icon_down" @click="down(item.name,item.id,item.path)"></i>
          </div>
          <div class="dload">
            <div class="sc">
              <img src="../assets/images/upload.svg" alt />
              <span>上传</span>
              <input
                class="file"
                type="file"
                :ref="'file'+index"
                title=" "
                :multiple="multiple"
                @change="upload(index,file.id)"
              />
            </div>
            <div class="xz" @click="alldown(file.id)">
              <img src="../assets/images/download.svg" alt />
              <span>下载</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { remote, ipcRenderer } from "electron";
import { Message } from 'element-ui'
import { log } from "util";

export default {
  props: ["childFolderInfos", "folderId","type"],

  data() {
    return {
      tasks: [],
      multiple: true,
    };
  },
  created() {
    console.log(this.type);
  },
  methods: {
    size(size) {
      return (size / 1024).toFixed(2);
    },
    //上传文件,id是当前例如原图这种的id
    upload(index, id) {
      let xx = "file" + index;
      let files = this.$refs[xx][0].files;
      //不允许超过50张
      if (files.length > 50) {
        Message.error('上传图片不能超过50张')
      } else {
        for (let i = 0; i < files.length; i++) {
          console.log(i, files[i]);
          let formData = new FormData();
          formData.append("file", files[i]);
          formData.append("folderId", id);
          this.$api.POST_UPLOADFOLDER(formData).then((res) => {
            //更新视图
            this.childFolderInfos[index].fileInfos.push(res.data)
          });
        }
      }
    },
    down(name, id, imgUrl) {
      const wid = remote.getGlobal("downloadWindowId");
      console.log(name, id, imgUrl);
      //显示下载窗口
      ipcRenderer.send("download");
      //发送数据
      remote.BrowserWindow.fromId(wid).webContents.send("download-task", {
        name,
        id,
        imgUrl,
      });
    },
    alldown(id) {
      let arr = this.childFolderInfos.filter((item) => {
        return item.id == id;
      })[0].fileInfos;
      for (let key of arr) {
        this.down(key.name, key.id, key.path);
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
    background: rgb(243, 245, 235);
    width: 144px;
    height: 192px;
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
    overflow: hidden;
    // margin-left: 10px;
    > div {
      width: 100px;
      height: 100px;
      background: #fff;
      border: 1px solid #ccc;
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      cursor: pointer;
    }
    .sc {
      margin-right: 10px;
      position: relative;
      .file{
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
      }
    }
  }
  .file-item-box:hover .icon_down {
    display: block;
  }
}
</style>