<template>
  <div class="homepage_container">

    <!-- 头部 -->
    <div class="homepage_header">
      <div class="left">写着玩的管理系统</div>
      <div class="right">
        <img :src="store.state.icon" alt="">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ store.state.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="homepage_menu">
      <Menu :newMenus="newMenus"></Menu>
    </div>

    <!-- 内容 -->
    <div class="homepage_content">
      <!-- <div class="breadcrumb ">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        </el-breadcrumb>
      </div> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, computed } from 'vue'
import Menu from './components/Menu.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { adminLogoutApi } from '@/request/api'
import Cookies from 'js-cookie'

let store = useStore()
let router = useRouter()

// 不同账号返回不同的menus
const newMenus = computed<NewMenus>(() => store.getters.getNewMenus)

// 点击退出按钮
const logout = async () => {
  await adminLogoutApi()
  Cookies.remove('token')
  router.replace('/login')
}
</script>

<style lang="less" scoped>
.homepage_container {
  position: relative;
  height: 100%;

  .homepage_header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 50px;
    width: 100%;
    height: 70px;
    background-color: #409EFF;
    font-size: 25px;
    color: #fff;
    z-index: 999999;

    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 100px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }


  }

  .homepage_menu {
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: #304156;
  }

  .homepage_content {
    position: absolute;
    top: 70px;
    right: 0;
    left: 250px;
    padding: 20px;

    // .breadcrumb {
    //   display: flex;
    //   align-items: center;
    //   height: 50px;
    //   border-bottom: 1px solid #eee;
    // }
  }
}
</style>
