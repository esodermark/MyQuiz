document.addEventListener("DOMContentLoaded", function (e){
    document.getElementById("start").addEventListener("click", start);
    document.getElementById("next").addEventListener("click", nextQuestion);
    document.getElementById("previous").addEventListener("click", prevQuestion);
    document.getElementById("submit").addEventListener("click", submit);
    

    let json = getJSON('http://www.mocky.io/v2/5d95ddaa3300003a002f8d27');

    let index = 0;
    let numQuestions;
    let n = 0;
    let m = 0;


    class Question {
        constructor(question, answers, correctAnswer, img) {
            this.question = question;
            this.answers = answers;
            this.correctAnswer = correctAnswer;
            this.img = img;
        }

        newQuestions () {
            let newQuestion = {
                question: this.question,
                answers: this.answers,
                correctAnswer: this.correctAnswer,
                img: this.img
            }
    }
}

    let q = new Question("Vadå?", ["ja", "nej", "kanske"], ["0"]);
    q.newQuestions();

    class Quiz {
        constructor () {
            this.question = json;
            this.playerAnswer = [];
            this.name = "";
            console.log(this.question);
        }

        createDivContent(){
            let container = document.querySelector(".container");
            for(let i = 1; i <= numQuestions; i++){
                //create div
                let div = document.createElement("div");
                //create h1
                let h1 = document.createElement("h1");
                //create image
                let img = document.createElement("img");
                img.setAttribute("src", json[i-1].img);
                //create checkboxParent + div
                let checkboxParentDiv = document.createElement("div");
                //create 3 checkboxes + 3 labels
                this.labelAnswers = json[i-1].answers;
                for(let i = 1; i < 4; i++){
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = (i-1);
                    let label = document.createElement("label");
                    //create id + setAttribute
                    checkbox.id = "checkbox" + (i+n);
                    label.id = "label" + (i+n);
                    label.setAttribute("for", "checkbox" + (i+n));
                    label.innerHTML = this.labelAnswers[i-1];
                    //append chkbox + label to checkboxParent
                    checkboxParentDiv.appendChild(checkbox);
                    checkboxParentDiv.appendChild(label);
                }
                //create id
                div.id = "div" + i;
                h1.id = "h1" + i
                //create class
                div.className = "div";
                checkboxParentDiv.className = "checkboxParentDiv";
                img.className = "img";
                //create InnerHTML
                h1.innerHTML = json[i-1].question;
                
                //append to div
                div.appendChild(h1);
                div.appendChild(img);
                div.appendChild(checkboxParentDiv);
                //append to continer
                container.appendChild(div);
                 //increment n
                 n = n + 3;
            }
                
                
                console.log(container);
        }

        createScoreBoard() {
            for(let i = 1; i <= numQuestions; i++){
               let scoreboardImg = document.createElement("img");
               scoreboardImg.id = "imgScoreboard" + i;
               scoreboardImg.className = "scoreItem";
               scoreboardImg.src = "https://image.flaticon.com/icons/svg/2042/2042223.svg";
               document.querySelector(".score").appendChild(scoreboardImg);
            }
        }

        renderQuestions () {
            let list = document.getElementsByClassName("active");
            console.log(list);
            for (let element of list) {
              element.classList.remove("active");
            }
            if(index > numQuestions){
                document.getElementById("showScore").classList.add("active");
                document.getElementById("next").classList.remove("showButton");
                document.getElementById("previous").classList.remove("showButton");
                document.getElementById("submit").classList.remove("showButton");
    
            }else{
                document.getElementById("div" + index).classList.add("active");
                //show buttons at index1
                document.getElementById("next").classList.add("showButton");
                document.getElementById("previous").classList.add("showButton");
                document.getElementById("submit").classList.add("showButton");
            }



            
            } 

        /*playerAnswerArray () {
            for(let i = 1; i <= (numQuestions*3); i ++){
                let checkbox = document.getElementById("checkbox" + i);
                if(checkbox.checked){
                    console.log("hej");
                    this.playerAnswer.push(checkbox.value);
                    this.evaluatePlayerAnswer();
                }
            }
        }*/

        evaluatePlayerAnswer () {
            let k = JSON.parse(json[index-1].correctAnswer);
            console.log(k);
            
            this.playerAnswer = [];
            //Plussa på och loopa inte igenom alla
            for(let i = 1; i <= 3; i ++){
                let checkbox = document.getElementById("checkbox" + (i+m));
                if(checkbox.checked){
                    this.playerAnswer.push(checkbox.value);
                }
            }
            if(JSON.stringify(this.playerAnswer) == JSON.stringify(json[index-1].correctAnswer)){
                document.getElementById("imgScoreboard" + index).src = "https://image.flaticon.com/icons/svg/439/439842.svg"
                document.getElementById("label" + (m+k+1)).classList.add("correct");
                console.log("YAY");
            }else{
                document.getElementById("label" + (m+k+1)).classList.add("correct");
                console.log("NAY");
                document.getElementById("imgScoreboard" + index).src = "https://image.flaticon.com/icons/svg/2174/2174026.svg"
            }

            console.log(this.playerAnswer);
        }

        getPlayerName () {
            this.name = document.getElementById("name").value;
            document.getElementById("start").innerHTML = (`Let's get started ${this.name}! &rarr;`);
            numQuestions = document.getElementById("numQuestion").value;
        }

        
    }

    let question = new Quiz;

    question.question.push((new Question("Vadå?", ["ja", "nej", "kanske"], ["0"])));
    
    function start () {
        index = 1;
        question.createDivContent();
        question.renderQuestions();
        question.createScoreBoard();
        
 
    }

    function nextQuestion () {

        if(index > numQuestions){
            console.log("SLUT");
        }else{
            for (let i = 1; i < 4; i++){
                let checkbox = document.getElementById("checkbox" + (i+m))
                console.log(checkbox);
                if(checkbox.checked){
                    console.log("choose an answer");
                    index++;
                    question.renderQuestions();
                    m = m + 3;
                }else{
                    console.log("Svara!"); //skriv ut på sidan
                }
            }
        }


        
    }

    function prevQuestion () {
        index--
        question.renderQuestions();
    }

    function submit () {
        console.log("tjabba");
        question.evaluatePlayerAnswer();
        
    }

    document.getElementById("btnAdd").addEventListener("click", question.getPlayerName);

})



/*m = 0;
for(let i = 1; i <= numQuestions; i++){
    document.getElementById("h1" + i).innerHTML = this.question;
    for(let i = 1; i < 4; i++){
        document.getElementById("label" + (i+m)).innerHTML = this.answers[i-1];
    }
    m = m + 3;
}*/





