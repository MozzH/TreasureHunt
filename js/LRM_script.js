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

//Question type
const qtype_choice = "MCQ";     //Multiple Choice
const qtype_text = "TEXT";      //Text
const qtype_num = "NUMERIC";    //Numeric
const qtype_int = "INTEGER";    //Integer
const qtype_bool = "BOOLEAN";   //Boolean

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
function getHunt()
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
    * if popup window, then put it into getHunt?
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

function startGame(event)    //called with EventListener(click)
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
                    //create custom message for each error
                    window.alert("There was an error.");
                    console.log("ERROR: No OK response");
                }

            }

        );
}

function getQuestion()
{
    //get questions using session id
    //https://codecyprus.org/th/api/question?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM
    let getQuestionURL = question_api + "?=session" + sessionid;
    fetch(getQuestionURL)
        .then(response => response.json())
        .then(JSONresponse3 =>
            {
                if(JSONresponse3.status == "OK")
                {
                    console.log("OK response");
                    /*
                    pseudo:
                    - create div
                    - p with questionText


                    - append div 
                    */
                    questionBox = document.getElementById('questionBox');
                    
                    let questionParagraph = document.createElement('p');
                    questionParagraph.innerHTML(JSONresponse3.questionText);

                    //that's were I had a break. Write more stuff here

                    //append everything!
                    questionBox.appendChild(questionParagraph);

                }
                else
                {
                    window.alert("There was an error.");
                    console.log("ERROR: No OK response.");
                }
            }
            );
}

function sendAnswer()   //call with onclick=""
{

}

function skipAnswer()   //call with onclick=""
{

}
