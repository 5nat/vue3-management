<template>
  <el-card class="box-card">
    <div v-for="cateObj in resourceCateList" :key="cateObj.id">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="categoryStatus">{{ cateObj.name }}
      </el-checkbox>
      <el-checkbox-group v-model="checkResource" @change="resourceStatus">
        <template v-for="resObj in resourceList" :key="resObj.id">
          <el-checkbox v-if="cateObj.id === resObj.categoryId" :label="resObj.id">{{
              resObj.name
          }}</el-checkbox>
        </template>
      </el-checkbox-group>
    </div>
  </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, computed, watch } from 'vue'
import { getResourceCategoryList, getResourceListAll, getRoleResourceList } from '@/request/api'
import { useRoute } from 'vue-router';
const route = useRoute()

let { checkAll, isIndeterminate, checkResource, resourceList, resourceCateList, roleResourceList } = toRefs(
  reactive<{
    checkAll: boolean;
    isIndeterminate: boolean;
    checkResource: number[];
    resourceList: RecourseObjItf[];
    resourceCateList: RecourseCategoryItf[],
    roleResourceList: RecourseObjItf[],
  }>({
    checkAll: false,
    isIndeterminate: true,
    checkResource: [],
    resourceList: [],
    resourceCateList: [],
    roleResourceList: [],
  })
)

// 请求所有资源分类列表
getResourceCategoryList().then(res => {
  if (res.data.code === 200) {
    resourceCateList.value = res.data.data
  }
})

// 请求所有资源列表
getResourceListAll().then(res => {
  if (res.data.code === 200) {
    resourceList.value = res.data.data
  }
})

// 请求角色的资源列表
const roleId = Number(route.query.id)  // 角色id
getRoleResourceList(roleId).then(res => {
  if (res.data.code === 200) {
    roleResourceList.value = res.data.data
    // 初始化复选框
    checkResource.value = roleResourceList.value.map(item => item.id)
  }
})


// 点击模块复选框
const categoryStatus = (val: boolean) => {
  // checkResource.value = val ? resourceList.value : [] 
  // isIndeterminate.value = false
}

// 点击资源管理模块        
const resourceStatus = (arr: number[]) => {
  // const checkedCount = arr.length
  // checkAll.value = checkedCount === resourceList.value.length
  // isIndeterminate.value = checkedCount > 0 && checkedCount < resourceList.value.length
}
</script>

<style lang = "less" scoped>
.box-card {
  padding: 20px;
}
</style>