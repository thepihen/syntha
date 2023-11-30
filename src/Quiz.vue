<script>
import { store } from './store.js'
export default {
    data() {
        return {
            currQuestionNo: 0,
            totalPoints: 0,
            showResults: false,
            result:'',
            results: {
                "0": "You are a Oscillator!",
                "1": "You are a Theremin!",
                "2": "You are a Filter!",
                "3": "You are a Reverb!",
            },
            questions: {
                "0": {
                    "question": "Are you feeling wavy today?",
                    "answers": {
                        "0": "Yes",
                        "1": "No",
                        "2": "Maybe",
                        "3": "~( ˘▾˘~)"
                    }
                },
                "1":{
                    "question": "Feeling electromagnetic maybe?",
                    "answers": {
                        "0": "Yes!",
                        "1": "Absolutely!",
                        "2": "Nope",
                        "3": "( ͡°⁄ ⁄ ͜⁄ ⁄ʖ⁄ ⁄ ͡°) "
                    }
                },
                "2":{
                    "question": "Do you like to build dams?",
                    "answers": {
                        "0": "What is a dam?",
                        "1": "No I hate dams",
                        "2": "<Free answer>",
                        "3": "I'm a beaver ¯\_(ツ)_/¯",
                    }
                },
                "3":{
                    "question": "Question?",
                    "answers": {
                        "0": "Yes",
                        "1": "Question?",
                        "2": "So me",
                        "3": "Nope",
                    }
                },
            },
        }
    },
    methods: {
        nextQuestion(index){
            this.totalPoints += 10*index;
            if(this.currQuestionNo < Object.keys(this.questions).length-1){
            this.currQuestionNo += 1;
            }else{
                console.log(this.totalPoints)
                this.result = this.results[Math.floor(this.totalPoints / 40).toString()];
                this.showResults=true;
            }
        }
    },
    created() {
        if (localStorage.getItem('loggedIn') == 'true') {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
    },
    
}
</script>
<template>
    <div class="centralDivQuiz">
            <div class="centralDiv">
                <h1 v-if="showResults" style="position: absolute; left:50%; top:30%; color:aliceblue;">{{result}}</h1>
                <h1 v-if="(showResults==false)">{{questions[currQuestionNo].question}}</h1>
                <div class="centralDiv" v-if="(showResults==false)">
                    <button v-for="(answer, index) in questions[currQuestionNo].answers" :key="index" @click="nextQuestion(index)">{{answer}}</button>
                </div>
            </div>
    </div>
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
}

main {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #7e12d1;
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

.centralDivQuiz {
    background-color: rgb(17, 97, 167);
    position: absolute;
    left: 0%;
    top: 0%;
    width:100%;
    height:100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

}
</style>