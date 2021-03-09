//URL of API
const url_api = "https://codecyprus.org/th/api";

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
const qtype_text = "";          //Text
const qtype_num = "";           //Numeric
const qtype_int = "INTEGER";    //Integer
const qtype_bool = "BOOLEAN";   //Boolean

//variables
let session;
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
        .then(response => response.json())//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        .then(JSONresponse =>
            {
                console.log(JSONresponse);
                if(JSONresponse.status == "OK")
                {
                    console.log("4653");
                    let treasureHunt; //

                    huntList = document.getElementById('hunt-list');

                    for (treasureHunt of JSONresponse.treasureHunts) //for each
                    {
                        //add li elements to ul
                        //give id to every li (use uuid)
                        let THelement = document.createElement('li');
                        //THelement.id = treasureHunt.uuid;

                        let THelementName = document.createElement('h3');
                        THelementName.innerText = treasureHunt.name;

                        let THelementButton = document.createElement('button');
                        THelementButton.innerText = "Play";
                        THelementButton.id = treasureHunt.uuid;
                        THelementButton.addEventListener("click", startGame);

                        THelement.appendChild(THelementName);
                        THelement.appendChild(THelementButton);
                        huntList.appendChild(THelement);    //puts li inside of ul;                         huntList.innerHTML += "<li> </li>"
                    }
                }
                else
                {
                    //find something for error
                    console.log("No OK response");
                }
                
            }
            )
}

function startGame(event)    //call with onclick=""
{
    //start session + remember session id
    console.log(   event.target.id);
}

function getQuestion()
{
    //get questions using session id
}

function sendAnswer()   //call with onclick=""
{

}

function skipAnswer()   //call with onclick=""
{

}