<template>
  <!-- 侧边菜单栏 -->
  <el-menu active-text-color="#ffd04b" background-color="#304156" class="el-menu-vertical-demo" default-active="/"
    text-color="#fff" :unique-opened="true" :router="true">
    <!-- 首页 -->
    <el-menu-item index="/">
      <el-icon>
        <House />
      </el-icon>
      <span>首页</span>
    </el-menu-item>

    <!-- 动态生成的菜单 -->
    <el-sub-menu :index="'' + menus.id" v-for="menus in newMenus" :key="menus.id" :disabled="menus.title !== '权限'">
      <template #title>
        <el-icon>
          <House />
        </el-icon>
        <span>{{ menus.title }}</span>
      </template>
      <template v-for="subMenus in menus.children" :key="subMenus.id">
        <el-menu-item :index="'/' + menus.name + '/' + subMenus.name" v-if="!subMenus.hidden">
          <el-icon>
            <Lock />
          </el-icon>
          <span>{{ subMenus.title }}</span>
        </el-menu-item>
      </template>
    </el-sub-menu>

    <!-- 首页 -->
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <span>首页111111</span>
    </el-menu-item>
    <!-- 首页 -->
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <span>首页2222222222</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'

const { newMenus } = defineProps<{
  newMenus: NewMenus
}>()


</script>

<style lang = "less" scoped>
</style>