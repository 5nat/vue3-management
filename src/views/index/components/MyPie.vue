<template>
  <div class="pie_header">
    <el-radio-group v-model="selectLabel" @change="dayChange">
      <el-radio-button label="sale_">销量</el-radio-button>
      <el-radio-button label="_money">销售额</el-radio-button>
    </el-radio-group>
    <el-select v-model="selectDay" placeholder="Select" @change="dayChange">
      <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value" />
    </el-select>
  </div>
  <div id="pie" style="width: 100%; height: 375px"></div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  data: {}[]
}>()

let { selectLabel, selectDay, options } = toRefs(
  reactive({
    selectLabel: '_money',
    selectDay: 'today',
    options: [
      { name: '今天', value: 'today' },
      { name: '昨天', value: 'yesterday' },
      { name: '前三天', value: 'three_days' },
      { name: '前七天', value: 'seven_days' },
      { name: '一个月前', value: 'thirty_days' },
    ]
  })
)

const dayChange = () => {
  initPie()
}

watch(() => props.data, () => {
  initPie()
})

// 初始化饼图数据方法
let myChart: echarts.ECharts
const initPie = () => {
  let key = ''
  if (selectLabel.value === '_money') {
    key = selectDay.value + selectLabel.value
  } else {
    key = selectLabel.value + selectDay.value
  }
  const arr = props.data.map((item: { [key: string]: string }) => ({ value: item[key], name: item.name }))
  // 基于准备好的dom，初始化echarts实例
  if (!myChart) myChart = echarts.init(document.getElementById('pie') as HTMLElement)
  // 指定图表的配置项和数据
  var option = {
    legend: {
      right: 20,
      top: 20,
      width: 300,
      height: 100,
      orient: 'vertical'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['25%', '45%'],
        data: arr
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}



</script>

<style lang = "less" scoped>
.pie_header {
  display: flex;
  justify-content: space-between;
  align-self: center;
  padding: 30px;
}
</style>