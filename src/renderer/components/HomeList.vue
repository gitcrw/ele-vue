<template>
    <div class="project">
      <div v-for="item in allProject" :key="item.name" class="project-item1">
        <!-- <img :src="item.cover" alt=""> -->
        <div class="project-item-info">
            {{item.name}}
        </div>
      </div>
  </div>
    
</template>
<script>
export default {
  props: ['allProject']
}
</script>
<style lang="scss" scoped>


</style>