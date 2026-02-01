<script lang="ts">
import { IM_CHIBI_VUE_URL } from "../define";
</script>

<script setup lang="ts">
import WujieVue from "wujie-vue3";
defineOptions({
  inheritAttrs: true,
});
</script>

<template>
  <WujieVue name="playground" :url="IM_CHIBI_VUE_URL" class="h-[400px] w-full" />
  <!-- <iframe src="//localhost:12322/" class="h-[400px] w-full"></iframe> -->
</template>
