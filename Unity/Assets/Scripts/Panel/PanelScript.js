#pragma strict

import MiniJSON;
import System.Collections.Generic;

private var Country : String = null;
private var tipNumber : int = 0;

//Invoke repeatByTime() function every 5 seconds
//InvokeRepeating("repeatByTime", 0, 5.0);


function Start(){
	//Debug.Log("START");
	//Login();
}

//Updates facts text
private function repeatByTime(){
	if(tipNumber>0)
		setFact(Country);
}

//Set country to be searched in the database
//Accessed externaly (eg: in the gameStarter script)
public function setCountry(Country : String){
	//If there is no country, reset panel text
	if((Country==null)||(Country=="")){
		resetPanelText();
	}else{
		//Validates string. Replaces \s(space) to %20(space in http) for http get request
		this.Country = Country.Replace(' ', '%20');
		//Debug.Log("PanelScript - country: "+Country);
	}
}

//If tipNumber reaches its capacity (like 3 tips) we can reset it to zero.
//Then, we can use resetTipNumber()
public function resetTipNumber(){
	tipNumber = 0;
	resetPanelText();
}

public function getTipNumber(){
	return tipNumber;
}

//Set all panel texts to empty string
private function resetPanelText(){
	for (var child : Transform in transform) {
    	// do whatever you want with child transform here
    	child.GetComponent(TextMesh).text = "";
	}
}

//Load one tip by time. Every time this function is called, it loads another tip in the panel, until it reaches 3 tips.
public function loadTip(){
	//Debug.Log("LOAD: "+Country);
	//Select panels 
	switch(tipNumber){
		case 0:
			setFact(Country);
			break;
		case 1:
			setCuriosity(Country);
			break;
		case 2:
			setLanguage(Country);
			break;
	}
	
	//Increase tipNumber (no more than 3) in order to change panels.
	if(tipNumber<3){
		tipNumber ++;
	}
}


//Each of the functions below will change the content of the text Tips

private function setFact(country : String){	
	if(country==null){
		Debug.Log("Country==null");
		return;
	}else{
		var option = "fact";
		var url = "http://localhost:3000/getfact?country="+country+"&option="+option;
		// Start a download of the given URL
		var www : WWW = new WWW (url);
		// Wait for download to complete
		yield www;
	    
	    if (www.error != null) {
       		Debug.Log(www.error); //if there is an error, tell us
	    } else {
	        //Change first 3Dtext
			transform.GetChild(0).GetComponent(TextMesh).text = www.data;
			www.Dispose(); //clear our form in game
	    }
	}
}

private function setLanguage(country : String){
  if(country==null){
		Debug.Log("Country==null");
		return;
	}else{
		var option = "language";
		var url = "http://localhost:3000/getfact?country="+country+"&option="+option;
		// Start a download of the given URL
		var www : WWW = new WWW (url);
		// Wait for download to complete
		yield www;
	    
	    if (www.error != null) {
       		Debug.Log(www.error); //if there is an error, tell us
	    } else {
	        //Change first 3Dtext
			transform.GetChild(2).GetComponent(TextMesh).text = www.data+" is their language";
			www.Dispose(); //clear our form in game
	    }
	}
}

private function setCuriosity(country : String){
if(country==null){
		Debug.Log("Country==null");
		return;
	}else{
		var option = "curiosity";
		var url = "http://localhost:3000/getfact?country="+country+"&option="+option;
		// Start a download of the given URL
		var www : WWW = new WWW (url);
		// Wait for download to complete
		yield www;
	    
	    if (www.error != null) {
       		Debug.Log(www.error); //if there is an error, tell us
	    } else {
	        //Change first 3Dtext
			transform.GetChild(1).GetComponent(TextMesh).text = www.data;
			www.Dispose(); //clear our form in game
	    }
	}
}

//TEST FUNCTION
function Login() {
    var form = new WWWForm(); //here you create a new form connection
    var username = "edudjr";
    var password = "edudjr";
    form.AddField( "username", username ); //add your hash code to the field myform_hash, check that this variable name is the same as in PHP file
    form.AddField( "password", password );
    //form.AddField( "myform_pass", formPassword );
   	
   	var url = "https://cloudant.com/sign-in/";
    var w = WWW(url, form); //here we create a var called 'w' and we sync with our URL and the form
    yield w; //we wait for the form to check the PHP file, so our game dont just hang
    if (w.error != null) {
        Debug.Log(w.error); //if there is an error, tell us
    } else {
        Debug.Log("Test ok");
        Debug.Log(w.data); //here we return the data our PHP told us
        w.Dispose(); //clear our form in game
    }
 
 	///////////// *** TEST POSTING SCORE TO APPLICATION *** /////////////   
    var postScoreURL = "http://localhost:3000/postscore";
	var jsonString = "{ \"score\":1000, \"nickname\":\"edudjr\" }";
	 
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
