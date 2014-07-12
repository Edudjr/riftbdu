#pragma strict

//Import necessary to use File Reader.
import System.IO;

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

private static var lastSelected : String = null;


public var Flagboard : GameObject;

//Get the Markers script.
var markers : Markers; 


//Variables which will define the file to get the name of the countries
var textFilePath : String;

//Array that will receive the name from all countries from a txt file.
var Countries : Array  = [];
    
//Get PanelScript script
var panelScript: PanelScript;



function Start () {
	
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
	
	panelScript = GameObject.FindObjectOfType(PanelScript);
}



function Update () {
	
	if (markers != null ){
		var activated = markers.getActivated();
		ChangeFlagtoCurrentSelected( markers.getActivated() );
		//set panel information
		panelScript.setCountry(CountrytoGuess);
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
				//If answer is correct, we need to restart the tipNumber counter
				panelScript.resetTipNumber();
			}
			else{
				Score-= WrongAnswer;
				panelScript.loadTip();
				setAnswer("Wrong!", Color.red);
			}
		}
	}

}

//Puts flag to initial position (center of the screen, small scale)
function resetFlag(){
	Flagboard.transform.position = Vector3(0,0,-4);
	Flagboard.transform.eulerAngles = Vector3(90,-180,0);
	Flagboard.transform.localScale = Vector3(.02, .02, .02);
	
}

//Does the animation for the Flag. The flag begins small, at the center of the screen
//and then the script moves it and makes it bigger, gradually, until it reaches the final position, which is next to the camera.
function moveFlag(){
	resetFlag();
	Flagboard.transform.renderer.material.color.a = 1;
	while(Flagboard.transform.localPosition.z > -7){
		//Flagboard.transform.localPosition = Vector3(0,0,);
		Flagboard.transform.Translate(-6 * Time.deltaTime, 5 * Time.deltaTime, 0);
		Flagboard.transform.localScale.x += 0.3 * Time.deltaTime;
		Flagboard.transform.localScale.y += 0.2 * Time.deltaTime;
		Flagboard.transform.localScale.z += 0.2 * Time.deltaTime;
		
		Flagboard.transform.eulerAngles.x +=10;
		Flagboard.transform.eulerAngles.y += 2;
		yield;
	}

	
}

//Set the text of the answer text. It gets a String and a Colour.
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

//Returns one line from the given file in filePath.
function ReadLine(filePath : String, nLine : int) : String{
	var reader = new StreamReader(File.Open(filePath, FileMode.Open)) ;
	var line : String = " ";
	var n : int = 0;
	while (n++ <= nLine)
	    line = reader.ReadLine();
	reader.Close();
	return line;
}
 

//Returns number of lines
function GetNumberOfLines(filePath : String) : int{
	var reader = new StreamReader(File.Open(filePath, FileMode.Open));
	var number = reader.ReadToEnd().Split("\n"[0]).Length;
	reader.Close();
	return number;
}
    
//Randomly selects a country from the countries list  
function SortCountry () : String {
    if(Countries.length > 0){	
    	var rand : int;
		var Country : String;
		rand = Random.Range(0, Countries.length);
 		Country = Countries[rand];
 		Countries.RemoveAt(rand);
 		SetCountryText3D(Country);
 		return Country;
 	}
}

//Sets the text for the country
function SetCountryText3D(name : String){
	CountryText3D.text = name;
}

//Sets the text for the score
function SetScoreText3D(points){
	ScoreText3D.text = "Score: " +  points.ToString();
}

//Changes the flag to current selected country
function ChangeFlagtoCurrentSelected(Countryname : String){
	Flagboard.renderer.material.mainTexture = Resources.Load("Flags/SouthAmerica/" + Countryname +"-flag");
}

//Returns the country which the player should guess
function getCountryToGuess(){
	return CountrytoGuess;
}