<template>
  <div class="playlists">
    <div class="title">
      <n-text class="keyword">我的歌单</n-text>
      <n-button
        type="primary"
        strong
        quaternary
        circle
        @click="openCreatePlaylist(statusStore.playlistMode === 'local')"
      >
        <template #icon>
          <Transition name="fade" mode="out-in">
            <SvgIcon key="Add" name="Add" :size="28" />
          </Transition>
        </template>
      </n-button>
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
import { useSettingStore, useStatusStore } from "@/stores";
import { openCreatePlaylist } from "@/utils/modal";
const router = useRouter();
const settingStore = useSettingStore();
const statusStore = useStatusStore();

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
      flex: 1;
      font-size: 30px;
      font-weight: bold;
      margin-right: 12px;
      line-height: normal;
    }
  }
}
</style>
