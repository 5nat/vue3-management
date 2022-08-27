<template>
  <!-- 编辑&添加用户 -->
  <el-dialog v-model="visible" title="编辑/添加用户" :before-close="close">
    <el-form :model="newForm" :label-width="formLabelWidth">
      <el-form-item label="账号">
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="newForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="newForm.note" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio v-model="newForm.status" :label="1">是</el-radio>
        <el-radio v-model="newForm.status" :label="0">否</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="modifyAdmin">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
import { updateAdminApi, registerAdminApi } from '@/request/api'
// import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps<{
  visible: boolean;
  form: AdminObjItf
}>()

const { formLabelWidth, newForm } = toRefs(
  reactive<{
    formLabelWidth: string;
    newForm: AdminObjItf;
  }>({
    formLabelWidth: '100px',
    newForm: {},
  })
)

// 拷贝form
watch(() => props.form, () => {
  newForm.value = { ...props.form }
})

const emit = defineEmits<{
  (event: 'close', reload?: 'reload'): void
}>()

// 点击关闭
const close = (reload?: 'reload') => {
  emit('close', reload)
}

// 点击确定
const modifyAdmin = async () => {
  // ElMessageBox.confirm(
  //   '此操作将添加当前用户信息, 是否继续?',
  //   '提示',
  //   {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   }
  // )
  //   .then(async () => {

  //   })
  //   .catch(() => {
  //     ElMessage({
  //       type: 'info',
  //       message: '取消操作',
  //     })
  //   })
  // 发请求编辑
  if (newForm.value.username && newForm.value.password) {
    if (newForm.value.id) {
      await updateAdminApi(newForm.value.id, newForm.value)
      close('reload')
    } else {
      await registerAdminApi(newForm.value)
      close('reload')
    }
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
  } else {
    ElMessage({
      type: 'info',
      message: '账户和密码不能为空',
    })
  }
}

</script>

<style lang = "less" scoped>
</style>