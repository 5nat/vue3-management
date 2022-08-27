<template>
  <div class="loginpage">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginFn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
// import { values } from 'lodash'
import { ref, reactive, toRefs } from 'vue'
import { adminLoginApi, getAdminInfoApi } from '../../request/api'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 获取el-form组件对象
let ruleFormRef = ref()
// 获取项目路由对象
let router = useRouter()
// 获取项目vuex对象
let store = useStore()
// 登录表单数据
let { ruleForm } = toRefs(
  reactive({
    ruleForm: {
      password: '123456',
      username: 'admin'
    }
  })
)
// 自定义密码规则
const validatePwd = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
  if (!value) {
    callback('密码不能为空')
  } else {
    callback()
  }
}
// 校验规则
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, validator: validatePwd, trigger: 'blur' }]
})
// 点击登录按钮事件触发器
const loginFn = async () => {
  try {
    // 表单验证
    await ruleFormRef.value.validate()
    // 登录 -> 存token（js-cookie）
    let res = await adminLoginApi({
      password: ruleForm.value.password,
      username: ruleForm.value.username
    })
    Cookies.set('token', res.data.data.tokenHead + res.data.data.token, { expires: 7 })
    // 获取用户信息->存vuex->路由跳转
    // let res2 = await getAdminInfoApi()
    // console.log(res2.data)
    // store.commit('updateMenus', res2.data.data.menus)
    store.dispatch('getAdminInfo')
    router.push('/homepage')
  } catch (error) {
    console.log('登录没有校验过关')
  }
}
</script>

<style lang="less" scoped>
.loginpage {
  height: 100%;
  background-color: rgba(9, 61, 156, 0.384);
  display: flex;
  align-items: center;
  justify-content: center;

  .demo-ruleForm {
    background-color: aqua;
  }
}
</style>
