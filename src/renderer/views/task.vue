<template>
  <div class="task-box">
    <div class="top">
      <div class="top-left" v-if="total">
        <span @click="action(2)" :class="type==2?'active':''">我执行的({{total.executor}})</span>
        <span @click="action(1)" :class="type==1?'active':''">我创建的({{total.creator}})</span>
        <span @click="action(3)" :class="type==3?'active':''">我参与的({{total.partaker}})</span>
      </div>
      <div class="top-right">
        <el-button @click="drawer = true" size="mini" style="margin-left: 16px;">筛选</el-button>
        <span>新建任务</span>
      </div>
    </div>
    <div class="task" ref="scroll">
      <div class="task-content" ref="scroll_a">
        <div class="task-item" v-for="item in taskData" :key="item.id">
          <el-checkbox></el-checkbox>
          <span class="btn">紧急</span>
          <span class="title c-pointer" @click="showDetail(item.id)">{{item.title}}</span>
          <div class="content">
            <ul class="content-box">
              <li class="content_item">
                <img :src="require('@/assets/images/project_icon.svg')" />
                <span style="margin: 0 5px;">项目：{{item.projectName}}</span>
              </li>
              <li class="content_item">
                <img :src="require('@/assets/images/fujian_icon.svg')" />
                <span style="margin: 0 5px;">内含附件</span>
              </li>
              <li class="content_item">
                <img :src="require('@/assets/images/date_icon.svg')" />
                <span style="margin: 0 5px;">2020/8/4</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <task-detail ref="detail"></task-detail>
    <create-task ref="create"></create-task>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
    >
      <div class="saixuan">
        <div class="item-box">
          <p class="title">状态</p>
          <div class="btn-box">
            <el-radio-group v-model="radio1" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">正在进行中</el-radio-button>
              <el-radio-button label="2">已完成</el-radio-button>
            </el-radio-group>
          </div>
        </div>
				<div class="item-box">
          <p class="title">截止时间</p>
          <div class="btn-box">
            <el-radio-group v-model="radio2" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">今天到期</el-radio-button>
              <el-radio-button label="2">明天等到期</el-radio-button>
							<el-radio-button label="3">一周到期</el-radio-button>
							<el-radio-button label="4">一个月到期</el-radio-button>
            </el-radio-group>
          </div>
        </div>
				<div class="item-box">
          <p class="title">优先级</p>
          <div class="btn-box">
            <el-radio-group v-model="radio3" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1" >高</el-radio-button>
              <el-radio-button label="2" >中</el-radio-button>
							<el-radio-button label="3" >低</el-radio-button>
							<el-radio-button label="100" >无</el-radio-button>
            </el-radio-group>
          </div>
        </div>
				<div class="item-box">
          <p class="title">项目</p>
          <div class="btn-box">
            <el-radio-group v-model="radio4" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">产品图片</el-radio-button>
              <el-radio-button label="2">专题活动</el-radio-button>
							<el-radio-button label="3">其他</el-radio-button>
            </el-radio-group>
          </div>
        </div>
				<div class="bottom_btn">
					 <el-button type="primary"  size="mini">重置</el-button>
						 <el-button type="primary"  size="mini" @click="commit()">确认</el-button>
				</div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import createTask from "@/views/taskPopup/createNewTask";
import taskDetail from "@/views/taskPopup/taskDetailPopup";
import ct from "@/components/ContentTop";
export default {
  props: ["allProject"],
  data() {
    return {
      isShowTaskPopup: false,
      taskData: [],
      type: 2,
      total: "",
      loading: false,
      pageNumber: 1,
      canscroll: true,
      activeisload: true,
      init: false,
			drawer: true,
			radio1: '',
			radio2: '',
			radio3: '',
			radio4: '',
    };
  },
  mounted() {},
  created() {
    this.action(2);
  },

  methods: {
		commit(){
			let params = {
				status : this.radio1,
				expireType:this.radio2,
				priority:this.radio3,
				type:this.type
			}
			this.$api.GET_TASKS(params).then((res) => {
          this.total = res.data.relateMeDataResult;
        this.taskData = res.data.assignmentPageArrayListResults
      });
			console.log(this.radio1,this.radio2,this.radio3,this.radio4)
		},
    //滚动监听
    listen() {
      console.log("jiant");
      let list = this.$refs.scroll;
      let list_a = this.$refs.scroll_a;
      list.addEventListener("scroll", () => {
        if (this.init) {
          if (this.canscroll) {
            let list_h = parseInt(getComputedStyle(list).height);
            let list_y = parseInt(getComputedStyle(list_a).height);
            let ok = list_y - (list.scrollTop + list_h);
            if (ok <= 0) {
              this.canscroll = false;
              if (this.activeisload) {
                this.pageNumber += 1;
                let params = { type: this.type, pageNumber: this.pageNumber };
                this.ajaxData(params);
              } else {
                console.log("已加载完");
              }
            }
            console.log(list.scrollTop, list_h, list_y, ok);
          }
        }
      });
    },
    ajaxData(params, once = false) {
      this.$api.GET_TASKS(params).then((res) => {
        if (once) {
          this.total = res.data.relateMeDataResult;
        }
        if (res.data.assignmentPageArrayListResults.length < 20) {
          this.activeisload = false;
          console.log("已加载完");
        } else {
          this.canscroll = true;
        }
        this.taskData.push(...res.data.assignmentPageArrayListResults);
      });
    },
    action(type) {
      this.init = false;
      this.type = type;
      this.taskData = [];
      this.pageNumber = 1;
      this.canscroll = true;
      this.activeisload = true;
			let params = {
				type,
				pageNumber: 1,
				status : this.radio1,
				expireType:this.radio2,
				priority:this.radio3
			}
      this.$api.GET_TASKS(params).then((res) => {
        this.total = res.data.relateMeDataResult;
        this.taskData.push(...res.data.assignmentPageArrayListResults);
        this.init = true;
        this.listen();
      });
    },
    showDetail(id) {
      this.$store.commit("taskId", id);
      this.$refs.detail.visible = true;
    },
    /**
     * 显示新建任务弹框
     */
    handleCreateTask() {
      this.$refs.create.show = true;
      console.log(this.$refs.create.show, "show");
    },
  },
  components: {
    ct,
    taskDetail,
    createTask,
  },
};
</script>

<style lang="scss" scoped>
.saixuan {
  padding: 30px 10px;
  .item-box {
    margin-bottom: 30px;
    .title {
      font-size: 14px;
      margin-bottom: 20px;
    }
    .btn-box {
			font-size: 12px;
			padding-left: 20px;
		}
		
	}
	.bottom_btn{
			text-align: right;
			padding-top: 50px;
			margin-right: 20px;
		}
}

.task-content {
}
.list-item {
  background: pink;
  height: 100px;
  // margin-bottom: 20px;
}
.active {
  color: blue;
}
.task-box {
  width: 100%;
  overflow: hidden;
  height: 100%;
  .top {
    padding: 8px 15px 0 24px;
    width: 100%;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
    // background: #fff;
    .top-left {
      float: left;
      span {
        margin-right: 20px;
        cursor: pointer;
      }
      // margin-right: 10px;
    }
    .top-right {
      float: right;
    }
  }

  .task {
    height: 100%;
    overflow-y: auto;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    .task-item {
      text-align: left;
      align-items: center;
      flex-wrap: nowrap;
      margin: 15px 10px;

      .btn {
        width: 30px;
        height: 12px;
        background-color: red;
        border-radius: 15px;
        text-align: center;
        color: #ffffff;
      }

      .content {
        color: darkgrey;
        margin-top: 15px;
        font-size: 12px;

        .content-box {
          display: flex;
          flex-wrap: nowrap;
          margin-left: 20px;

          &_item {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>

