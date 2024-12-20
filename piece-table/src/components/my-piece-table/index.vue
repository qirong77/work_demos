<template>
    <div id="bar">
        <button @click.prevent="insert">addText</button>
        <button @click.prevent="remove">deleteText</button>
        <span>要插入的索引:<input v-model.number="start"></span>
        <span>要插入的字符串:<input v-model="newText"></span>
    </div>
    <main>
        <div>textAll: <span>{{ data.text }}</span></div>
        <div>originBuffer: <span>{{ data.originBuffer }}</span> </div>
        <div>addBuffer: <span>{{ data.addBuffer }}</span> </div>
        <div>_seq<span>{{ data._seq }}</span></div>
        <div>pieceTable:<br> <span>{{ data.pieceTable.map(o => JSON.stringify(o)).join('\n') }}</span> </div>
    </main>
</template> 

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Piece, PieceTable } from './PieceTable'
const data = ref({
    originBuffer: '',
    addBuffer: '',
    pieceTable: [] as Piece[],
    text: '',
    _seq : [] as number[]
})
const pieceTable = ref(new PieceTable('abc'))
const start = ref(0)
const newText = ref('')
const update = () => {
    data.value.originBuffer = pieceTable.value.originBuffer
    data.value.addBuffer = pieceTable.value.addBuffer
    data.value.pieceTable = pieceTable.value.piecesTable
    data.value.text = pieceTable.value.getSequence()
    data.value._seq = pieceTable.value._sequenceOffsetToPieceIndexAndBufferOffset
}
const insert = () => {
    pieceTable.value.insert(newText.value, start.value)
    update()
}
const remove = () => {
    pieceTable.value.delete(start.value, 1)
    update()
}
onMounted(update)
</script> 

<style  scoped>
main {
    text-align: left;
    width: 500px;
}

main span {
    color: red;
}

main * {
    letter-spacing: 2px;
}
#bar button{
    margin-right: 10px;
}
#bar span{
    margin-right: 20px;
}
</style> 
 