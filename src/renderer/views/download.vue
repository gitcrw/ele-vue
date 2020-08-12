<template>
  <div class="download">
    <div class="top-box">
      <div class="top">
        <span>下载管理器</span>
        <!-- <div @click="$electron.ipcRenderer.send('mini')" style="font-size: 22px;" class="el-icon-minus c-pointer c-active-opacity"></div> -->
        <div
          @click="$electron.ipcRenderer.send('close-download')"
          style="font-size: 22px;"
          class="el-icon-close icon-close c-pointer c-active-opacity close no-drag"
        ></div>
      </div>
    </div>
    <div class="content no-drag">
      <div v-for="(item,index) in tasks" :key="item.imgUrl" class="item-box">
        <span class="title">{{item.name}}</span>
        <!-- 进度条 -->
        <span class="status" v-if="item.progress!=100">
          <span :style="'width:'+item.progress+'%'" class="progress-bar"></span>
        </span>

        <span v-else class="status done">下载完成</span>
        <div class="action">
          <span @click="del(index)" class="el-icon-close icon-close c-pointer"></span>
          <span @click="openExternal(item.path)">文件夹</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { writeFile, readFile } from "../../utils/comm";
import { shell, ipcRenderer } from "electron";
var request = require("request");
var fs = require("fs");
var path = require("path");

export default {
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.readTask();
    ipcRenderer.on("download-task", this.linstenDownloadTask);
  },
  methods: {
    //创建目录
    mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      } else {
        if (this.mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
      }
    },
    //可以进行下载文件
    downloadFile(file_url, path, name, imgUrl) {
      //通过了筛选后，进行下载
      //添加到任务
      let data = { name, path, imgUrl, progress: "0%" };
      this.tasks.unshift(data);

      console.log("start");

      let this_ = this;
      var received_bytes = 0;
      var total_bytes = 0;

      var req = request({
        method: "GET",
        uri: file_url,
        headers: {
          accept: "application/octet-stream",
          "x-oss-token": localStorage.getItem("token"),
        },
      });

      var out = fs.createWriteStream(path + "/" + name); //输出
      req.pipe(out);
      req.on("response", function (data) {
        total_bytes = parseInt(data.headers["content-length"]);
      });

      req.on("data", function (chunk) {
        received_bytes += chunk.length;
        let progress = this_.showProgress(received_bytes, total_bytes);
        data.progress = progress;
        console.log(progress, data);
      });
      console.log("xx");
      req.on("end", function () {
        console.log("end");
        //下载完成写入json
        writeFile(this_.default_path + "\\download.json", this_.tasks);
      });
    },
    //展示进度
    showProgress(received, total) {
      var percentage = ((received * 100) / total).toFixed(0);
      return percentage;
      // console.log(
      //   percentage + "% | " + received + " bytes out of " + total + " bytes."
      // );
    },
    isDownLoad(imgUrl) {
      let indexArr = []//代表已经存在的图片所在的路径
      if (this.tasks.length > 0) {
        //判断是否可以下载
        this.tasks.map((item, index) => {
          if (item.imgUrl === imgUrl) {
            indexArr.push(index)
          }
        });
      }
      return indexArr
    },
    //监听下载任务
    linstenDownloadTask(e, { name, id, imgUrl }) {
      console.log(this.isDownLoad(imgUrl))
      //判断是否可以下载
      console.log("可以下载");
      if (this.isDownLoad(imgUrl).length==0) {
        let url = this.fd + id;
        let path =
          localStorage.getItem("downLoadUrl") ||
          "C:/Users/Administrator/Desktop/tuku";

        this.mkdirsSync(path);
        this.downloadFile(url, path, name, imgUrl);
        console.log(url, path, name, imgUrl);
      } else {
        console.log("已经存在");
        //存在了就把它置顶
        // let index =  this.isDownLoad(imgUrl)[0]
        // console.log(index)
        // this.tasks.splice(index,1)
        // let data = { name, path, imgUrl, progress: 100 };
        // this.tasks.unshift(data);
        //  writeFile(this.default_path + "\\download.json", this.tasks);
      }
    },
    //读取文件
    readTask() {
      readFile(this.default_path + "\\download.json")
        .then((res) => {
          console.log("读取文件", res);
          if (res) {
            this.tasks = res;
          }
        })
        .catch((err) => {
          writeFile(this.default_path + "\\download.json", []);
        });
    },
    //打开目录
    openExternal(path) {
      path ? shell.openExternal(path) : console.error("dir为空");
    },
    //删除
    del(index){
      this.tasks.splice(index, 1)
      writeFile(this.default_path + '\\download.json', this.tasks)
    }
  },
};
</script>
<style lang="scss" scoped>
.download {
  height: 100%;
  overflow: hidden;
  padding-bottom: 40px;
}
.top-box {
  top: 0;
  width: 100%;
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  line-height: 40px;
  .close {
    height: 40px;
    line-height: 40px;
    float: right;
    margin-right: 10px;
  }
}
.content {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  .item-box {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 18px;
    .title {
      flex: 3;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-right: 60px;
    }
    .status {
      flex: 3;
      text-align: center;
      background: #c1c1c1;
      margin-right: 60px;
      border-radius: 8px;
      height: 10px;
      position: relative;
      overflow: hidden;
      .progress-bar {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 100%;
        
      }
    }
    .done{
      background: none;
      height: 30px;
      line-height: 30px;
    }
    .action {
      // flex: 1;
    }
  }
}
</style>