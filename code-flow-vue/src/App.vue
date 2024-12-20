<template>
  <header>
    <button @mousedown.prevent="log(EditorSelection.endAt(editor as Editor, 0))">
      endAt
    </button>
    <button @mousedown.prevent="log(EditorSelection.nextChar(editor as Editor))">
      nextChar
    </button>
    <button @mousedown.prevent="log(EditorSelection.preChar(editor as Editor))">
      preChar
    </button>
    <button @mousedown.prevent="selPreChar">
      selPreChar
    </button>
    <button @mousedown.prevent="setSel">
      setSel
    </button>
  </header>
  <main ref="container">
  </main>
  <pre>
    <div>{{ JSON.stringify(state.selection)?.split(",").join('\n') }}</div>
    <div>{{ JSON.stringify(state.scrollInfo)?.split(",").join('\n') }}</div>
  </pre>
  <pre style="width: 500px; text-align: left; overflow: scroll;">{{
    state.viewLines
      .map((line: any, index: any) => index + "-:" + line.text)
      .join("\n")
  }}</pre>
  <pre style="width: 500px; text-align: left; overflow: scroll;">{{
    state.editorLines
      .map((line: any, index: any) => index + "-:" + line.text)
      .join("\n")
  }}</pre>
  <teleport to="#view-lines">
    <editor-line v-for="line in state.viewLines" style="height: 20px" :editor-line="line"></editor-line>
  </teleport>
  <teleport to="#gutter">
    <div v-for="(_l, i) in state.viewLines" style="height: 20px">{{ i + state.scrollInfo.startLine }}</div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import EditorLine from "./component/EditorLine.vue";
import { Editor } from "./editor";
import { EditorSelection } from "./editor/EditorSelection";
const state = ref();
const container = document.createElement('div')
const text = `
class PieceTable {
  original: string;
  added: string;
  nodes: Node[];
}
`
const editor = ref(new Editor({
  onUpdate: (editor: Editor) => {
    state.value = editor.state
  },
  doc:text,
  language:'javascript'
}))
state.value = editor.value.state;
const log = (info: any) => { console.log(info) }
const selPreChar = () => {
  editor.value.applyChange({
    selection: EditorSelection.preChar(editor.value as Editor)
  })
}
console.log(editor.value.state.viewLines)
const setSel = () => {
  editor.value.applyChange({
    selection: {
      startLine: 0,
      endLine: 2,
      startOffset: 1,
      endOffset: 4
    }
  })
}
onMounted(() => {
  document.querySelector('main')?.appendChild(container)
})
</script>

<style>
#app {
  padding-left: 200px;
  display: flex;
  width: 100vw;
  justify-content: start;
  margin: 0;
  padding-top: 100px;
}

header {
  position: fixed;
  top: 50px;
}

header button {
  margin-left: 20px;
}

pre {
  margin: 0 30px;
  border: 1px solid grey;
  width: 500px;
  height: 300px;
  border-radius: 4px;
}
</style>
