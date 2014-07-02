﻿#pragma strict

//Import necessary to use File Reader.
import System.IO;
//End of imports

//Variables description


//The Variable "referenceObject" can be altered directly on the Unity and decides the name of the object that should be followed.
public var referenceObject: String;
private var ObjectStarter : GameObject;

//The name of the country that needs to be guessed.
private var CountrytoGuess : String; 
private var Score : int = 0;

//Display that shows the name of the country to guess
public var CountryText3D : TextMesh;
public var ScoreText3D : TextMesh;
public var GameState3D : TextMesh;

//Answer values
public var answerSpeed : int = 5;
private static var WrongAnswer : int = 1;
private static var RightAnswer : int = 2;
private static var FinishGame : int = 3;

private static var lastSelected : String = null;


public var Flagboard : GameObject;
//public var boardObject : String;

//private var Board : GameObject; //This game object will be linked to the plane that shows the selected country
//public var boardObject : String = "CountryBoard"; //A variable which contains the name of the plane that will display the name of the selected country


/*This variable markers is the type of mark to use the method getActivated. This method will decide whether the player 
answer correctly or not.*/
var markers : Markers; 


//Variables which will define the file to get the name of the countries
var textFilePath : String;
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
	//ObjectStarter = GameObject.Find(referenceObject);
	
	//Number of lines for text file
	var nLines : int;
	
	//Clear Country name
	SetCountryText3D("");
	SetScoreText3D(0);
	
	//Set the path of the txt file
	textFilePath = "Assets//Resources//Files//SouthAmericaCountries.txt";
	 
	//Get a random marker script
	markers = GameObject.FindObjectOfType(Markers);
	
	
	//Get the number of lines on the txt and defines as limit to the array.
	nLines = GetNumberOfLines(textFilePath);
	for(var counter = 0; counter< nLines; counter++){
		Countries.push( ReadLine(textFilePath, counter) );
	}
	
	
	//Gives a random country name from a list to the variable "CountrytoGuess"
	CountrytoGuess = SortCountry();
	
	
}



function Update () {
	
	if (markers != null ){
		var activated = markers.getActivated();
		ChangeFlagtoCurrentSelected( markers.getActivated() );
		if(lastSelected != activated){
			lastSelected = activated;
			moveFlag();
		}
		if( (Input.GetKeyDown(KeyCode.D )) || (Input.GetButtonDown("Button_A")) ) {
			Debug.Log( markers.getActivated() );
			if ( CountrytoGuess == markers.getActivated() ) {
				Score+= RightAnswer;
				SetScoreText3D(Score);
				CountrytoGuess = SortCountry();
				setAnswer("Right!", Color.green);
			}
			else{
				setAnswer("Wrong!", Color.red);
				//Commenting. Uncomment only when necessary. >< SetGameStateText3D(WrongAnswer);
			}
		}
	}
	else {
	}

}

function resetFlag(){
	Flagboard.transform.position = Vector3(0,0,-4);
	Flagboard.transform.eulerAngles = Vector3(90,-180,0);
	Flagboard.transform.localScale = Vector3(.02, .02, .02);
	
}
function moveFlag(){
	
	resetFlag();
	
	while(Flagboard.transform.localPosition.z > -7){
		//Flagboard.transform.localPosition = Vector3(0,0,);
		Flagboard.transform.Translate(-6 * Time.deltaTime, 5 * Time.deltaTime, 0);
		Flagboard.transform.localScale.x += 0.3 * Time.deltaTime;
		Flagboard.transform.localScale.y += 0.2 * Time.deltaTime;
		Flagboard.transform.localScale.z += 0.2 * Time.deltaTime;
		
		Flagboard.transform.eulerAngles.x +=10;
		Flagboard.transform.eulerAngles.y += 2;
		//Debug.Log(Flagboard.transform.localPosition.z);
		yield;
	}
	//Flagboard.transform.position = Vector3(12,0,-4);
	//Flagboard.transform.eulerAngles = Vector3(90,252,0);
	//Flagboard.transform.localScale = Vector3(0.5, 0.5, 0.5);
	
}

function setAnswer(str : String, Colour : Vector4){
	var theText = GameObject.Find("AnswerText").transform;
	theText.GetComponent(TextMesh).text = str;
	theText.GetComponent(TextMesh).color = Colour;
	while(theText.transform.position.z > -5){
		theText.Translate(0, 0, -answerSpeed * Time.deltaTime);
		yield;
	}
	while(theText.transform.position.z < 0){
		theText.Translate(0, 0, answerSpeed * Time.deltaTime);
		yield;
	}
	theText.GetComponent(TextMesh).text = "";
	theText.position = Vector3(0,0,0);
}


function ReadLine(filePath : String, nLine : int) : String
    {
        var reader = new StreamReader(File.Open(filePath, FileMode.Open)) ;
        var line : String = " ";
        var n : int = 0;
        while (n++ <= nLine)
            line = reader.ReadLine();
        reader.Close();
        return line;
        

    }
 
 
function GetNumberOfLines(filePath : String) : int
    {
        var reader = new StreamReader(File.Open(filePath, FileMode.Open));
        var number = reader.ReadToEnd().Split("\n"[0]).Length;
        reader.Close();
        return number;
    }
    
    
function SortCountry () : String {
    if(Countries.length > 0){	
    	var rand : int;
		var Country : String;
		rand = Random.Range(0, Countries.length);
 		Country = Countries[rand];
 		//removeCountryFromArray(rand);
 		Countries.RemoveAt(rand);
 		SetCountryText3D(Country);
 		//Board.renderer.material.mainTexture = Resources.Load(Country+"-Board");
 		return Country;
 	}
}

function SetCountryText3D(name : String){
	CountryText3D.text = name;
}


function SetScoreText3D(points){
	ScoreText3D.text = "Score: " +  points.ToString();
}


function ChangeFlagtoCurrentSelected(Countryname : String){
	//Debug.Log(Countryname);
	Flagboard.renderer.material.mainTexture = Resources.Load("Flags/SouthAmerica/" + Countryname +"-flag");

}