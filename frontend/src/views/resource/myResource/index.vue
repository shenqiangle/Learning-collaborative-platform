<template>
  <div class="card">
    <div class="search-header">
      <el-input v-model="search" class="search-input" placeholder="输入队名或文件名搜索"></el-input>
      <el-button>重置</el-button>
    </div>
    
    <el-table :data="showTableData" border style="width: 100%">
      <el-table-column prop="teamName" label="小组名" width="180" />
      <el-table-column prop="resourceData.name" label="文件名" width="180" />
      <el-table-column prop="resourceData.user.nickName" label="上传者" width="180" />
      <el-table-column prop="resourceData.fileDesc" label="文件描述" />
      <el-table-column prop="resourceData.src" label="">
        <template v-slot:default="scope">
          <el-button type="primary" 
          @click="handleDownload(scope.row.resourceData.src,
                                scope.row.resourceData.fileType)">
            下载文件</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="myResource">
import { useUserStore } from '@/stores/modules/user';
import type { Resource } from '@/types/resource'
import { computed, reactive, ref } from 'vue';
interface TableDataItem {
  teamID: string;
  teamName: string;
  resourceData: Resource;
}
const UserStore = useUserStore()
const search = ref('')


const handleDownload = (fileName: string,fileType: string) => {
  const fileUrl = `http://localhost:3000/${fileName}`;
  window.open(fileUrl);
}
const tableData: TableDataItem[] = reactive([]);
UserStore.userInfo.resources?.forEach((resource:any)=>{
  tableData.push({
    teamID: resource.team.id,
    teamName: resource.team.teamName,
    resourceData: resource,
  })
})

const showTableData = computed(() => {
  if (!search.value) {
    return tableData
  } else {
    // 根据搜索条件过滤数据
    return tableData.filter((item) => {
      // 根据你的搜索逻辑进行修改
      return item.teamName.includes(search.value) || (item.resourceData.name && item.resourceData.name.includes(search.value))
    })
  }
})


</script>

<style lang="scss" scoped>
  .search-header {
    display: flex;
    .search-input {
      width: 40vw;
      overflow-y: auto;
      margin-bottom: 20px;
      margin-right: 10px;
    }
  }
</style>