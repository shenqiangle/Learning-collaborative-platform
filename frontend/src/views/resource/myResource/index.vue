<template>
  <div class="card">
 

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="fileName" width="180" />
      <el-table-column prop="userName" label="uploader" width="180" />
      <el-table-column prop="fileDesc" label="fileDescription" />
      <el-table-column prop="src" label="src">
        <template v-slot:default="scope">
          <el-button type="primary" @click="handleDownload(scope.row.src)">下载文件</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="myResource">
import { useUserStore } from '@/stores/modules/user';
import type { Resource } from '@/types/global.d.ts'
import { reactive } from 'vue';
const UserStore = useUserStore()

const handleDownload = (fileName: string) => {
  const fileUrl = `http://localhost:3000/${fileName}`
  window.open(fileUrl)
}

const tableData = reactive<Resource[]>([])
UserStore.userInfo.resourceList?.forEach((resource) => {
  tableData.push(resource)
})


</script>
