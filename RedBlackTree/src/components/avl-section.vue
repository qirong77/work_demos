<template>
    <section>
        <header>
            <button @click="insertNode(0)">插入-insert</button>
            <button @click="deleteNode">删除-delete</button>
            <button @click="logTree">打印-logTree</button>
            <button @click="loadTest">load many test(open console to get the detail)</button>
            <input v-model.number="nextValue" placeholder="节点值" />
        </header>
        <pre>
          <div v-for="list in tree">
             <span v-for="i in list">{{ i?.value }}</span>
          </div>
      </pre>
    </section>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { BSTNode } from "../BST/BSTNode";
import { toTree } from "../utils/toTree";
import { checkBSTBalance } from "../utils/checkBalance";
import { deleteBSTNode } from "../BST/deleteBSTNode";
import { insertAVLNode } from "../AVL/insertAVLNode";
import { AVLNode } from "../AVL/AVLNode";
import { getLeftToRightWeight } from "../utils/getLeftToRightHeight";
const nextValue = ref(0);
let bstNode = new BSTNode(0);
const tree = ref(toTree(bstNode));
const insertNode = (x = 0) => {
    const newRoot = insertAVLNode(bstNode, x || nextValue.value);
    bstNode = newRoot
    updateTree();
    checkBSTBalance(bstNode);
};
const deleteNode = () => {
    deleteBSTNode(bstNode, nextValue.value);
    updateTree();
    checkBSTBalance(bstNode);
};
const arr = [9, 8, 7, 6, 5]
arr.forEach(num => {
    insertNode(num)
})
const logTree = () => {
    console.log(bstNode);
};
function updateTree() {
    tree.value = toTree(bstNode);
}
function loadTest() {
    for (let i = 0; i < 1024; i++) {
        let arr = new Array(Math.floor(Math.random() * 100)).fill(0)
        arr = arr.map(_0 => Math.random())
        let root = new AVLNode(Math.random())
        console.log(arr)
        arr.forEach(n => {
            root = insertAVLNode(root, n)
            checkBSTBalance(root)
            checkHeight(root)
        })
    }
    function checkHeight(node: AVLNode) {
        if (Math.abs(getLeftToRightWeight(node)) > 1) {
            throw new Error('avl高度出错!')
        }
    }
}
</script>
  
<style scoped></style>
  