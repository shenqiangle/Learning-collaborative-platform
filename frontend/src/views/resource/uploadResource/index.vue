<template>
  <div class="card">
    <el-upload
      action="http://localhost:3000/your-upload-endpoint"
      :on-success="handleUploadSuccess"
    >
      <el-button>点击上传文件</el-button>
    </el-upload>
  </div>
</template>

<script setup lang="ts" name="uploadResource">
import { ref } from 'vue';


const handleUploadSuccess = (response: any) => {
  // 处理上传成功后的逻辑
  console.log(response)
}
</script>

