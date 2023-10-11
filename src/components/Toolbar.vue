<script>
export default {
    methods: {
    },
};
</script>
<template>
    <div class="toolbar">
        <div class="toolbar-title">SynthA!</div>
        <div class="toolbar-actions">
            <!-- Add toolbar actions/buttons here -->
            <!-- insert 5 buttons -->
            <button @click="playMainFunction">Home</button>

        </div>
        <div class="version">DEMO v0.1</div>
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

.toolbar-title {
    font-size: 24px;
}

.toolbar-actions {
    display: flex;
    gap: 10px;
}
</style>