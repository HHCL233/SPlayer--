<template>
  <div class="playlists">
    <div class="title">
      <n-text class="keyword">我的歌单</n-text>
    </div>
    <!-- 标签页 -->
    <n-tabs
      v-model:value="playlistsType"
      class="tabs"
      type="segment"
      @update:value="(name: string) => router.push({ name })"
    >
      <n-tab name="online-playlists"> 在线歌单 </n-tab>
    </n-tabs>
    <!-- 路由 -->
    <RouterView v-slot="{ Component }">
      <Transition :name="`router-${settingStore.routeAnimation}`" mode="out-in">
        <KeepAlive v-if="settingStore.useKeepAlive">
          <component :is="Component" class="router-view" />
        </KeepAlive>
        <component v-else :is="Component" class="router-view" />
      </Transition>
    </RouterView>
  </div>
</template>
<script setup lang="ts">
import { useSettingStore } from "@/stores";
const router = useRouter();
const settingStore = useSettingStore();

// 歌单路由
const playlistsType = ref<string>(
  (router.currentRoute.value?.name as string) || "online-playlists",
);
</script>
<style lang="scss" scoped>
.playlists {
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: flex-end;
    line-height: normal;
    margin-top: 12px;
    margin-bottom: 20px;
    height: 40px;
    .keyword {
      font-size: 30px;
      font-weight: bold;
      margin-right: 12px;
      line-height: normal;
    }
  }
}
</style>
