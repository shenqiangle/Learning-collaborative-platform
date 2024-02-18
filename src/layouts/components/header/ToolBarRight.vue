<template>
    <div class="tool-bar-ri">
        <div class="header-icon">
          
            <SearchMenu id="searchMenu" />
          
            <Message id="message" />
          
            <Fullscreen id="fullscreen" /> 
        </div>
    <span class="username">{{ UserStore.userInfo.nickName }}</span>
    <Avatar />
  </div>

</template>

<script setup lang="ts" name="ToolBarRight">

import SearchMenu from "./components/SearchMenu.vue";
import Message from "./components/Message.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Avatar from "./components/Avatar.vue";
import { useUserStore } from "@/stores/modules/user";


const UserStore = useUserStore();
</script>


<style scoped lang="scss">

.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
      color: #303133;
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
    color: #303133;
  }
}
</style>