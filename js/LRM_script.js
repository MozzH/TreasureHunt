//URL of API
const url_api = "https://codecyprus.org/th/api";
const test_api = "https://codecyprus.org/th/test-api";

//URL of API + API function calling
const list_api = url_api + "/list";
const start_api = url_api + "/start";

const question_api = url_api + "/question";
const answer_api = url_api + "/answer";
const skip_api = url_api + "/skip";

const score_api = url_api + "/score";
const leaderboard = url_api + "/leaderboard";

//variables
let playername;

let huntList; //html id: hunt-list

//check for empty answer field
function checkField()
{
    //if field empty, return false; otherwise true
    if (document.getElementById('').value == "")
    {
        return false;
    }
    else
    {
        return true;
    }
}
//COOKIE FUNCTIONS  >>replace cookies.js later<<


//SESSION FUNCTIONS
function startSession()
{
    
}

function endSession()
{

}

//GAME FUNCTIONS
function getHunt()      //get List of Treasure Hunts
{
    console.log("getHunt called")
    fetch(list_api)
        .then(response => response.json())  //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        .then(JSONresponse =>
            {
                console.log(JSONresponse);
                if(JSONresponse.status == "OK")
                {
                    let treasureHunt; //

                    huntList = document.getElementById('hunt-list');

                    for (treasureHunt of JSONresponse.treasureHunts) //for each
                    {
                        //add li elements to ul
                        //give id to every li (use uuid)
                        let THelement = document.createElement('li');
                        //THelement.id = treasureHunt.uuid;
                        THelement.className="ul-remove";
                        THelement.className="li-TH";
                       

                        let THelementName = document.createElement('h3');
                        THelementName.innerText = treasureHunt.name;

                        let THelementButton = document.createElement('button');
                        THelementButton.id = treasureHunt.uuid;
                        THelementButton.innerText = "Play";
                        THelementButton.addEventListener("click", startGame);

                        THelement.appendChild(THelementName);
                        THelement.appendChild(THelementButton);
                        huntList.appendChild(THelement);    //puts li inside of ul; instead of huntList.innerHTML += "<li> </li>"
                    }
                }
                else
                {
                    //error message
                    window.alert("There was an error. Please refresh or try again later.")
                    console.log("ERROR: No OK response");
                }
                
            }
        );
}

function getPlayername()
{
    /*
    * popup window? https://www.w3schools.com/js/js_popup.asp
    */
    playername = prompt("Please enter your name:", "");
    if (playername == "")
    {
        //code for no name
        window.alert("To play, you need to submit a name");
    }
    else 
    {
        return playername;
    }

}

function startGame(event)    //called with EventListener(click) in getHunt()
{
    //start session + remember session id
    console.log(event.target.id);
    let TreasureHuntID = event.target.id; //move out from function into html

    //Example url from CodeCyprus: https://codecyprus.org/th/api/start?player=Homer&app=simpsons-app&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw
    let startGameURL = start_api + "?player=" + getPlayername() + "&app=lrm-quiz&treasure-hunt-id=" + TreasureHuntID;
    fetch(startGameURL)
        .then(response => response.json())
        .then(JSONresponse2=>
            {
                console.log(startGameURL);
                console.log(JSONresponse2);
                if(JSONresponse2.status == "OK")
                {
                    /*
                    pseudo:
                    - open new page
                    - pass session id as html parameter
                    */
                    let sessionid = JSONresponse2.session;

                    window.open("quiz.html?sessionid=" + sessionid, '_self', true);
                }
                else
                {
                    //error message
                    //get custom message for each error
                    window.alert(JSONresponse2.errorMessages);
                    console.log("ERROR: No OK response");
                }

            }

        );
}

function getQuestion()
{
    //get questions using session id
    //example: https://codecyprus.org/th/api/question?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM
    const urlParams = new URLSearchParams(window.location.search);

    let getQuestionURL = question_api + "?session=" + urlParams.get('sessionid');
    fetch(getQuestionURL)
        .then(response => response.json())
        .then(JSONresponse3 =>
            {
                if(JSONresponse3.status == "OK")
                {
                    console.log("OK response");
                    questionBox = document.getElementById('questionBox');
                    answerBox = document.getElementById('answerBox');
                    
                    //create question
                    let questionParagraph = document.createElement('p');
                    questionParagraph.innerHTML = JSONresponse3.questionText;
                    //append questionParagraph
                    questionBox.appendChild(questionParagraph);


                    let questionType = JSONresponse3.questionType;
                    let skip = JSONresponse3.canBeSkipped;

                    switch(questionType)
                    {
                        //BOOLEAN QUESTIONS
                        case "BOOLEAN":
                            
                            console.log("type = " + questionType)

                            //two buttons w/ true and false
                            
                            //button true
                            let buttonTrue = document.createElement('button');
                            buttonTrue.innerText = "True";
                            buttonTrue.addEventListener("click", sendAnswer('true'));
                            
                            //button false
                            let buttonFalse = document.createElement('button');
                            buttonFalse.innerText = "False";
                            buttonFalse.addEventListener("click", sendAnswer('false'));
    
                            //append
                            questionBox.appendChild(buttonTrue);
                            questionBox.appendChild(buttonFalse);    
                            break;


                        //MULTIPLE CHOICE QUESTIONS
                        case "MCQ":

                            console.log("type = " + questionType)
                            
                            //create buttons

                            //button A
                            let choiceA = document.createElement('button');
                            choiceA.innerText = "A";
                            choiceA.addEventListener("click", sendAnswer('A'));

                            //button B
                            let choiceB = document.createElement('button');
                            choiceB.innerText = "B";
                            choiceB.addEventListener("click", sendAnswer('B'));

                            //button C
                            let choiceC = document.createElement('button');
                            choiceC.innerText = "C";
                            choiceC.addEventListener("click", sendAnswer('C'));

                            //button D
                            let choiceD = document.createElement('button');
                            choiceD.innerText = "D";
                            choiceC.addEventListener("click", sendAnswer('D'));

                            //append everything
                            answerBox.appendChild(choiceA);
                            answerBox.appendChild(choiceB);
                            answerBox.appendChild(choiceC);
                            answerBox.appendChild(choiceD);

                            break;


                        //INTEGER QUESTIONS
                        case "INTEGER":
                            console.log("type = " + questionType)
                            //code for integer questions

                            //create form
                            let intAnswer = document.createElement('form');
                            intAnswer.action = 'javscript:sendAnswer(document.getElementById("intTextBox").value)';

                            //create textBox in Form
                            let intTextBox = document.createElement('input');
                            intTextBox.type = "number";

                            //submit button in form
                            let intSubmit = document.createElement('input');
                            intSubmit.type = "submit";

                            //append everything
                            intAnswer.appendChild(intTextBox);
                            intAnswer.appendChild(intSubmit);
                            answerBox.appendChild(intAnswer);

                            break;


                        //NUMERIC QUESTIONS
                        case "NUMERIC":
                            console.log("type = " + questionType)
                            //code for numeric questions

                            //create form
                            let numAnswer = document.createElement('form');
                            numAnswer.action = 'javscript:sendAnswer(document.getElementById("numTextBox").value)';

                            //create textBox in form
                            let numTextBox = document.createElement('input');
                            numTextBox.type = "number";

                            //submit button in form
                            let numSubmit = document.createElement('input');
                            numSubmit.type = "submit";
                            numSubmit.value = "submit";

                            //append everything
                            numAnswer.appendChild(numTextBox);
                            numAnswer.appendChild(numSubmit);
                            answerBox.appendChild(numAnswer);

                            break;


                        //TEXT QUESTIONS
                        case "TEXT":

                            console.log("type = " + questionType)
                            //code for text questions

                            //create form
                            let textAnswer = document.createElemend('form');
                            textAnswer.action = 'javscript:sendAnswer(document.getElementById("textTextBox").value)';

                            //create textBox in form
                            let textTextBox = document.createElement('input');
                            textTextBox.type = "type";

                            //submit button in form
                            let textSubmit = document.createElement('input');
                            textSubmit.type = "button";

                            //append everything
                            break;
                    }
                    //END OF SWITCH/CASE

                    //place skip button
                    if (skip == true)
                    {
                        //create button somewhere
                    }

                    //append everything!

                }
                else
                {
                    window.alert(JSONrepsonse3.errorMessages);
                    console.log("ERROR: No OK response.");
                }
            }
            );
}

function sendAnswer()   //call with EventListener('click') in getQuestion()
{

    //example url: https://codecyprus.org/th/api/answer?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&answer=42
    const urlParams = new URLSearchParams(window.location.search);

    let sendAnswerURL = answer_api + "?session=" + urlParams.get(sessionid) + "&answer=" /*Answer*/;

}

function skipAnswer()   //call with onclick=""
{

}
