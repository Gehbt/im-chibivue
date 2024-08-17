<script setup lang="ts">
import AffVue from "./components/AffVue.vue";
import PlayVue from "./components/PlayVue.vue";
</script>

<template>
  <header>
    <div class="wrapper">origin-vue</div>
  </header>

  <main class="outline-2 outline-solid outline-blue-200">
    <div class="wujie-box hover:border-blue-500">
      <AffVue />
    </div>
    <hr />
    <div class="wujie-box hover:border-blue-500">
      <PlayVue />
    </div>
  </main>
</template>

<style scoped>
.wujie-box {
  --at-apply: h-[400px] w-full border-2 border-solid border-transparent;
}
</style>
