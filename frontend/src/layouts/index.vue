<!--经典布局 -->
<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutClassic" />
  <!-- <ThemeDrawer /> -->
</template>

<script setup lang="ts" name="layout">
import { useUserStore } from "@/stores/modules/user";
import { useRouter } from "vue-router"
// import { computed, type Component } from "vue";
//import { LayoutType } from "@/stores/interface";
//import { useGlobalStore } from "@/stores/modules/global";
// import ThemeDrawer from "./components/ThemeDrawer/index.vue";
//import LayoutVertical from "./LayoutVertical/index.vue";
 import LayoutClassic from "./LayoutClassic/index.vue";
// import LayoutTransverse from "./LayoutTransverse/index.vue";
// import LayoutColumns from "./LayoutColumns/index.vue";


const UserStore = useUserStore();
const router = useRouter();


// const LayoutComponents: Record<LayoutType, Component> = {
//   vertical: LayoutVertical,
//   classic: LayoutClassic,
//   transverse: LayoutTransverse,
//   columns: LayoutColumns
// };

// const globalStore = useGlobalStore();
//const layout = computed(() => globalStore.layout);
</script>


<style scoped lang="scss">
.layout {
  min-width: 600px;
}
</style>