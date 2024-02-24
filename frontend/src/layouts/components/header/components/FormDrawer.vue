<template>
    <el-drawer v-model="showDrawer" title="个人信息" size="45%"
    :close-on-click-modal="false">
        <div>

        </div>
    </el-drawer>
</template>

<script setup lang="ts" name="FormDrawer">
    import { ref } from 'vue';


    const showDrawer = ref(false);
    const open = ()=>showDrawer.value = true;
    const close = ()=>showDrawer.value = false;


    defineExpose({
        open,
        close
    })
</script>