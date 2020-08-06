<template>
  <div>
    <div v-if="childFolderInfos">
      <div v-for="file in childFolderInfos" :key="file.id" class="out-item-box">
        <div>{{file.name}}</div>
        <div class="item-box">
          <div v-for="item in file.fileInfos" :key="item.id" class="file-item-box">
              <img class="img" :src="fp+'/'+item.id" alt />
              <p>名称：{{item.name}}</p>
              <p>大小：{{item.size}}kb</p>
              <p>作者：{{item.author}}</p>
          </div>
          <div class="dload">
            <div class="sc">
                上传
            </div>
            <div class="xz">下载</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    // props: ["childFolderInfos"],

  data() {
    return {
      childFolderInfos: [
        {
          fileInfos: [
            {
              author: "王锦川",
              id: 21,
              name: "图库logo512x512.png",
              path:
                "/usr/local/tuku/产品图片/测试1/原图/图库logo512x51220200718031233.png",
              size: 12359,
            },
            {
              author: "王锦川",
              id: 32,
              name: "logo.png",
              path:
                "/usr/local/tuku/产品图片/测试1/原图/logo20200728054544.png",
              size: 7574,
            },
            {
              author: "王锦川",
              id: 33,
              name: "食品经营许可证.jpg",
              path:
                "/usr/local/tuku/产品图片/测试1/原图/食品经营许可证20200728054544.jpg",
              size: 809378,
            },
            {
              author: "王锦川",
              id: 34,
              name: "厨房.jpg",
              path:
                "/usr/local/tuku/产品图片/测试1/原图/厨房20200728054544.jpg",
              size: 220180,
            },
            {
              author: "王锦川",
              id: 40,
              name: "Android.png",
              path:
                "/usr/local/tuku/产品图片/测试1/原图/Android20200803025644.png",
              size: 3663,
            },
          ],
          id: 15,
          name: "原图",
        },
        {
          fileInfos: [
            {
              author: "王锦川",
              id: 41,
              name: "logo.png",
              path:
                "/usr/local/tuku/产品图片/测试1/修图/logo20200805031714.png",
              size: 7574,
            },
            {
              author: "王锦川",
              id: 42,
              name: "厨房.jpg",
              path:
                "/usr/local/tuku/产品图片/测试1/修图/厨房20200805031714.jpg",
              size: 220180,
            },
            {
              author: "王锦川",
              id: 43,
              name: "720d458f-0ca7-4624-843d-ef712589d24a!source.jpg",
              path:
                "/usr/local/tuku/产品图片/测试1/修图/720d458f-0ca7-4624-843d-ef712589d24a!source20200805031714.jpg",
              size: 87155,
            },
            {
              author: "王锦川",
              id: 44,
              name: "d0ad752b-8733-459c-83d8-aec4595c50a3!source.jpg",
              path:
                "/usr/local/tuku/产品图片/测试1/修图/d0ad752b-8733-459c-83d8-aec4595c50a3!source20200805031714.jpg",
              size: 136262,
            },
            {
              author: "王锦川",
              id: 45,
              name: "349f3c3e-a604-4fec-ba50-2128c3516cbf!source.jpg",
              path:
                "/usr/local/tuku/产品图片/测试1/修图/349f3c3e-a604-4fec-ba50-2128c3516cbf!source20200805031714.jpg",
              size: 40058,
            },
            {
              author: "王锦川",
              id: 46,
              name: "食品经营许可证.jpg",
              path:
                "/usr/local/tuku/产品图片/测试1/修图/食品经营许可证20200805031714.jpg",
              size: 809378,
            },
            {
              author: "王锦川",
              id: 47,
              name: "ChMlWl6Be0CINUnlAAwrGWyX82sAAN8dQEXXksADCsx816.jpg",
              path:
                "/usr/local/tuku/产品图片/测试1/修图/ChMlWl6Be0CINUnlAAwrGWyX82sAAN8dQEXXksADCsx81620200805031714.jpg",
              size: 492534,
            },
          ],
          id: 16,
          name: "修图",
        },
        {
          fileInfos: [],
          id: 17,
          name: "主图",
        },
        {
          fileInfos: [],
          id: 18,
          name: "详情图",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.out-item-box {
  padding:20px 30px;
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

  .dload{
    margin-top: 20px;
    min-width: 30px;
    height: 200px;
    overflow: hidden;
    // margin-left: 10px;
    >div{
      width: 80px;
      height: 80px;
      background: #fff;
      border: 1px solid #ccc;
      float: left;
    }
    .sc{
      margin-right: 10px;
    }
  }
}
</style>