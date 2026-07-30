<template>
  <div class="online-playlists">
    <CoverList
      v-if="playlistCount > 0"
      :data="playlistData"
      :loading="loading"
      :loadMore="hasMore"
      type="playlist"
      :hiddenCover="settingStore.hiddenCovers.playlist"
    />
  </div>
</template>
<script setup lang="ts">
import type { CoverType } from "@/types/main";
import { useDataStore, useSettingStore } from "@/stores";
import { isLogin } from "@/utils/auth";

const dataStore = useDataStore();
const settingStore = useSettingStore();

// 歌单数据
const hasMore = ref<boolean>(false);
const loading = ref<boolean>(true);
const playlistCount = ref<number>(1);
const playlistData = ref<CoverType[]>([]);

// 获取歌单数据
const getAllCatlistPlaylist = async () => {
  // 获取数据
  loading.value = true;
  playlistData.value = createPlaylist.value;
  loading.value = false;
};

// 生成歌单列表
const renderPlaylist = (playlist: CoverType[]) => {
  if (!isLogin()) return [];
  return playlist;
};

// 创建的歌单
const createPlaylist = computed(() => {
  const userId = dataStore.userData.userId;
  const list = dataStore.userLikeData.playlists
    .filter((playlist) => playlist?.userId === userId)
    .slice(1);
  return renderPlaylist(list);
});

// 参数变化
onBeforeRouteUpdate((to) => {
  if (to.name !== "online-playlists") return;
  playlistData.value = [];
  // 获取歌单
  getAllCatlistPlaylist();
});

onMounted(() => {
  // 获取歌单
  getAllCatlistPlaylist();
});
</script>
