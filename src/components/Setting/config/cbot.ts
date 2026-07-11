import { SettingConfig } from "@/types/settings";
import { useSettingStore, useStatusStore } from "@/stores";
import { computed } from "vue";

export const useCBotSettings = (): SettingConfig => {
  const settingStore = useSettingStore();

  return {
    groups: [
      {
        title: "CBout联动",
        items: [
          {
            key: "cbotOpen",
            label: "开启CBot联动",
            type: "switch",
            description: "需要在8000端口启动CBot服务",
            value: computed({
              get: () => settingStore.cbot,
              set: (v) => (settingStore.cbot = v),
            }),
          },
          {
            key: "cbotIP",
            label: "IP 地址",
            type: "text-input",
            description: "可在此处输入CBot IP",
            disabled: computed(() => !settingStore.cbot),
            prefix: "IP",
            componentProps: { placeholder: "127.0.0.1" },
            value: computed({
              get: () => settingStore.cbotIp,
              set: (v) => (settingStore.cbotIp = v),
            }),
          },
          {
            key: "cbotIP",
            label: "推送群号",
            type: "text-input",
            description: "可在此处输入CBot推送消息的群号(暂不支持指定朋友)",
            disabled: computed(() => !settingStore.cbot),
            prefix: "群号",
            componentProps: { placeholder: "0" },
            value: computed({
              get: () => settingStore.cbotQroupId,
              set: (v) => (settingStore.cbotQroupId = v),
            }),
          },
        ],
      },
    ],
  };
};
