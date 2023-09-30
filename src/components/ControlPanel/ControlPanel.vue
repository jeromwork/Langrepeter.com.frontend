<template>
    <div class="semi-transparent-strip">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ControlPanel"
    }
</script>

<style scoped>
    .semi-transparent-strip {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 75px;
        /* From https://css.glass */
        background: rgba(0, 16, 57, 0.2);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
    }
</style>