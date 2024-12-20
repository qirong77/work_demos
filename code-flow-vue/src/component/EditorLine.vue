<template>
  <div>
    <span v-for="token in lineTokens" :class="token.types" v-html="token.content">
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IEditorLine } from "../types";
const props = defineProps<{
  editorLine: IEditorLine;
}>();
const lineTokens = computed(() => {
  return [{
    content: props.editorLine.text.length ? props.editorLine.text.replaceAll(/\s/g, '&nbsp;') : '<span><br></span>',
    types: ['plains']
  }]
});
</script>

<style lang="scss" scoped></style>
