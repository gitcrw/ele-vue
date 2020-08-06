<template>
  <div>
    <ct :allProject="allProject"></ct>
    <transition mode="out-in">
    <div v-if="viewStyle=='card'" key="card">
      <div class="all-project" >
        <div :key="item.name" class="item-box" v-for="item in allProject">
          <div class="item-info">
            <img :src="item.cover" alt />
            <h4 class="title">{{item.name}}</h4>
            <p class="desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="viewStyle=='list'"  key="list">
       <div class="list-project">
          <div class="list-item" :key="item.name" v-for="item in allProject">
            <div>
              <img src="@/assets/logo.svg" alt="" class="icon">
              <h4 class="title">{{item.name}}</h4>
              <p class="desc">{{item.desc}}</p>
            </div>
          </div>
       </div>
    </div>
    </transition>
  </div>
</template>
<script>
import ct from "../components/ContentTop";

export default {
  components: { ct },
  props: ["allProject"],
  data() {
    return {
      viewStyle:'card'
    };
  },
  created(){
    
  },
  methods: {
    qh() {
      this.isqh = !this.isqh;
    },
  },
  watch: {
    "$store.state.viewStyle": function (to, from) {
      this.viewStyle = to
    },
  },
};
</script>
<style lang="scss" scoped>
.all-project {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  .item-box {
    height: 120px;
    width: 25%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 30px;
    .item-info {
      width: 85%;
      background: rgb(246, 246, 246);
      border: 1px solid rgb(196, 196, 196);
      border-radius: 12px;
      padding: 12px;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .title {
        position: absolute;
      }
      .desc {
        position: absolute;
        top: 30px;
        margin-top: 14px;
        font-size: 14px;
      }
    }
  }
}

.list-project{
  padding: 0 30px;
  .list-item{
    padding-bottom: 16px;
    margin-bottom: 20px;
    border-bottom:2px solid #F1F1F1;
    padding-left: 30px;
    position: relative;
    .title{
      margin-bottom: 10px;
    }
    .desc {
        font-size: 12px;
      }
      .icon{
        position: absolute;
        width: 20px;
        height: 20px;
        background: black;
        left: 0;
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