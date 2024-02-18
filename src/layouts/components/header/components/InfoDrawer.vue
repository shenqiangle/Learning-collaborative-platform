<template>
    <el-drawer v-model="showDrawer" :title="title" :size="size" :destroy-on-close="destroyOnClose"
    :close-on-click-modal="false">
        <div class="formDrawer">
          <div class="body">
            <slot></slot>
          </div>
          <div class="actions">
            <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
            <el-button type="default" @click="showDrawer=false">取消</el-button>

          </div>
        </div>
    </el-drawer>
</template>
  
  <script setup lang="ts" name="InfoDrawer">
  import { ref } from "vue";
  
  const loading = ref(false);
  const showDrawer = ref(false);
  const openDrawer = () => {
    showDrawer.value = true;
  };
  const closeDrawer = () => {
    showDrawer.value = false;
  };
  const showLoading = () => {
    loading.value = true;
  }
  const hideLoading = () => {
    loading.value = false;

  }

  defineProps({
    title: String,
    size:{
      type: String,
      default: "45%"
    },
    destroyOnClose:{
      type: Boolean,
      default: false
    },
    confirmText:{
      type: String,
      default: "提交"
    }
  })
  
  //提交
  const emit = defineEmits(["submit"]);
  const submit = ()=> emit("submit");

  defineExpose({ 
    openDrawer,
    closeDrawer,
    showLoading,
    hideLoading
   });
  </script>

  <style lang="scss" scoped>
.el-drawer__wrapper {
  height: 100vh; /* or other value based on your needs */
}

.formDrawer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.body {
  
  height: calc(100% - 50px); /* 50px is the height of actions */
  overflow-y: auto;
}

.actions {
  height: 50px;
  display: flex;
  align-items: center;
}
  </style>
  