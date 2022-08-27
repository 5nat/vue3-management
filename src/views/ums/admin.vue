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
    <el-button type="primary" @click="addAdmin" class="btnCrad">添加</el-button>
  </el-card>

  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%" class="table">
    <el-table-column prop="id" label="编号" width="50" />
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="添加时间">
      <template #default="scope">
        {{ formateDate(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="最后时间">
      <template #default="scope">
        {{ formateDate(scope.row.loginTime) }}
      </template>
    </el-table-column>
    <el-table-column label="是否启用" width="100">
      <template #default="scope">
        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template #default="{ row }">
        <el-button type="" @click="allocRole(row.id)">分配角色</el-button>
        <el-button type="" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 编辑用户 -->
  <EdmitAdmin :visible="visible" :form="rowData" @close="closeDiaog"></EdmitAdmin>

  <!-- 编辑角色 -->
  <EdmitRole :visible="roleVisible" :form="roleData" @close="closeRoleDiaog"></EdmitRole>

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
import EdmitAdmin from './components/EdmitAdmin.vue'
import EdmitRole from './components/EditRole.vue'
import { formateDate } from '@/utils/handleData'


let { tableData, visible, rowData, roleVisible, roleData, searchVal, currentPage, pageSize, total } = toRefs(
  reactive<{
    tableData: {}[];
    visible: boolean;
    rowData: AdminObjItf;
    roleVisible: boolean;
    roleData: AdminRoleFormData;
    searchVal: string;
    currentPage: number;
    pageSize: number;
    total: number
  }>({
    // 编辑&添加
    tableData: [],
    visible: false,
    // 分配角色
    rowData: {},
    roleVisible: false,
    roleData: {
      userRoles: [],
      roleLists: [],
      adminId: 0
    },
    // search-keyword
    searchVal: '',
    // 分页
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
)

// 请求用户列表数据
const fetchData = async () => {
  let res = await getAdminListsApi({
    keyword: searchVal.value,
    pageSize: pageSize.value,
    pageNum: currentPage.value
  })
  tableData.value = res.data.data.list
  total.value = res.data.data.total
}
fetchData()

// 请求角色列表
getRoleListAll().then(res => {
  if (res.data.code === 200) {
    roleData.value.roleLists = res.data.data
  }
})

// ------------------------------------------
// 当前分页或pageSize变化时
const handlePag = () => {
  fetchData()
}

// -------------------------------------------
// 点击重置
const reset = () => {
  searchVal.value = ''
}

// 点击搜索按钮
const search = () => {
  fetchData()
}

// ---------------------------------------------
// 点击分配角色
const allocRole = async (id: number) => {
  // 请求用户角色列表
  const res = await getAdminRoleById(id)
  roleData.value.userRoles = res.data.data
  roleData.value.adminId = id
  roleVisible.value = true
}

// 隐藏分配角色弹框 
const closeRoleDiaog = () => {
  roleVisible.value = false
}

// ----------------------------------------------
// 点击编辑按钮
const editAdmin = (row: AdminObjItf) => {
  visible.value = true
  rowData.value = row
}

// 点击添加按钮
const addAdmin = () => {
  visible.value = true
  rowData.value = {}
}

// 隐藏编辑&添加弹框
const closeDiaog = (reload?: 'reload') => {
  visible.value = false
  rowData.value = {}
  if (reload) fetchData()
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
