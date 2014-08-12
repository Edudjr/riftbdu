#pragma strict

//Import necessary to use File Reader.
import System.IO;

//The name of the country that needs to be guessed.
private var CountrytoGuess : String; 
private var Score : int = 0;
private var EndGame : boolean = false;
private var gameIsReady : boolean = false;

//Display that shows the name of the country to guess
public var CountryText3D : TextMesh;
public var ScoreText3D : TextMesh;
public var GameState3D : TextMesh;

//Answer values
public var answerSpeed : int = 5;
private static var WrongAnswer : int = -1;
private static var RightAnswer : int = 2;

private static var lastSelected : String = null;


public var Flagboard : GameObject;

//Unecessary variable
//var CountriesSorted : int = 0;
var CurrentScore: int = 4;
//Get the Markers script.
var markers : Markers; 
var scoreScript : ScoreScript;

//This Variable will get all the settings that the player chose on the menu
var Settings : Menu;


//Variables which will define the file to get the name of the countries
var textFilePath : String;
//Number of lines for text file
var nLines : int;
//Array that will receive the name from all countries from a txt file.
var Countries : Array  = [];
var countriesFromDB : Array = [];

//Get PanelScript script
var panelScript : PanelScript;
var fadeInOut : SceneFadeInOut;

var FlagMovementSound : AudioSource;
var CorrectAnswerSound : AudioSource;
var WrongAnswerSound : AudioSource;
var TipsSound : AudioSource;


function Start () {
	
	
	setAudioClips();
	//ApplySettings();
	//Debug.Log(Settings.getMusicConfiguration);
	
	//Clear Country name
	SetCountryText3D("");
	SetScoreText3D(0);
	
	//Set the path of the txt file
	textFilePath = "Assets//Resources//Files//PresentationCountries.txt";
	
    getCountriesFromDatabase();
    yield;
	 
	//Get a random marker script
	markers = GameObject.FindObjectOfType(Markers);
	fadeInOut = GameObject.FindObjectOfType(SceneFadeInOut);
	scoreScript = GameObject.FindObjectOfType(ScoreScript);
	
	fadeInOut.FadeIn();
	
	//Get the number of lines on the txt and defines as limit to the array.
	nLines = GetNumberOfLines(textFilePath);
	for(var counter = 0; counter< nLines; counter++){
		Countries.push( ReadLine(textFilePath, counter) );
	}
	
	panelScript = GameObject.FindObjectOfType(PanelScript);
	//Get one country from the list
	CountrytoGuess = SortCountry();
	//Sets country to be displayed
	panelScript.setCountry(CountrytoGuess);
	//Loads first tip
	panelScript.loadTip();
}

function getCountriesFromDatabase(){
    //GET COUNTRIES FROM DATABASE
	var form = new WWWForm(); //here you create a new form connection  	
   	var url = "http://localhost:3000/country_test";
   	form.AddField( "game", "MyGameName" );//we are not using this line of code, but we need it to work
    var w = WWW(url, form); //here we create a var called 'w' and we sync with our URL and the form
    yield w; //we wait for the form to check the PHP file, so our game dont just hang
    if (w.error != null) {
        Debug.Log("error: "+w.error); //if there is an error, tell us
    } else {
        Debug.Log(w.data); //here we return the data our PHP told us
		//If it happened any error in the server, it will return "err"
		if(w.data=="err"){
			Debug.Log("CHECK YOUR INTERNET CONNECTION");
		}else{
			countriesFromDB = w.data.Split(','[0]);
		    w.Dispose(); 
		    //Debug.Log(countriesFromDB);
		    for(var i=0; i< countriesFromDB.length - 1; i++){
		    	Debug.Log(i+"="+countriesFromDB[i]);
		    }
		    gameIsReady = true;	
		}
    }
    
   	//Gives a random country name from a list to the variable "CountrytoGuess"
	//CountrytoGuess = SortCountry();
	Debug.Log("AQUI");
	//panelScript.loadTip();
}

function Update () {
	if(gameIsReady)
		level();
	else{
		//Debug.Log("NOT READY YET");
	}
}

function level(){
	//While there is still countries to be guessed
		if ( !EndGame ){
			//CheckEndGame();
			//set panel information
			//Debug.Log(CountrytoGuess);
			panelScript.setCountry(CountrytoGuess);
			
			//Change the flag displayed according to the country selected
			ChangeFlagtoCurrentSelected( markers.getActivated() );
			
			//the Var Activated will always receive the marker that is selected at the moment
			var activated = markers.getActivated();
			//If the country changes, we need to remake the flag animation
			if(lastSelected != activated){
				//Clean last loaded material
				Resources.UnloadUnusedAssets();
				lastSelected = activated;
				moveFlag();
				}//End of the checking if the country changed
			
		
			//The button "D" or "A" on the Joystick is pressed
			if( Input.GetButtonDown("Jump") ) {
				//If the name of the country asked is equal the name of the country selected at the moment that the player pressed "Fire", he scores!
				if ( CountrytoGuess == markers.getActivated() ) {
					setAnswer(CountrytoGuess, Color.green);
					Score+= CurrentScore;
					SetScoreText3D(Score);
					CountrytoGuess = SortCountry();
					//If answer is correct, we need to restart the tipNumber counter
					panelScript.resetTipNumber();
					panelScript.setCountry(CountrytoGuess);
					panelScript.loadTip();
					TipsSound.Play();
					SetCountryText3D("");
					CorrectAnswerSound.Play();
					//scoreScript.sendScore();
					}
				//if not, he gets Wrong and loses points
				else{
					//BEGIN: THIS SHOULD BE IN PANELSCRIPT
					if(panelScript.getTipNumber()==3)
						SetCountryText3D(CountrytoGuess);
					//END
					setAnswer("Wrong!", Color.red);
					//The quantity of points he will receive decreases if he misses the right country.
					if(CurrentScore >= 1){
						CurrentScore -=1;
						}
					//If the player couldn't guess the country even with its name, we give him/her a new country to guess.
					if (CurrentScore == 0 ){
						CountrytoGuess = SortCountry();
						panelScript.resetTipNumber();
						panelScript.setCountry(CountrytoGuess);
						SetCountryText3D("");
						}
				
					//The line above is commented to stop requesting data from the cloudant
					panelScript.loadTip();
					TipsSound.Play();
					SetScoreText3D(Score);
					//WrongAnswerSound.Play();
					}
				}//End of Button Fire Press
				
		}//End of if ( !IsGameOver() )
	else {
		//If the game is finished, we do not want the player to click on any country again and show a message of win.
		//setWin("You Win!!", Color.green);
		setFlagAlpha(0);
		resetFlag();
	}
	
	if ( Input.GetButtonDown("Fire3") ){
		Application.Quit();
	}
}

//Puts flag to initial position (center of the screen, small scale)
function resetFlag(){
	Flagboard.transform.position = Vector3(0,0,-4);
	Flagboard.transform.eulerAngles = Vector3(90,-180,0);
	Flagboard.transform.localScale = Vector3(.02, .02, .02);
	
}

function setFlagAlpha(alpha : float){
	Flagboard.transform.renderer.material.color.a = alpha;
}

//Does the animation for the Flag. The flag begins small, at the center of the screen
//and then the script moves it and makes it bigger, gradually, until it reaches the final position, which is next to the camera.
function moveFlag(){
	//Play the audio of the flag
	FlagMovementSound.Play();
	//FlagMovementSound.Play();
	resetFlag();
	setFlagAlpha(1);
	//Flagboard.transform.renderer.material.color.a = 1;
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

function setWin(str : String, Colour : Vector4){
	var theText = GameObject.Find("AnswerText").transform;
	theText.GetComponent(TextMesh).text = str;
	theText.GetComponent(TextMesh).color = Colour;
	while(theText.transform.position.z > -4){
		theText.Translate(0, 0, -answerSpeed * Time.deltaTime);
		yield;
	}
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
function SortCountryOld() : String {
	//Whenever a new country is sorted, 
	CurrentScore = 4;
	//Increase the number of countries sorted.
	//CountriesSorted ++;
    if(Countries.length > 0){	
    	var rand : int;
		var Country : String;
		rand = Random.Range(0, Countries.length);
 		Country = Countries[rand];
 		//SetCountryText3D(Country);
 		Countries.RemoveAt(rand);
 		return Country;
 	}
}

//Randomly selects a country from the countries list  
function SortCountry() : String {
	//Whenever a new country is sorted, 
	CurrentScore = 4;
	//Increase the number of countries sorted.
	//CountriesSorted ++;
    if(countriesFromDB.length > 0){	
    	var rand : int;
		var Country : String;
		rand = Random.Range(0, countriesFromDB.length);
 		Country = countriesFromDB[rand];
 		//SetCountryText3D(Country);
 		countriesFromDB.RemoveAt(rand);
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
	Flagboard.renderer.material.mainTexture = Resources.Load("Flags/All Flags/" + Countryname +"-flag");
}

//Returns the country which the player should guess
function getCountryToGuess(){
	return CountrytoGuess;
}

function CheckEndGame() : boolean{
  	//If the number of countries sorted is greater than the quantity of lines on the txt, the game is over.
	//if( CountriesSorted > nLines){
	if( countriesFromDB.length == 0){
		EndGame = true;
		setWin("You Win!!", Color.green);
		return true;
	}
	else{
		return false;
	}
}

//THIS METHOD SHOULD BE IN SCORESCRIPT
function getScore(){
	return Score;
}


function setAudioClips(){
	FlagMovementSound = gameObject.AddComponent("AudioSource");
	//This is the way we pass the value to the variable
	var FlagMovementAudioclip : AudioClip = Resources.Load("Sounds/Flag Movement/FlagMovement");
	FlagMovementSound.clip = FlagMovementAudioclip;

	CorrectAnswerSound = gameObject.AddComponent("AudioSource");
	var CorrectAnswerAudioclip : AudioClip = Resources.Load("Sounds/Correct Answer/Correct");
	CorrectAnswerSound.clip = CorrectAnswerAudioclip;
	
	WrongAnswerSound = gameObject.AddComponent("AudioSource");
	var WrongAnswerAudioclip : AudioClip = Resources.Load("Sounds/Wrong Answer/Wrong");
	WrongAnswerSound.clip = WrongAnswerAudioclip;
	
	TipsSound = gameObject.AddComponent("AudioSource");
	var TipsAudioclip : AudioClip = Resources.Load("Sounds/Tips/Tips2");
	TipsSound.clip = TipsAudioclip;
}


function ApplySettings(){
	if(Settings.getSoundConfiguration() == 0){
		FlagMovementSound.mute = true;
		CorrectAnswerSound.mute = true;
		WrongAnswerSound.mute = true;		
	}
	
	if(Settings.getMusicConfiguration() == 0){
	
	
	}
}