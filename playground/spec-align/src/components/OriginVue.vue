<script lang="ts">
import { ORIGIN_VUE_URL } from "../define";
</script>

<script setup lang="ts">
import WujieVue from "wujie-vue3";
defineOptions({
  inheritAttrs: true,
});
</script>

<template>
  <WujieVue name="origin-playground" :url="ORIGIN_VUE_URL" class="h-[400px] w-full" />
</template>
