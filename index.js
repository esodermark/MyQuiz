document.addEventListener("DOMContentLoaded", function (e){
    document.getElementById("start").addEventListener("click", start);  //eventlisteners for buttons
    document.getElementById("next").addEventListener("click", nextQuestion);
    document.getElementById("previous").addEventListener("click", prevQuestion);
    document.getElementById("submit").addEventListener("click", submit);
    

    let json = getJSON('http://www.mocky.io/v2/5d9a129e310000820097da4b');

    let index = 0;
    let numQuestions;
    let n = 0;  //counter
    let m = 0;  //counter


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


    class Quiz {
        constructor () {
            this.question = json;
            this.playerAnswer = [];
            this.name = "";
            this.numCorrectAnswers = [];
            console.log(this.question);
        }

        createDivContent(){ //creates divs to questions dependant on the number of questions the player has chosen
            let container = document.querySelector(".container");
            for(let i = 1; i <= numQuestions; i++){
                //create div
                let div = document.createElement("div");
                //create h1
                let h1 = document.createElement("h1");
                //create image
                let img = document.createElement("img");
                img.setAttribute("src", this.question[i-1].img);
                //create checkboxParent + div
                let checkboxParentDiv = document.createElement("div");
                //create 3 checkboxes + 3 labels
                this.labelAnswers = this.question[i-1].answers;
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
                h1.innerHTML = this.question[i-1].question;
                //append to div
                div.appendChild(h1);
                div.appendChild(img);
                div.appendChild(checkboxParentDiv);
                //append to continer
                container.appendChild(div);
                 //increment n
                 n = n + 3; //increments n, creating 3 boxes in sets of numQuestions
            }
                
                
                console.log(container);
        }

        createScoreBoard() {  //creates clouds in scoreboard dependant on numQuestions
            for(let i = 1; i <= numQuestions; i++){
               let scoreboardImg = document.createElement("img");
               scoreboardImg.id = "imgScoreboard" + i;
               scoreboardImg.className = "scoreItem";
               scoreboardImg.src = "https://image.flaticon.com/icons/svg/2042/2042223.svg";
               document.querySelector(".score").appendChild(scoreboardImg);
            }
        }

        render () { //renders div of index by removing and adding class active, also renders buttons dependant on index
            let list = document.getElementsByClassName("active");
            for (let element of list) {
              element.classList.remove("active");
            }
            if(index > numQuestions){
                document.getElementById("showScore").classList.add("active");
                document.getElementById("next").classList.remove("showButton");
                document.getElementById("previous").classList.remove("showButton");
                document.getElementById("submit").classList.remove("showButton");
                this.showNumCorrectAnswers();
            }
            else{
                if(index == 1){
                    document.getElementById("previous").classList.remove("showButton");
                }else{
                    document.getElementById("previous").classList.add("showButton");
                }
                document.getElementById("div" + index).classList.add("active");
                document.getElementById("next").classList.add("showButton");
                document.getElementById("submit").classList.add("showButton");
            }



            
            } 

        evaluatePlayerAnswer () { //compares player array to correctAnswer array
            
            this.playerAnswer = []; //empties array
            let k = parseInt(this.question[index-1].correctAnswer[0]); //get value of correct answer
            let j = parseInt(this.question[index-1].correctAnswer[1]); 

            if(this.question[index-1].correctAnswer.length == 2){ //if two answers are correct
                for(let i = 1; i <= 3; i ++){
                    let checkbox = document.getElementById("checkbox" + (i+m)); //loop through to check value of checked checkbox
                    if(checkbox.checked){
                        this.playerAnswer.push(checkbox.value); //playerAnswer array gets the value of checked checkbox 
                    }
                }
                if(JSON.stringify(this.playerAnswer) == JSON.stringify(this.question[index-1].correctAnswer)){
                    document.getElementById("imgScoreboard" + index).src = "https://image.flaticon.com/icons/svg/439/439842.svg" //changes scoreboard icon to sun
                    document.getElementById("label" + (m+k+1)).classList.add("correct"); //the value of playerAnswer and m (series of 3 to get checkboxes of current index)is added in order to locate correct label id
                    document.getElementById("label" + (m+j+1)).classList.add("correct"); //class is then added which bolds and colors the  correct answer

                    this.numCorrectAnswers.push(this.playerAnswer); //adds correct answer to numCorrectAnswers array
                }else{
                    document.getElementById("imgScoreboard" + index).src = "https://image.flaticon.com/icons/svg/2174/2174026.svg" //changes scoreboard icon to rain cloud
                    document.getElementById("label" + (m+k+1)).classList.add("correct");
                    document.getElementById("label" + (m+j+1)).classList.add("correct");
                }
            }else{
                let k = JSON.parse(this.question[index-1].correctAnswer); //if 1 answer is correct

                for(let i = 1; i <= 3; i ++){
                    let checkbox = document.getElementById("checkbox" + (i+m));
                    if(checkbox.checked){
                        this.playerAnswer.push(checkbox.value);
                    }
                }
                if(JSON.stringify(this.playerAnswer) == JSON.stringify(this.question[index-1].correctAnswer)){
                    document.getElementById("imgScoreboard" + index).src = "https://image.flaticon.com/icons/svg/439/439842.svg"
                    document.getElementById("label" + (m+k+1)).classList.add("correct");
                    this.numCorrectAnswers.push(this.playerAnswer);
                }else{
                    document.getElementById("label" + (m+k+1)).classList.add("correct");
                    document.getElementById("imgScoreboard" + index).src = "https://image.flaticon.com/icons/svg/2174/2174026.svg"
                }
            }
        }

        getPlayerName () { //gets submitted name and numQuestions
            this.name = document.getElementById("name").value;
            document.getElementById("start").innerHTML = (`Let's get started ${this.name}! &rarr;`);
            numQuestions = document.getElementById("numQuestion").value;
        }

        showNumCorrectAnswers () {  //manipulates last div where correct answers are shown
            if(this.numCorrectAnswers.length > 0){ //if answers are more than 0
                document.getElementById("h1ShowScore").innerHTML = (`You collected ${this.numCorrectAnswers.length} ☀️. Good job!`)
            }else{ //if no answer is correct
                document.getElementById("congrats").innerHTML = "Woops!"
                document.getElementById("h1ShowScore").innerHTML = (`You collected ${this.numCorrectAnswers.length} ☀️ Perhaps you should read up on clouds before you retake the quiz!`)
            }
        }
        
    }

    let quiz = new Quiz;
    //push new question to quiz (of class Quiz) via class Question
    quiz.question.push((new Question("Lenticularis almost looks like a ufo. Where does it form? 2 answers are correct.", ["above mountains", "above fields", "above buildings"], ["0", "2"], "https://image.flaticon.com/icons/svg/308/308767.svg")));
    
    function start () { //start button
        index = 1;
        quiz.createDivContent();
        quiz.render();
        quiz.createScoreBoard();
        
 
    }

    function nextQuestion () {  //next button
        if(index >= numQuestions){
            index++;
            quiz.render();
        }else{
            for (let i = 1; i < 4; i++){ //checks if checkboxes are checked, otherwise player cannot move on
                let checkbox = document.getElementById("checkbox" + (i+m))
                if(checkbox.checked){
                    index++;
                    quiz.render();
                    m = m + 3; //increment m by 3 so 3 new checkboxes with unique ids can be created
                }
            }
        }


        
    }

    function prevQuestion () { //prev button
        index--
        quiz.render();
        m = m - 3; //decrements so the count is kept correct in relation to index
    }

    function submit () {
        quiz.evaluatePlayerAnswer();
        for (let i = 1; i < 4; i++){  //disables checkboxes so answer can't be manipulated
            let checkbox = document.getElementById("checkbox" + (i+m))
            checkbox.disabled = true;
        }
        
    }

    document.getElementById("btnAdd").addEventListener("click", quiz.getPlayerName); //eventlistener, not at top with others, since 
    //quiz has to be initialised

})




