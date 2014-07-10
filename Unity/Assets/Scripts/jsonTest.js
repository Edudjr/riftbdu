#pragma strict
import MiniJSON;
import System.Collections.Generic;

function Start () {
    var jsonString = "{ \"array\": [1.44,2,3], " +
                        "\"object\": {\"key1\":\"value1\", \"key2\":256}, " +
                        "\"string\": \"The quick brown fox \\\"jumps\\\" over the lazy dog \", " +
                        "\"unicode\": \"\\u3041 Men\\u00fa sesi\\u00f3n\", " +
                        "\"int\": 65536, " +
                        "\"float\": 3.1415926, " +
                        "\"bool\": true, " +
                        "\"null\": null }";

    var dict = Json.Deserialize(jsonString) as Dictionary.<String,System.Object>;
	
    //Debug.Log("deserialized: " + dict.GetType());
    var arr0 = ((dict["array"]) as List.<System.Object>)[0];
    //Debug.Log("arr0: " + Json.Deserialize(arr0) as Dictionary.<String,System.Object>);
    var arr0s = Json.Serialize(arr0);
	var dict3 = Json.Deserialize(arr0s) as Dictionary.<String,System.Object>;
	
	
    //Debug.Log("arr0: " + dict3['id'] as String);
    //Debug.Log("dict['array'][0]: " + ((dict["array"]) as List.<System.Object>)[0]);  
	//Debug.Log("dict['string']: " + dict["string"] as String);
	//Debug.Log("dict['float']: " + dict["float"]); // floats come out as doubles
	//Debug.Log("dict['int']: " + dict["int"]); // ints come out as longs
    //Debug.Log("dict['unicode']: " + dict["unicode"] as String);

    var str = Json.Serialize(dict);

    //Debug.Log("serialized: " + str);
    
    ///////////////////////////////////////
	
	////////////////////////////////////
	//TEST - Get json from url
	//var url = "https://edudjr.cloudant.com/users/_all_docs?include_docs=true";
	var url = "http://localhost:3000/country?country=Argentina";
	var www : WWW = new WWW (url);
	 
	// wait for request to complete
	yield www;
	 
	// and check for errors
	if (www.error == null){
	    
	    dict = Json.Deserialize(www.data) as Dictionary.<String,System.Object>;
		//var dict2 = Json.Deserialize(dict['rows']) as Dictionary.<String,System.Object>;
	   	//Debug.Log("WWW OK: "+dict2);
	    Debug.Log("DATA "+ (dict['fact'] as List.<System.Object>)[0]);
	    // request completed!
	} else {
	    // something wrong!
	    Debug.Log("WWW Error: "+ www.error);
	}
	
	
	
	//////////////////end test ///
}