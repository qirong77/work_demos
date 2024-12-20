<template>
    <section>
        <header>
            <button @click="insertNode">插入-insert</button>
            <!-- <button @click="deleteNode">删除-delete</button> -->
            <button @click="logTree">打印-logTree</button>
            <input v-model.number="nextValue" placeholder="节点值" />
            <button @click="logHeight">check black height</button>
            <button @click="loadRBTTest">load test</button>
            <button @click="loadManyTest">loadManyTest</button>
        </header>
        <pre>
          <div v-for="list in (tree as any)">
             <span v-for="i in list"
             :style="{
                 backgroundColor: i?.color === 'red' ? 'red' : 'black',
                 color: 'white'
             }"
             ><span v-if="i?.color">{{ i?.value ?? 'nilNode' }}</span></span>
          </div>
      </pre>
    </section>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { toTree } from "../utils/toTree";
import { insertRBTNode } from "../RBT/insertRBTNode";
import { checkRBTPath } from '../RBT/checkIsRBT'
import { checkRBTNode } from '../RBT/checkIsRBT'
const nextValue = ref(0);
let rbtNode = insertRBTNode(undefined, 0)
const tree = ref(toTree(rbtNode));
const insertNode = () => {
    rbtNode = insertRBTNode(rbtNode, nextValue.value)
    updateTree();
};
const init = () => {
    const arr = [79,98,44,50,79]
    arr.forEach(num => {
        rbtNode = insertRBTNode(rbtNode, num)
    })
    updateTree()
}
const logTree = () => {
    console.log(rbtNode);
};
const logHeight = () => {
    checkRBTPath(rbtNode)
}
function updateTree() {
    tree.value = toTree(rbtNode);
}
function loadRBTTest() {
    rbtNode = null as any
    let nums = new Array(10).fill(0).map(() => Math.ceil(Math.random() * 100))
    nums = [...new Set(nums)]
    nums.forEach(n => {
        rbtNode = insertRBTNode(rbtNode, n)
    })
    console.log(nums)
    try {
        updateTree()
        checkRBTNode(rbtNode)
    } catch {
        console.log(nums)
    };
}
function loadManyTest() {
    for(let i =0;i<1024;i++) {
        loadRBTTest()
    }
}
</script>
  
<style scoped></style>
  