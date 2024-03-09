<template>
  <div class="card">
    <div class="active-title">
      <span class="b-active-i"></span><span class="b-active-t">活动列表</span>
    </div>
    <div class="act-list">
      <ul>
        <li v-for="actInfo in actList" :key="actInfo.id">
          <a :href="actInfo.src" target="_blank"><img :src="actInfo.img" alt="" /></a>
          <h2>
            <a :href="actInfo.src" target="_blank">{{ actInfo.actTitle }}</a>
          </h2>
          <div class="event_status">
            <span :class="{ 'status-ing': actInfo.startDate && today <= actInfo.endDate }">
              {{
                today >= actInfo.startDate && today <= actInfo.endDate ? '【进行中】' : '【已结束】'
              }}
            </span>
            {{ actInfo.startDate }} 至 {{ actInfo.endDate }}
          </div>
          <div class="act-info" :title="actInfo.actDesc">{{ actInfo.actDesc }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="competition">
import { getActInfo } from '@/api/modules/home'
import type { Act } from '@/types/act'
import { ref, type Ref } from 'vue'
import { getDate } from '@/composables/util'
let actList: Ref<Act[]> = ref([])
getActInfo().then((res) => {
  if ('actList' in res) {
    actList.value = res.actList as Act[]
  }
})
const date = getDate()
const today = `${date.year}-${date.month}-${date.day}`
console.log(today)
</script>

<style lang="scss" scoped>
.active-title {
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e9ef;
  .b-active-i {
    width: 25px;
    height: 25px;
    background: url(//static.hdslb.com/images/base/icons.png) -82px -1624px no-repeat;
    display: inline-block;
    vertical-align: middle;
    border-radius: 0;
    margin-right: 10px;
  }
  .b-active-t {
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    line-height: 14px;
    color: #222;
  }
}
.act-list {
  overflow: hidden;
  li,
  ul {
    list-style: none;
  }
  ul {
    li {
      background: #fff;
      border-bottom: 1px solid #e5e9ef;
      padding: 0 0 20px;
      margin: 20px 0 0;
      overflow: hidden;
      position: relative;
      .act-info {
        color: #6d757a;
        height: 40px;
        line-height: 20px;
        margin-bottom: 14px;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /* 设置为flex box container*/
        -webkit-box-orient: vertical; /* 设置为vertical排列 */
        -webkit-line-clamp: 4; /* 截断至最多行 */
        overflow: hidden;
      }
      img {
        float: left;
        margin-right: 12px;
        width: 260px;
        height: 150px;
        border-radius: 4px;
      }
      h2 {
        overflow: hidden;
        margin: 0;
        line-height: 20px;
        padding-bottom: 20px;
        a {
          color: #222;
          text-decoration: none;
          font-size: 18px;
        }
        a:hover {
          color: skyblue;
        }
      }
      .event_status {
        overflow: hidden;
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 14px;
        color: #6d757a;
        .status-ing {
          color: #00a1d6;
        }
      }
    }
  }
}
</style>
