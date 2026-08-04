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

// 创建的歌单
const createPlaylist = computed(() => dataStore.userLikeData.playlists);

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
