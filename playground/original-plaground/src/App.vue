<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({ count: 0 });

const increment = () => {
  state.count++;
};
</script>

<template>
  <div id="my-app">
    <p style="color: red">count: {{ state.count }}</p>
    <button @click="increment">increment</button>
  </div>
</template>
