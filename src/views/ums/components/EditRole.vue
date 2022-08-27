<template>
  <!-- 编辑角色 -->
  <el-dialog v-model="visible" title="Shipping address" :before-close="close">
    <el-form :model="form">
      <el-form-item>
        <el-select multiple v-model="rolesID" placeholder="Please select a zone">
          <el-option v-for="role in form.roleLists" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="updataRole">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
import { updateAdminRole } from '@/request/api'


const props = defineProps<{
  visible: boolean;
  form: AdminRoleFormData
}>()

let { rolesID } = toRefs(
  reactive<{
    rolesID: number[]
  }>({
    rolesID: []
  })
)

// 监听用户角色列表，转换为数字数组
watch(() => props.form.userRoles, () => {
  rolesID.value = props.form.userRoles.map(item => item.id)
})

const emit = defineEmits<{
  (event: 'close'): void
}>()

// 点击取消按钮
const close = () => {
  emit('close')
}

// 点击确定按钮
const updataRole = async () => {
  await updateAdminRole({ adminId: props.form.adminId, roleIds: rolesID.value.join(',') })
  close()
}

</script>

<style lang = "less" scoped>
</style>