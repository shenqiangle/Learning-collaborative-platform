<template>
    <el-card  class="memberEdit">
        <span>{{ member.nickName }}</span>
        <el-button v-if="flag" @click="handleMember(false)" class="removeMember">移除该成员</el-button>
        <span v-else>
            <el-button @click="handleMember(true)" class="agreeMember">同意加入</el-button>
            <el-button @click="handleMember(false)" class="rejectMember">拒绝加入</el-button>
        </span>
  </el-card>
</template>

<script setup lang="ts" name="MemberCard">
import { editMembers } from '@/api/modules/team';
import { showMessage } from '@/composables/util';
const props = defineProps(['member','flag','id'])

const handleMember = async (accepted:boolean) => {
    await editMembers({
        
        memberUserName: props.member.userName,
        teamId: props.id,
        accepted: accepted

    }).then(()=>{
        showMessage('处理成功','success')
    }).catch(()=>{
        showMessage('处理失败','warning')
    })
}

</script>

<style lang="scss" scoped>
    .memberEdit {
        display: flex;
        span {
            margin-right: 15vw;
        }
        .removeMember {
            background-color: rgb(244, 230, 230);
            color: skyblue;
        }
        margin: 10px 0 10px 0;
    }
</style>