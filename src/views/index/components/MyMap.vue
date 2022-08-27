<template>
  <div id="myMap" style="width: 100%; height: 600px"></div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
import * as echarts from 'echarts'
import china from '@/data/china.json'

const props = defineProps<{
  data: {}[]
}>()

echarts.registerMap('china', china as any)
// 初始化饼图数据方法
let myMap: echarts.ECharts
watch(() => props.data, () => {
  const data = props.data.map((item: { [key: string]: string }) => ({ value: item.saleNum, name: item.areaName }))

  if (!myMap) myMap = echarts.init(document.getElementById('myMap') as HTMLElement)
  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      show: true,
      formatter: '{b0} <br />销量: {c0}',
      backgroundColor: 'rgba(50, 50, 50, 0.7)',
      textStyle: {
        color: '#fff'
      }
    },
    visualMap: {
      type: 'continuous',
      min: 0,
      max: 1000000,
      calculable: true.valueOf,
      inRange: {
        color: ['#121122', 'rgba(3, 4, 5, 0.4)', 'green', 'yellow', 'red']
      }
    },
    series: {
      type: 'map',
      map: 'china',
      itemStyle: {
        borderColor: '#fff'
      },
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          areaColor: 'blue'
        }
      },
      data
    }
  }
  // 使用刚指定的配置项和数据显示图表。
  myMap.setOption(option)

})


</script>

<style lang = "less" scoped>
#myMap {
  border-top: 1px solid #eee;
}
</style>