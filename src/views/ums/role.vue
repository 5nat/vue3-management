<template>
  <!-- 搜索卡片 -->
  <el-card shadow="always" class="searchCard">
    <div>
      <el-icon>
        <Search />
      </el-icon>
      <span> 筛选搜索</span>
      <div class="btnCrad">
        <el-button type="" @click="reset">重置</el-button>
        <el-button type="primary" @click="search">查询搜索</el-button>
      </div>
    </div>
    <div class="searchInput">
      <span>账号/姓名：</span>
      <el-input v-model.trim="searchVal" class="w-50 m-2" size="large" placeholder="请输入账号、姓名" />
    </div>
  </el-card>

  <!-- 添加卡片 -->
  <el-card shadow="always" class="addCard">
    <el-icon>
      <Tickets />
    </el-icon>
    <span> 数据列表</span>
  </el-card>
  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%" class="table">
    <el-table-column prop="id" label="编号" width="90" />
    <el-table-column prop="name" label="角色名称" />
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="adminCount" label="用户数" />
    <el-table-column label="添加时间">
      <template #default="scope">
        {{ formateDate(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="是否启用" width="100">
      <template #default="scope">
        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="" @click="allocRecourse(row.id)">分配资源</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 树形结构数据 -->


  <!-- 分页器 -->
  <div class="pag">
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" background
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handlePag"
      @current-change="handlePag" />
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { getRoleList } from '@/request/api'
import { formateDate } from '@/utils/handleData'
import { useRouter } from 'vue-router'
import { json } from 'stream/consumers';

const router = useRouter()
let { tableData, searchVal, currentPage, pageSize, total } = toRefs(
  reactive<{
    tableData: {}[];
    searchVal: string;
    currentPage: number;
    pageSize: number;
    total: number
  }>({
    tableData: [],
    searchVal: '',
    currentPage: 1,
    pageSize: 5,
    total: 0
  })
)


// 根据关键字和分页请求角色列表数据  - （请求所有角色列表）
const fetchDataByVal = async () => {
  let res = await getRoleList({
    keyword: searchVal.value,
    pageSize: pageSize.value,
    pageNum: currentPage.value
  })
  tableData.value = res.data.data.list
  total.value = res.data.data.total
}
fetchDataByVal()

// 点击重置
const reset = () => {
  searchVal.value = ''
}

// 点击搜索按钮
const search = async () => {
  fetchDataByVal()
}

// 分页按钮（两个）
const handlePag = () => {
  fetchDataByVal()
}

// 点击分配资源按钮
const allocRecourse = (roleId: number) => {
  router.push({
    name: 'allocResource',
    query: {
      id: roleId
    }
  })
}
</script>

<style lang = "less" scoped>
.addCard {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}

.btnCrad {
  float: right;
}

.searchInput {
  display: flex;
  margin-top: 20px;
  line-height: 40px;
  padding: 10px 30px;

  .w-50 {
    width: 20%;
  }
}

.pag {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  text-align: center;
}
</style>