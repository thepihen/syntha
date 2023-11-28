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
            <router-link to="/">Home</router-link>
            <button class="toolbarButton"> Save </button>
            <button class="toolbarButton"> Load </button>
        </div>
        
        <div class="version">DEMO v0.5</div>
    </div>
</template>

<style scoped>
.toolbarOld {
    user-select: none;
    background-color: #333;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    /* position the toolber at the top of the screen */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2000;
    border: 1px solid rgb(0, 0, 0);
}
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
    line-height: 1.5;
    z-index: 2000;
    overflow: hidden;
    border: 1px solid rgb(0, 0, 0);
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
    /* align left */
    flex: 1;
    text-align: left;
    margin-left: 10px;
    margin-right: 10px;
}

.toolbar-actions {
    /*
    display: flex;
    gap: 10px;
    */
    position: relative;
        display: flex;
        flex-direction: row;
        height: 100%;
        flex: 15;
        text-align: left;
        margin-left: 10px;
        margin-right: 10px;
}
.toolbarButton{
    background-color: #333;
    color: white;
    border: 0px solid transparent;
    padding: 0px 16px;
    font-family: 'Times New Roman', Times, serif;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
    text-align: center;
    user-select: none;
}

.toolbarButton:hover {
    background-color: blueviolet;
}
</style>