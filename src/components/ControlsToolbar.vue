<script>
export default {
    methods: {
        playMainFunction() {
            this.$emit('play-main-function');
        },
    },
};
</script>
<template>
    <div class="control_toolbar">
        <div class="toolbar-actions">
            <!-- Add toolbar actions/buttons here -->
            <!-- insert 5 buttons -->
            <button @click="playMainFunction">Play</button>
            <button @click="">Stop</button>

        </div>
    </div>
</template>

<style scoped>
.control_toolbar {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    /*make this thick*/
    height: 50px;
    /* position the toolber at the top of the screen */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
}

.toolbar-title {
    font-size: 24px;
}

.toolbar-actions {
    /* center this*/
    margin: 0 auto;
    
    display: flex;
    gap: 10px;
}
</style>