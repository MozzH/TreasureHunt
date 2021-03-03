//URL of API
const url_api = "https://www.codecyprus.org/th/api";

//URL of API + API function calling
const selection_api = url_api + "/list";
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