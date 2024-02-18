<template>
    <template v-for="subItem in menuList" :key="subItem.path">
      <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
        <template #title>
          <el-icon v-if="subItem.meta.icon">
            <component :is="subItem.meta.icon"></component>
          </el-icon>
          <span class="sle">{{ subItem.meta.title }}</span>
        </template>
        <Menu :menu-list="subItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <template #title>
          <span class="sle">{{ subItem.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
  
  <script setup lang="ts" name="Menu">
  // @ts-nocheck
  import { useRouter } from "vue-router";
  
  defineProps({
    menuList:{
        type: Array
    }
});
  
  const router = useRouter();
  const handleClickMenu = (subItem:any) => {
    if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
    router.push(subItem.path);
  };
  </script>
  
  <style lang="scss">
  .el-sub-menu .el-sub-menu__title:hover {
    color: #333333 !important;
    background-color: transparent !important;
  }
  .el-menu--collapse {
    .is-active {
      .el-sub-menu__title {
        color: #ffffff !important;
        background-color: #e6f5f3 !important;
      }
    }
  }
  .el-menu-item {
    &:hover {
      color: #333333;
    }
    &.is-active {
      color: #009688 !important;
      background-color: #e6f5f3 !important;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 4px;
        content: "";
        background-color: #e6f5f3;
      }
    }
  }
  .vertical,
  .classic,
  .transverse {
    .el-menu-item {
      &.is-active {
        &::before {
          left: 0;
        }
      }
    }
  }
  .columns {
    .el-menu-item {
      &.is-active {
        &::before {
          right: 0;
        }
      }
    }
  }
  </style>
  