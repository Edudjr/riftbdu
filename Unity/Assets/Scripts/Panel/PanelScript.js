﻿#pragma strict

import MiniJSON;
import System.Collections.Generic;

private var Country : String = null;
private var tipNumber : int = 0;

//Invoke repeatByTime() function every 5 seconds
InvokeRepeating("repeatByTime", 0, 5.0);

//Updates facts text
private function repeatByTime(){
	if(tipNumber>0)
		setFact(Country);

}

//Set country to be searched in the database
//Accessed externaly (eg: in the gameStarter script)
public function setCountry(Country : String){
	//If there is no country, reset panel text
	if((Country==null)||(Country==""))
		resetPanelText();
	else{
		//Validates string. Replaces \s(space) to %20(space in http) for http get request
		this.Country = Country.Replace(' ', '%20');
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
	//Debug.Log(Country);
	//Select panels 
	switch(tipNumber){
		case 0:
			setFact(Country);
			break;
		case 1:
			setLanguage(Country);
			break;
		case 2:
			setCuriosity(Country);
			break;
	}
	
	//Increase tipNumber (no more than 3) in order to change panels.
	if(tipNumber<3){
		tipNumber ++;
	}
}


//Each of the functions below will change the content of the text Tips

//Gets a country name, search in the database (given a link) and sets the first tip text to the returned string.
private function setFact(country : String){
	//var url = "http://localhost:3000/country?country=Argentina";
	var url = "https://edudjr.cloudant.com/country/"+country;
	var www : WWW = new WWW (url);
	 
	// wait for request to complete
	yield www;
	
	// and check for errors
	if (www.error == null){
	    var dict = Json.Deserialize(www.data) as Dictionary.<String,System.Object>;
	    //Debug.Log("DATA "+ (dict['fact'] as List.<System.Object>)[0]);
	    var str = (dict['fact'] as List.<System.Object>)[0];
	    //Change first 3Dtext
		//transform.GetChild(0).GetComponent(TextMesh).text = str;

	    // request completed!
	} else {
	    // something wrong!
	    Debug.Log("WWW Error: "+ www.error);
	}
	//Change first 3Dtext
	transform.GetChild(0).GetComponent(TextMesh).text = str;
}

//Gets a country name, search in the database (given a link) and sets the second tip text to the returned string.
private function setLanguage(country : String){
	//var url = "http://localhost:3000/country?country=Argentina";
	var url = "https://edudjr.cloudant.com/country/"+country;
	var www : WWW = new WWW (url);
	 
	// wait for request to complete
	yield www;
	
	// and check for errors
	if (www.error == null){
	    var dict = Json.Deserialize(www.data) as Dictionary.<String,System.Object>;
	    //Debug.Log("DATA "+ (dict['fact'] as List.<System.Object>)[0]);
	    var str = dict['language'];

	    // request completed!
	} else {
	    // something wrong!
	    Debug.Log("WWW Error: "+ www.error);
	}
	//Change second 3Dtext
	transform.GetChild(1).GetComponent(TextMesh).text = str + " is their language";
}

//Gets a country name, search in the database (given a link) and sets the third tip text to the returned string.
private function setCuriosity(country : String){
	//var url = "http://localhost:3000/country?country=Argentina";
	var url = "https://edudjr.cloudant.com/country/"+country;
	var www : WWW = new WWW (url);
	 
	// wait for request to complete
	yield www;
	
	// and check for errors
	if (www.error == null){
	    var dict = Json.Deserialize(www.data) as Dictionary.<String,System.Object>;
	    //Debug.Log("DATA "+ (dict['fact'] as List.<System.Object>)[0]);
	    var str = (dict['curiosity'] as List.<System.Object>)[0];

	    // request completed!
	} else {
	    // something wrong!
	    Debug.Log("WWW Error: "+ www.error);
	}
	//Change third 3Dtext
	transform.GetChild(2).GetComponent(TextMesh).text = str;
}
