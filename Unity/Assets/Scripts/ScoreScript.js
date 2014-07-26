#pragma strict

//Temporary. The score should be handled here and not in the gameStarter
var gameStarter : GameStarter;

function Start () {
	gameStarter = GameObject.FindObjectOfType(GameStarter);
}

function Update () {
	
}

function sendScore(){
	var playerScore = getScore();
	
	var postScoreURL = "http://localhost:3000/postscore";
	var jsonString = "{ \"score\":"+playerScore+", \"nickname\":\"edudjr\" }";
	 
	var encoding = new System.Text.UTF8Encoding();
	var postHeader = new Hashtable();
	   
	postHeader.Add("Content-Type", "application/json");
	//postHeader.Add("Content-Length", jsonString.Length);
	 
	Debug.Log("jsonString: " + jsonString);
	 
	var request = WWW(postScoreURL, encoding.GetBytes(jsonString), postHeader);
	 
	yield request;
	   
	// Print the error to the console
	if (request.error != null){
	    Debug.Log("request error: " + request.error);
	}
	else{
	    Debug.Log("request success");
	    Debug.Log("returned data " + request.data);
	}
}

function getScore(){
	return gameStarter.getScore();
}