//URL of API
const url_api = "https://codecyprus.org/th/api";
const test_api = "https://codecyprus.org/th/test-api";

//URL of API + API function calling
const list_api = url_api + "/list";
const start_api = url_api + "/start";

const question_api = url_api + "/question";
const answer_api = url_api + "/answer";
const skip_api = url_api + "/skip";

const location_api = url_api + "/location"

const score_api = url_api + "/score";
const leaderboard = url_api + "/leaderboard";

//variables
let playername;
//let sessionid;
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

                        //details about hunt
                        let THelementDetails = document.createElement('p');
                        let treasureHuntStartDate = new Date (treasureHunt.startsOn);
                        let treasureHuntEndDate = new Date (treasureHunt.endsOn);
                        let tresureHuntDuration = (treasureHunt.maxDuration / 1000 / 60);

                        THelementDetails.innerHTML = "<b>Description:</b> " + treasureHunt.description + '<br>' 
                                                    + "<b>Starts on:</b> " + treasureHuntStartDate.toLocaleDateString('en-US') + '<br>'
                                                    + "<b>Ends on:</b> " + treasureHuntEndDate.toLocaleDateString('en-US') + '<br>'
                                                    + "<b>Duration:</b> around " + tresureHuntDuration + " minutes";

                        let THelementButton = document.createElement('button');
                        THelementButton.id = treasureHunt.uuid;
                        THelementButton.innerText = "Play";
                        THelementButton.addEventListener("click", startGame);

                        THelement.appendChild(THelementName);
                        THelement.appendChild(THelementDetails);
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
                    skipBox = document.getElementById('skipBox');

                    //check for location
                    if (JSONresponse3.requiresLocation == true)
                    {
                        getLocation();
                    }
                    
                    //create question
                    let questionParagraph = document.createElement('p');
                    questionParagraph.innerHTML = JSONresponse3.questionText;
                    //append questionParagraph
                    questionBox.appendChild(questionParagraph);


                    let questionType = JSONresponse3.questionType;

                    switch(questionType)
                    {
                        //BOOLEAN QUESTIONS
                        case "BOOLEAN":
                            
                            console.log("type = " + questionType)

                            //two buttons w/ true and false
                            
                            //button true
                            let buttonTrue = document.createElement('button');
                            buttonTrue.innerText = "True";
                            buttonTrue.value = true;
                            buttonTrue.id = "buttonTrue";
                            buttonTrue.addEventListener("click", sendAnswer);
                            
                            //button false
                            let buttonFalse = document.createElement('button');
                            buttonFalse.innerText = "False";
                            buttonFalse.value = false;
                            buttonFalse.id = "buttonFalse";
                            buttonFalse.addEventListener("click", sendAnswer);
    
                            //append
                            answerBox.appendChild(buttonTrue);
                            answerBox.appendChild(buttonFalse);    
                            break;


                        //MULTIPLE CHOICE QUESTIONS
                        case "MCQ":

                            console.log("type = " + questionType)
                            
                            //create buttons

                            //button A
                            let choiceA = document.createElement('button');
                            choiceA.innerText = "A";
                            choiceA.value = "A";
                            choiceA.id = "choiceA";
                            choiceA.addEventListener("click", sendAnswer);

                            //button B
                            let choiceB = document.createElement('button');
                            choiceB.innerText = "B";
                            choiceB.value = "B";
                            choiceB.id = "choiceB";
                            choiceB.addEventListener("click", sendAnswer);

                            //button C
                            let choiceC = document.createElement('button');
                            choiceC.innerText = "C";
                            choiceC.value = "C";
                            choiceC.id = "choiceC";
                            choiceC.addEventListener("click", sendAnswer);

                            //button D
                            let choiceD = document.createElement('button');
                            choiceD.innerText = "D";
                            choiceD.value = "D";
                            choiceD.id = "choiceD";
                            choiceD.addEventListener("click", sendAnswer);

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
                            intAnswer.action = 'javascript:sendAnswer()';

                            //create textBox in Form
                            let intTextBox = document.createElement('input');
                            intTextBox.id = "answerTextBox";
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
                            numAnswer.action = 'javascript:sendAnswer()';

                            //create textBox in form
                            let numTextBox = document.createElement('input');
                            numTextBox.id = "answerTextBox";
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
                            let textAnswer = document.createElement('form');
                            textAnswer.action = 'javascript:sendAnswer()';

                            //create textBox in form
                            let textTextBox = document.createElement('input');
                            textTextBox.id = "answerTextBox";
                            textTextBox.type = "text";

                            //submit button in form
                            let textSubmit = document.createElement('input');
                            textSubmit.type = "submit";
                            textSubmit.value = "submit";

                            //append everything
                            textAnswer.appendChild(textTextBox);
                            textAnswer.appendChild(textSubmit);
                            answerBox.appendChild(textAnswer);

                            break;
                    }
                    //END OF SWITCH/CASE

                    //skip button
                    let skipButton = document.createElement('button');
                    skipButton.innerText = "skip";
                    skipButton.id = "skipButton";

                    console.log(JSONresponse3.canBeSkipped);

                    if (JSONresponse3.canBeSkipped == true)
                    {
                        skipButton.addEventListener("click", skipAnswer);
                    }
                    else
                    {
                        document.getElementByID("skipButton").disabled = true;
                    }

                    skipBox.appendChild(skipButton);


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

function sendAnswer(event)   //call with EventListener('click') in getQuestion()
{

    let answer;

    //get values from elements via Event Listener
    if (event == undefined)
    {
        let textBoxInput = document.getElementById("answerTextBox").value;
        answer = textBoxInput;
    }
    else
    {
        let buttonInput = document.getElementById(event.target.id).value;
        answer = buttonInput;

        console.log("Answer: " + answer);
    }
   

    //example url: https://codecyprus.org/th/api/answer?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&answer=42
    const urlParams = new URLSearchParams(window.location.search);

    let sendAnswerURL = answer_api + "?session=" + urlParams.get('sessionid') + "&answer=" + answer;

    fetch(sendAnswerURL)
    .then(response => response.json())
    .then(JSONresponse4 =>
        {
            console.log(sendAnswerURL);
            console.log(JSONresponse4);

            if(JSONresponse4.status == "OK")
            {
                console.log("OK response");
                if(JSONresponse4.correct == true)
                {
                    console.log("correct answer");

                    //reload page
                    window.location.reload(true);
                }
                else if (JSONresponse4.correct == false)
                {
                    console.log("false answer");
                }
            }
            else
            {
                window.alert(JSONresponse4.errorMessages);
                console.log("ERROR: No OK response.");
            }
        }
        );
    

}

function skipAnswer()   //call with onclick=""?
{
    //example URL: https://codecyprus.org/th/api/skip?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM
    const urlParams = new URLSearchParams(window.location.search);

    let skipAnswerURL = skip_api + "?session=" + urlParams.get('sessionid');
    fetch(skipAnswerURL)
    .then(response => response.json())
    .then(JSONresponse6 =>
        {
            if(JSONresponse6.status == "OK")
            {
                //code
                window.location.reload(true);
            }
            else
            {
                //error message
                window.alert(JSONresponse6.errorMessages);
                console.log("ERROR: No OK response");
            }
        }
        );

}


//GEOLOCATION FUNCTIONS
function getLocation()
{
    let latitude;
    let longitude;

    //get position, update every 30 seconds
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log("geolocation accepted");
        setTimeout(getLocation, 30000);
    } 
    else 
    { 
        alert("Geolocation is not supported by this browser.");
    } 

    console.log("Latitude: " + latitude + ", Longitude: " + longitude);

    //example URL: https://codecyprus.org/th/api/location?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&latitude=34.683646&longitude=33.055391
    const urlParams = new URLSearchParams(window.location.search);

    let getLocationURL = location_api + "?session=" + urlParams.get('sessionid') + "&latitude=" + latitude + "&longitude=" + longitude;
    console.log(getLocationURL);
    fetch(getLocationURL)
        .then(response =>response.json())
        .then(JSONrepsonse5 =>
        {
            if(JSONrepsonse5.status == "OK")
            {
                //code
                console.log(JSONrepsonse5.message);
            }
            else
            {
                //error message
                window.alert(JSONrepsonse5.errorMessages);
                console.log("ERROR: No OK response");
            }

        }
        );

}

//showing the postition of the user
function showPosition(position) 
{
    //showing the location of the user on the console for debugging issues
    console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}