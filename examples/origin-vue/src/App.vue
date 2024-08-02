<script setup lang="ts">
import WujieVue from "wujie-vue3";
import AffVue from "./components/AffVue.vue";
import PlayVue from "./components/PlayVue.vue";
</script>

<template>
  <header>
    <div class="wrapper">origin-vue</div>
  </header>

  <main class="border-2 border-solid border-blue-300">
    <div class="h-[400px] w-full">
      <AffVue />
    </div>
    <hr>
    <div class="h-[400px] w-full">
      <PlayVue />
    </div>
  </main>
</template>
