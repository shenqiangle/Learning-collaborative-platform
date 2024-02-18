<template>
    <div class="tool-bar-lf">
      <el-tooltip :content="isCollapse ? '打开侧边栏' : '关闭侧边栏' " effect="dark">
        <CollapseIcon id="CollapseIcon" />
      </el-tooltip>
      <!-- <Breadcrumb /> -->
    </div>
</template>


<script setup lang="ts" name="ToolBarLeft">
import CollapseIcon from "./components/CollapseIcon.vue";
import { useGlobalStore } from "@/stores/modules/global";
import { computed } from 'vue';
const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
//import Breadcrumb from "./components/Breadcrumb.vue";

</script>


<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>