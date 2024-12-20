<template>
  <pre style="left: 100px">
    <div>{{ selection.split(",").join('\n') }}</div>
  </pre>
  <pre style="right: 100px; height: 400px; overflow: scroll">
    <div>{{ codeLines }}</div>
  </pre>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  codeline: {
    default: [{ text: "error" }],
  },
  selection: {
    default: "error",
  },
});
const codeLines = computed(() =>
  props.codeline.map((line, index) => index + "-:" + line.text).join("\n")
);
</script>
<style>
pre {
  position: fixed;
  top: 100px;
  width: 200px;

  font-size: large;
}
pre div {
  text-align: left;
}
</style>
