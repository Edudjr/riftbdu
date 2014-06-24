#pragma strict

//Import necessary to use File Reader.
import System.IO;
//End of imports

//Variables description


//The Variable "referenceObject" can be altered directly on the Unity and decides the name of the object that should be followed.
public var referenceObject: String;
private var ObjectStarter : GameObject;

//The name of the country that needs to be guessed.
public var CountrytoGuess : String; 
public var Score : int = 0;


private var Board : GameObject; //This game object will be linked to the plane that shows the selected country
public var boardObject : String = "CountryBoard"; //A variable which contains the name of the plane that will display the name of the selected country


/*This variable markers is the type of mark to use the method getActivated. This method will decide whether the player 
answer correctly or not.*/
var markers : Markers; 

var pathofTextFile : String = "SouthAmericaCountries.txt";
var nLinesofTextFileofTextFile : int;
//var randomLine ;



function Awake (){
	//Just setting the name again, to make sure.
	boardObject = "CountryBoard";
	//When start, look for the plane
	Board = GameObject.Find(boardObject);
}
    



function Start () {
	//Gets the name of the game object on the Unity
	ObjectStarter = GameObject.Find(referenceObject);
	 
	//markers = GetComponent(Markers);
	//Get a random marker script
	markers = GameObject.FindObjectOfType(Markers);
	
	
	
	//Gives a random country name from a list to the variable "CountrytoGuess"
	CountrytoGuess = SortCountry();
	
	
}



function Update () {
	
	if (markers != null ){
		if( (Input.GetKeyDown(KeyCode.D )) ) {
			Debug.Log( markers.getActivated() );
			if ( CountrytoGuess == markers.getActivated() ) {
				Score ++;
				Debug.Log(Score);
				CountrytoGuess = SortCountry();
			}
		}
	}
	else {
	}

}



function ReadLine(pathofTextFileofTextFile : String, nLine : int) : String
    {
        var reader = new StreamReader(File.Open(pathofTextFileofTextFile, FileMode.Open)) ;
        var line : String = " ";
        var n : int = 0;
        while (n++ <= nLine)
            line = reader.ReadLine();
        reader.Close();
        return line;
        

    }
 
 
 function GetNumberOfLines(pathofTextFileofTextFile : String) : int
    {
        var reader = new StreamReader(File.Open(pathofTextFile, FileMode.Open));
        var nLinesofTextFileofTextFile = reader.ReadToEnd().Split("\n"[0]).Length;
        reader.Close();
        return nLinesofTextFileofTextFile;
    }
    
    
    function SortCountry () : String {
    	var rand;
		var Country : String;
		nLinesofTextFileofTextFile = GetNumberOfLines(pathofTextFile);
		rand = Random.Range(0, nLinesofTextFileofTextFile);
 		Country = ReadLine(pathofTextFile, rand);
 		Board.renderer.material.mainTexture = Resources.Load(Country+"-Board");
 		return Country;

}