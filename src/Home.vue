<template>
    <header></header>
    <main>
        <div class="homeDiv"> Welcome home! </div>
    </main>
</template>

<style scoped>
header {
    line-height: 1.5;
}

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
}

body {
    display: flex;
    flex-direction: column;
    background-color: rgb(202, 60, 60);
}

main {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #6e6e6e;
    min-height: 100%;
    min-width: 100%;
    overflow: auto;
    flex-grow: 1;
    position: absolute;
    left: 0;
}

.darker {
    background-color: aqua;
}

.homeDiv {
    color: aliceblue;
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%)
}
</style>