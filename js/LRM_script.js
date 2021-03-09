//URL of API
const url_api = "https://www.codecyprus.org/th/api";

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
    fetch(list_api)
        .then(response => response.json)//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        .then(JSONresponse =>
            {
                huntList = document.getElementById('hunt-list');
            }
            )
}

function startGame()
{
    
}

function getQuestion()
{

}

function getAnswer()
{

}