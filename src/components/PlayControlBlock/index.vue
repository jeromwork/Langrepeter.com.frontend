<template>
    <div class="audio-controls">
        <Button icon="pi pi-play" class="p-button-rounded p-button-help p-button-text" />

        <div class="p-grid">
            <div class="p-col-12 p-md-6 p-lg-4">Box 1</div>
            <div class="p-col-12 p-md-6 p-lg-4">Box 2</div>

        </div>

        <div class="audio-duration">{{ 100 }}</div>
    </div>
</template>

<script>
    //import usePlayControl from './usePlayControl';
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'PlayControlBlock'
    })
</script>

<style scoped>

</style>