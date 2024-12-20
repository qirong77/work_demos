<template>
  <section>
    <header>
      <button @click="insertNode">插入-insert</button>
      <button @click="deleteNode">删除-delete</button>
      <button @click="logTree">打印-logTree</button>
      <input v-model.number="nextValue" placeholder="节点值" />
    </header>
    <pre>
        <div v-for="list in tree" :style="{
        }">
           <span v-for="i in list">{{ i?.value }}</span>
        </div>
    </pre>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BSTNode } from "../BST/BSTNode";
import { insertBSTNode } from "../BST/insertBSTNode";
import { toTree } from "../utils/toTree";
import { checkBSTBalance } from "../utils/checkBalance";
import { deleteBSTNode } from "../BST/deleteBSTNode";
const nextValue = ref(0);
const bstNode = ref<BSTNode>(new BSTNode(0));
const tree = ref(toTree(bstNode.value));
const insertNode = () => {
  insertBSTNode(bstNode.value, nextValue.value, undefined);
  updateTree();
  checkBSTBalance(bstNode.value);
};
const deleteNode = () => {
  deleteBSTNode(bstNode.value, nextValue.value);
  updateTree();
  checkBSTBalance(bstNode.value);
};
const logTree = () => {
  console.log(bstNode.value);
};
function updateTree() {
  tree.value = toTree(bstNode.value);
}
</script>

<style scoped></style>
