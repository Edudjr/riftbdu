#pragma strict

public var referenceObject: String;
private var ObjectStarter : GameObject;
public var CountrytoGuess : String; 
public var Score : int = 0;


var markers : Markers; 







function Start () {
	ObjectStarter = GameObject.Find(referenceObject);
	CountrytoGuess = "Brazil";
	//markers = new markers ; 
	markers = GetComponent(Markers);
	
}

function Update () {
	//markers = GetComponents(Markers)
	if (markers != null ){
//	Debug.Log();
		if(Input.GetKey("d")){
			if ( CountrytoGuess == markers.getActivated() ) {
				Score ++;
				Debug.Log(Score);
			}
		}
	}
	else {
	//Debug.Log("Erro fi duma mae");
	}

}