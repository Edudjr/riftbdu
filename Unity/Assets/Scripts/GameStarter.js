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

//Display that shows the name of the country to guess
public var CountryText3D : TextMesh;
public var ScoreText3D : TextMesh;
public var GameState3D : TextMesh;
private static var WrongAnswer : int = 1;
private static var RightAnswer : int = 2;
private static var FinishGame : int = 3;




//private var Board : GameObject; //This game object will be linked to the plane that shows the selected country
//public var boardObject : String = "CountryBoard"; //A variable which contains the name of the plane that will display the name of the selected country


/*This variable markers is the type of mark to use the method getActivated. This method will decide whether the player 
answer correctly or not.*/
var markers : Markers; 

var pathofTextFile : String = "SouthAmericaCountries.txt";
var nLinesofTextFileofTextFile : int;
//var randomLine ;

//Array that will receive the name from all countries from a txt file.
var Countries : Array  = [];


/*function Awake (){
	//Just setting the name again, to make sure.
	//boardObject = "CountryBoard";
	//When start, look for the plane
	//Board = GameObject.Find(boardObject);
}*/
    



function Start () {

	//Gets the name of the game object on the Unity
	ObjectStarter = GameObject.Find(referenceObject);
	
	//Clear Country name
	SetCountryText3D("");
	SetScoreText3D(0);
	 
	//markers = GetComponent(Markers);
	//Get a random marker script
	markers = GameObject.FindObjectOfType(Markers);
	
	
	//Get the number of lines on the txt and defines as limit to the array.
	nLinesofTextFileofTextFile = GetNumberOfLines(pathofTextFile);
	for(var counter = 0; counter< nLinesofTextFileofTextFile; counter++){
		Countries.push( ReadLine(pathofTextFile, counter) );
	}
	
	
	//Gives a random country name from a list to the variable "CountrytoGuess"
	CountrytoGuess = SortCountry();
	
	
}



function Update () {
	
	if (markers != null ){
		if( (Input.GetKeyDown(KeyCode.D )) || (Input.GetButtonDown("Button_A")) ) {
			Debug.Log( markers.getActivated() );
			if ( CountrytoGuess == markers.getActivated() ) {
				Score++;
				SetScoreText3D(Score);
				CountrytoGuess = SortCountry();
			}
			else{
			//Commenting. Uncomment only when necessary. >< SetGameStateText3D(WrongAnswer);
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
        var number = reader.ReadToEnd().Split("\n"[0]).Length;
        reader.Close();
        return number;
    }
    
    
function SortCountry () : String {
    	var rand : int;
		var Country : String;
		rand = Random.Range(0, Countries.length);
 		Country = Countries[rand];
 		removeCountryFromArray(rand);
 		SetCountryText3D(Country);
 		//Board.renderer.material.mainTexture = Resources.Load(Country+"-Board");
 		return Country;

}


function removeCountryFromArray(position : int){
	Countries.splice(position,1);
}


function SetCountryText3D(name : String){
	CountryText3D.text = name;
}


function SetScoreText3D(points){
	ScoreText3D.text = "Score: " +  points.ToString();
}


function SetGameStateText3D(condition : int){
	if (condition == 1){
	GameState3D.color = Color.red;
		GameState3D.text = "Incorrect!";
	}
	
	if(condition == 2){
	
	}
	
	if(condition == 3){
		GameState3D.text = "You Win!!";
	
	}
}