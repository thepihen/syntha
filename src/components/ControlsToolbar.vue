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
            <button class="controlButton" @click="playMainFunction">Play</button>
            <button class="controlButton" @click="">Stop</button>

        </div>
    </div>
</template>

<style scoped>
.control_toolbar {
    user-select: none;
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
    height: 2rem;
}
.control_toolbar a {
    float: left;
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 0px 16px;
    text-decoration: none;
}

.control_toolbar a:hover {
    background-color: blueviolet;
}
.controlButton{
    background-color: blueviolet;
        /* Blue background */
        border: none;
        /* Remove borders */
        color: white;
        /* White text */
        padding: 12px 16px;
        /* Some padding */
        font-size: 16px;
        /* Set a font size */
        cursor: pointer;
        /* Mouse pointer on hover */
}
.controlButton:hover {
    background-color: rgb(147, 64, 224);
    /* Blue background */
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