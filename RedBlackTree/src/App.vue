<template>
  <main>
    <bst-section />
    <avl-section />
    <rbt-section />
  </main>
</template> 

<script setup lang="ts">
import bstSection from './components/bst-section.vue';
import avlSection from './components/avl-section.vue';
import rbtSection from './components/rbt-section.vue';
</script> 

<style>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

main section {
  flex: 1;
  height: 100vh;
  border-bottom: 1px solid gray;
}

section header {
  display: flex;
  justify-content: center;
  align-items: center;
}

header button {
  margin-right: 20px;
}

pre {
  width: 100vw;
  margin: 0 auto;
}

pre div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  margin: 10px 0;
}

pre div:nth-child(odd) {
  background-color: whitesmoke;
}

pre div:nth-child(even) {
  background-color: lightgray
}

pre div span {
  flex: 1;
  text-align: center;
  margin: 0 2px;
}
</style> 
 