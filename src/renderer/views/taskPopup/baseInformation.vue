<template>
  <div class="info" v-if="baseData">
    <div class="left-content">
      <div v-if="!title" class="title" @click="action(0,baseData.title)">{{baseData.title}}</div>
      <!--  -->
      <div v-else class="title-box">
        <textarea style="resize:none" v-model="title"></textarea>
        <!-- <textarea type="text" > -->
        <div class="btn">
          <el-button size="mini" @click="cancel(0)">取消</el-button>
          <el-button type="primary" size="mini" @click="confim(0)">确定</el-button>
        </div>
      </div>

      <!--  -->
      <ul class="content-list">
        <li class="content-item">
          <div class="left">
            <el-checkbox class="icon"></el-checkbox>状态
          </div>
          <span class="right">未完成</span>
        </li>
        <li class="content-item">
          <div class="left">
            <img :src="require('@/assets/images/creator.svg')" class="icon" />创建者
          </div>
          <span class="right">{{baseData.creatorInfo.nickname}}</span>
        </li>
        <li class="content-item">
          <div class="left">
            <img :src="require('@/assets/images/executor.svg')" class="icon" />执行者
          </div>
          <div class="right">
            <span>{{baseData.executorInfo.nickname}}</span>
          </div>
        </li>
        <li class="content-item">
          <div class="left">
            <img :src="require('@/assets/images/date_icon.svg')" class="icon" />截至时间
          </div>
          <div class="right">
            <span>{{baseData.endTime?baseData.endTime:'-- --'}}</span>
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="setDate"
              class="date c-pointer"
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </div>
        </li>
        <li class="content-item">
          <span class="left">
            <img :src="require('@/assets/images/project_icon.svg')" class="icon" />项目
          </span>
          <span class="right">{{baseData.projectInfo.projectName}}</span>
        </li>
        <li class="content-item">
          <div class="left">
            <img :src="require('@/assets/images/priority.svg')" class="icon" />优先级
          </div>
          <span class="right">
            <el-popover placement="bottom" width="200" trigger="click">
								<div class="priority">
                <div
                  v-for="(item,index) in circle"
                  @click="selectPriority(item)"
									:class="item.priority==priority.priority?'priority'+item.priority:''"
                  :style="`color:${item.background};border-color:${item.background}`"
                >{{item.title}}</div>
              </div>
              <div
                slot="reference"
								class="critl"
								
                :style="`background-color: ${priority?priority.background:(baseData.priority?baseData.priority.itemOtherValue:'#BBB8B8')}`"
              >{{priority?priority.title:(baseData.priority?baseData.priority.itemName:'无')}}</div>
					
            </el-popover>
          </span>
        </li>
        <li class="content-item content-itembz">
          <div class="left">
            <img :src="require('@/assets/images/remark.svg')" class="icon" />备注
          </div>
          <div class="right" v-if="!description.is">
            <span
              class="c-pointer"
              @click="action(1,baseData.description)"
            >{{baseData.description?baseData.description:'添加备注'}}</span>
          </div>
          <div v-else class="description-box">
            <textarea class="textarea" style="resize:none" v-model="description.data"></textarea>
            <div class="btn">
              <el-button size="mini" @click="cancel(1)">取消</el-button>
              <el-button type="primary" size="mini" @click="confim(1)">确定</el-button>
            </div>
          </div>
        </li>
        <li class="content-item">
          <div class="left">
            <img :src="require('@/assets/images/fujian_icon.svg')" class="icon" />附件
          </div>
          <span class="fujian" style="color: #959595;">
            <span style="display: inline-block;">点击添加附件</span>
            <div>显示文件名的组件</div>
          </span>
        </li>
      </ul>
    </div>
    <div class="right-content">
      <div class="top">
        <span class="title">参与者</span>
      </div>
      <div class="content">
        <span class="all">所有动态</span>
        <div v-for="item in comment">
          <div class="update">
            <span>{{item.creatorInfo.nickname}}更新了动态</span>
            <span>{{item.createDate}}</span>
          </div>
          <div class="commit-content">
            <span style="margin-left: 3px;">{{item.content}}</span>
          </div>
        </div>
      </div>
      <div class="commit">
        <textarea
          v-model="content"
          class="text"
          placeholder="按ENTER快速发布评论动态"
          type="textarea"
          rows="2"
          @keyup.enter="push()"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { Message} from 'element-ui'
export default {
  data() {
    return {
      id: "",
      baseData: "",
      title: "",
      value1: "", //日期
      description: "",
      priority: "", //优先级
      content: "", //发表评论内容
			comment: [], //评论
			projectId:'',//项目id

      circle: [
        {
          background: "#ed5050",
          title: "高",
          priority: 1,
        },
        {
          background: "rgb(232,170,32)",
          title: "中",
          priority: 2,
        },
        {
          background: "rgb(69,132,0)",
          title: "低",
          priority: 3,
        },
        {
          background: "rgb(187,184,184)",
          title: "无",
          priority: 100,
        },
      ],
    };
  },
  methods: {
    //发起请求
    ajaxData(params) {
      this.$api.POST_TASKDETUPDATE(params).then((res) => {
				console.log(res);
				if(!res.status){
					Message.error(res.message)
				}
      });
    },
    //设置时间
    setDate() {
      console.log(4444);
      this.baseData.endTime = this.value1;
      let params = {
        id: this.id,
        endTime: this.value1,
      };
      this.ajaxData(params);
    },
    action(index, data) {
      switch (index) {
        case 0:
          this.title = data;
          console.log(0);
          break;
        case 1:
          this.description = { is: true, data };
          console.log(1);
          break;
        case 2:
          console.log(2);
          break;
      }
    },
    //取消
    cancel(index) {
      if (index == 0) {
        this.title = null;
      } else if (index == 1) {
        this.description = { is: false };
      }
    },
    //确认
    confim(index) {
      if (index == 0) {
        let params = { id: this.id, title: this.title };
        this.ajaxData(params);
        this.baseData.title = this.title;
        this.title = null;
      } else if (index == 1) {
        let params = { id: this.id, description: this.description.data };
        this.ajaxData(params);
        this.baseData.description = this.description.data;
        this.description = { is: false };
      }
    },
    //选择优先级
    selectPriority(priority) {
			this.baseData.priority = {
				itemName:priority.title,
				itemOtherValue:priority.background,
				itemSortValue:priority.priority
			}
      
			this.priority = priority;
			let params = {id: this.id,priority:priority.priority}
			this.ajaxData(params)
    },
    //发送评论
    push() {
      if (this.content.trim()) {
        let params = { assignmentId: this.id, content: this.content.trim() };
        this.$api.POST_TASKDETPL(params).then((res) => {
					this.content = "";
					this.comment.push(res.data)
        });
      }
    },
  },
  created() {
    let id = this.$store.state.taskId;
    this.id = id;
    this.$api.GET_TASKSDETAIL({ id }).then((res) => {
			this.baseData = res.data;
			//存到store里
			let taskofProId = res.data.projectInfo.folderInfo.id
			this.$store.commit('taskofProId',taskofProId)
		});
		this.$api.GET_TASKSPLLIST({id}).then(res=>{
			this.comment = res.data
		})
  },
};
</script>

<style lang="scss" scoped>
.content-itembz {
  // display: block !important;
}
.critl{
	color:#FFFFFF;display: flex; justify-content: center; align-items: center; width: 30px;height: 30px;border-radius: 50%;
}
.priority {
  display: flex;
  align-items: center;
  justify-content: space-around;
  > div {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid;
    border-radius: 50%;
    // margin-right: 10px;
    cursor: pointer;
  }
}
.title-box,
.description-box {
  height: 90px;
  margin-top: 20px;
  border: 1px solid #959595;
  textarea {
    width: 100%;
    height: 50px;
    font-size: 18px;
    color: black;
  }
  .btn {
    float: right;
    margin-right: 10px;
  }
}
.description-box {
  width: 252px;
}
.right {
  position: relative;
  .date {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    // &::before{
    // 	content:'';
    // 	width: 100%;
    // 	height: 100%;
    // 	cursor: pointer;
    // 	display: block;
    // 	position: absolute;
    // 	z-index: 0;
    // 	left: 0;
    // 	top: 0;
    // }
  }
}

.info {
  height: 100%;
  display: flex;
  flex-direction: row;

  .left-content {
    padding: 0 20px;
    box-sizing: border-box;
    width: 50%;
    border-right: solid 1px #c4c4c4;
    overflow-y: auto;

    .title {
      font-size: 18px;
      padding: 20px 0;
      cursor: pointer;
    }

    .content-list {
      .content-item {
        min-height: 50px;
        display: flex;
        flex-direction: row;

        .left {
          width: 168px;
          color: #959595;
          display: flex;
          align-items: center;
          // overflow: hidden;

          .icon {
            margin-right: 8px;
          }
        }
        .right {
          margin-left: 5px;
          width: 168px;
          display: flex;
          align-items: center;
          // cursor: pointer;
        }

        .fujian {
          padding-top: 15px;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          cursor: pointer;
        }
      }
    }
  }

  .right-content {
    flex: 1;
    overflow: hidden;
    position: relative;
    border-bottom: solid 1px #c4c4c4;

    .top {
      border-bottom: solid 1px #c4c4c4;
      height: 90px;

      .title {
        display: inline-block;
        padding: 10px;
        font-weight: bold;
        font-size: 17px;
      }
    }
    .content {
      padding: 0 10px;
      font-size: 16px;
      height: 500px;
			overflow: auto;
      .all {
        display: inline-block;
        padding: 20px 0 0 15px;
      }
      .update {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
      }
      .commit-content {
        background-color: #f2efef;
        height: 50px;
        line-height: 50px;
        margin-left: 30px;
      }
    }
    .commit {
      border-top: solid 1px #c4c4c4;
      // overflow-y: auto;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      .text {
        width: 100%;
        height: 60px;
        border: none;
        outline: none;
        font-size: 14px;
        margin: 10px 0 0 10px;
        text-align: justify;
        text-justify: newspaper;
        word-break: break-all;
      }
    }
  }
}
.priority1 {
  background: #ed5050;
  color: #fff !important;
}
.priority2 {
  background: rgb(232, 170, 132);
  color: #fff !important;
}
.priority3 {
  background: rgb(69, 132, 0);
  color: #fff !important;
}
.priority100 {
  background: rgb(187, 184, 184);
  color: #fff !important;
}
</style>
