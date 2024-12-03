<script setup lang="ts">
import { computed, getCurrentScope } from "vue";
import { AffVue, PlayVue } from "./components";

const count = () => 1;
const scope = getCurrentScope();

const items = Array.from<number>({ length: count() }).fill(Math.random() * 2);
</script>

<template>
  <header>
    <div class="wrapper">origin-vue</div>
  </header>

  <main class="outline-2 outline-solid outline-blue-200">
    <div class="wujie-box hover:border-blue-500">
      <AffVue />
      <!-- ^? -->
    </div>
    <hr />
    <div class="wujie-box hover:border-blue-500">
      <PlayVue />
    </div>
  </main>
  <div v-for="(item, index) in items" :key="`${count()}${index}`">
    <template v-if="item > 1">
      <div>({{ index }}) lg 1</div>
    </template>
    <template v-else>
      <div>({{ index }}) lt 1</div>
    </template>
  </div>
</template>

<style scoped>
.wujie-box {
  --at-apply: h-[400px] w-full border-2 border-solid border-transparent;
}
</style>
