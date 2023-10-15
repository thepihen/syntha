<script>
export default {
    methods: {
    },
};
</script>
<template>
    <div class="toolbar">
        <div class="toolbar-title">SynthA!</div>
        <router-link to="/">Home</router-link>
        <!--
        <div class="toolbar-actions">
            <button @click="playMainFunction">Home</button>
            <router-link to="/">Back</router-link>
        </div>
        -->
        <div class="version">DEMO v0.2</div>
    </div>
</template>

<style scoped>
.toolbar {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    /* position the toolber at the top of the screen */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
}
.toolbar a {
    height: 100%;
    float: left;
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 0px 16px;
    text-decoration: none;
}

.toolbar a:hover {
    background-color: blueviolet;
}
.toolbar-title {
    font-size: 24px;
}

.toolbar-actions {
    display: flex;
    gap: 10px;
}
</style>