<template>
  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%" class="table">
    <el-table-column prop="id" label="编号" width="90" />
    <el-table-column prop="name" label="资源名称" />
    <el-table-column prop="url" label="资源路径" />
    <el-table-column prop="description" label="描述" />
    <el-table-column label="添加时间">
      <template #default="scope">
        {{ formateDate(scope.row.createTime) }}
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页器 -->
  <div class="pag">
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
      background layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handlePag"
      @current-change="handlePag" />
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { getResourceList } from '@/request/api'
import { formateDate } from '@/utils/handleData'

let { tableData, currentPage, pageSize, total } = toRefs(
  reactive<{
    tableData: {}[];
    currentPage: number;
    pageSize: number;
    total: number
  }>({
    tableData: [],
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
)

// 请求资源列表（分页）
const fetchResourceDataBy = async () => {
  let res = await getResourceList({
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  })
  tableData.value = res.data.data.list
  total.value = res.data.data.total
}
fetchResourceDataBy()


// 分页按钮
const handlePag = () => {
  fetchResourceDataBy()
}

</script>

<style lang = "less" scoped>
.table {
  margin-top: 20px;
}

.pag {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  text-align: center;
}
</style>