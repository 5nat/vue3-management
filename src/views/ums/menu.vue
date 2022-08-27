<template>
  <!-- 添加卡片 -->
  <el-card shadow="always" class="addCard">
    <el-icon>
      <Tickets />
    </el-icon>
    <span> 数据列表</span>
    <el-button type="primary" @click="addMenu" class="btnCrad">添加</el-button>
  </el-card>

  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%" class="table">
    <el-table-column prop="id" label="编号" width="90" />
    <el-table-column prop="username" label="菜单名称" />
    <el-table-column prop="nickName" label="菜单级数" />
    <el-table-column prop="email" label="前端名称" />
    <el-table-column prop="email" label="前端图标" />
    <el-table-column label="是否显示">
      <template #default="scope">
        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="email" label="排序" />
    <el-table-column label="设置">
      <template #default="{ row }">
        <el-button type="" @click="findNextGrade">查看下级</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作"></el-table-column>
  </el-table>

  <!-- 分页器 -->
  <div class="pag">
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
      background layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handlePag"
      @current-change="handlePag" />
  </div>

</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { getAdminListsApi, getRoleListAll, getAdminRoleById } from '@/request/api'


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

// 点击添加菜单按钮
const addMenu = () => {

}

// 点击查看下级按钮
const findNextGrade = () => {

}

// 点击分页按钮
const handlePag = () => {

}


</script>

<style lang="less" scoped>
.addCard {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}

.btnCrad {
  float: right;
}


.pag {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  text-align: center;
}
</style>
