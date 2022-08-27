<template>
  <MyPie :data="salePie"></MyPie>
  <MyMap :data="saleMap"></MyMap>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { getAdminStat } from '@/request/api'
import MyPie from './components/MyPie.vue'
import MyMap from './components/MyMap.vue'


const { salePie, saleMap } = toRefs(
  reactive<{
    salePie: {}[];
    saleMap: {}[];
  }>({
    salePie: [],
    saleMap: []
  })
)
getAdminStat().then(res => {
  if (res.data.errno === 0) {
    salePie.value = res.data.data.salePie
    saleMap.value = res.data.data.saleMap
  }
})
</script>

<style lang="less" scoped>
</style>
