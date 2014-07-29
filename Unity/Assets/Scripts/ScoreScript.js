#pragma strict

//Temporary. The score should be handled here and not in the gameStarter
private var gameStarter : GameStarter;

function Start () {
	gameStarter = GameObject.FindObjectOfType(GameStarter);
}

//Sends score to webApplication, which will post to cloudant
function sendScore(){
	var playerScore = getScore();
	
	var postScoreURL = "http://bluemixrift2.ng.bluemix.net/postscore";
	var jsonString = "{ \"score\":"+playerScore+", \"nickname\":\"joselito\" }";
	 
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

//Returns score from player
function getScore(){
	return gameStarter.getScore();
}