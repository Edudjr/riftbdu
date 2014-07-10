#pragma strict
import MiniJSON;
import System.Collections.Generic;

InvokeRepeating("repeatByTime", 0, 5.0);

function Start () {

}

function repeatByTime(){
	getRequest();
}

function getRequest(){
	//var url = "http://localhost:3000/country?country=Argentina";
	var url = "https://edudjr.cloudant.com/country/Argentina";
	var www : WWW = new WWW (url);
	 
	// wait for request to complete
	yield www;
	
	// and check for errors
	if (www.error == null){
	    var dict = Json.Deserialize(www.data) as Dictionary.<String,System.Object>;
	    //Debug.Log("DATA "+ (dict['fact'] as List.<System.Object>)[0]);
	    var str = (dict['fact'] as List.<System.Object>)[0];
	    
	    GetComponent(TextMesh).text = str;
	    // request completed!
	} else {
	    // something wrong!
	    Debug.Log("WWW Error: "+ www.error);
	}
}