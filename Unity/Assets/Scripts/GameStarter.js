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
public var MyMusic : AudioClip [];

public var Flagboard : GameObject;


var CurrentScore: int = 4;
//Get scripts.
private var markers : Markers; 
private var scoreScript : ScoreScript;
private var playerVariables : PlayerVariables;
//This Variable will get all the settings that the player chose on the menu
var Settings : Menu;


var countriesFromDB : Array = [];

//Get PanelScript script
var panelScript : PanelScript;
var fadeInOut : SceneFadeInOut;

var FlagMovementSound : AudioSource;
var CorrectAnswerSound : AudioSource;
var WrongAnswerSound : AudioSource;
var TipsSound : AudioSource;
var Music : AudioSource;
private var timer : float = 0;

function Start () {
	
	
	setAudioClips();
	
	//Clear Country name
	SetCountryText3D("");
	SetScoreText3D(0);
	//getCountriesFromFile();
    //getCountriesFromDatabase();
    //yield;
	 
	//Get a random marker script
	markers = GameObject.FindObjectOfType(Markers);
	fadeInOut = GameObject.FindObjectOfType(SceneFadeInOut);
	scoreScript = GameObject.FindObjectOfType(ScoreScript);
	panelScript = GameObject.FindObjectOfType(PanelScript);
	playerVariables = GameObject.FindObjectOfType(PlayerVariables);
	
	
	setMusicAndSFXOptions();
	//getCountriesFromFile();
    getCountriesFromDatabase();
    yield;
	
	//Fades screen
	fadeInOut.FadeIn();
	
	//Get one country from the list
}


function getCountriesFromDatabase(){
	var continent = playerVariables.getContinent();
	if(continent==null)
		continent="NorthAmerica";
	Debug.Log(continent);
	
	var okay = false;
	var url = "http://geovr.mybluemix.net/getcountries?continent="+continent;
	
	while(!okay){
		// Start a download of the given URL
		var www : WWW = new WWW (url);
		// Wait for download to complete
		yield www;
		
	    if (www.error != null) {
			//IF SERVER IS NOT WORKING
			Debug.Log("error: "+www.error); //if there is an error, tell us
	    } else {
			//If it happened any error in the server, it will return "err"
			if(www.data=="err"){
				Debug.Log("SERVER IS WORKING, BUT COULDNT CONNECT TO DATABASE");
			}else{
				//Debug.Log(w.data); //here we return the data our PHP told us
				//Separates the string by "," and creates an array; The last position of the array is empty
				countriesFromDB = www.data.Split(','[0]);
			    www.Dispose(); 

				//If content is loaded successfuly, then we know that game is ready to run
			    gameIsReady = true;	
			    okay = true;
			    //Get one country from the list
				//CountrytoGuess = SortCountryOld();
				CountrytoGuess = SortCountry();
				//Sets country to be displayed
				panelScript.setCountry(CountrytoGuess);
				//Loads first tip
				panelScript.loadTip();
			    
			}
	    }
	}
    
}

function Update () {
	//If game is ready to run, load the level
	if(gameIsReady){	
		level();
	}else{
		//Debug.Log("NOT READY YET");
		//Debug.Log(playerVariables.getOption());
	}
}

function level(){
	//While there is still count
	
		if ( !CheckEndGame() ){
		
			timer += Time.deltaTime;
		
		
			if( timer >= Music.clip.length ){
				SetRandomMusic();
				}
				
			//set panel information
			//Debug.Log("SET COUNTRY - "+CountrytoGuess);
			panelScript.setCountry(CountrytoGuess);
			
			//Change the flag displayed according to the country selected
			ChangeFlagtoCurrentSelected( markers.getActivated() );
			
			//the Var Activated will always receive the marker that is selected at the moment
			var activated = markers.getActivated();
			//If the country changes, run flag animation for new country
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
					//CountrytoGuess = SortCountryOld();
					CountrytoGuess = SortCountry();
					//If answer is correct, we need to restart the tipNumber counter
					panelScript.resetTipNumber();
					panelScript.setCountry(CountrytoGuess);
					panelScript.loadTip();
					
					SetCountryText3D("");
					CorrectAnswerSound.Play();
					//scoreScript.sendScore();
					GameObject.Find("EarthCountry").renderer.material = Resources.Load("CountriesMaterials/TransparentCountry");
				}
				//if not, he gets Wrong and loses points
				else{
					//BEGIN: THIS SHOULD BE IN PANELSCRIPT
					if(panelScript.getTipNumber()==3){
						SetCountryText3D(CountrytoGuess);
						GameObject.Find("EarthCountry").renderer.material = Resources.Load("CountriesMaterials/"+CountrytoGuess);
						GameObject.Find("EarthCountry").renderer.material.color = Color.yellow;
						GameObject.Find("EarthCountry").renderer.material.color.a = 1;
					}//END
					else{
						//TipsSound.Play();
					}
					setAnswer("Wrong!", Color.red);
					//The quantity of points he will receive decreases if he misses the right country.
					if(CurrentScore >= 1){
						CurrentScore -=1;
					}
					panelScript.loadTip();
					WrongAnswerSound.Play();
					SetScoreText3D(Score);
				}
			}//End of Button Fire Press
				
	}//End of if ( !IsGameOver() )
	else {
		//If the game is finished, we do not want the player to click on any country again
		//Debug.Log("CHECKENDGAME == TRUE");
		waitAndLeave();
		setFlagAlpha(0);
		resetFlag();
	}
	
	if(Input.GetKeyDown(KeyCode.Escape)){
		Application.Quit();
	}
	
}

function waitAndLeave(){
	yield WaitForSeconds(2);
	fadeInOut.FadeOutLoad("Menu");
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


//Randomly selects a country from the countries list  
function SortCountry() : String {
	//Whenever a new country is sorted, 
	CurrentScore = 4;
    if(countriesFromDB.length > 0){	
    	var rand : int;
		var Country : String;
		rand = Random.Range(0, countriesFromDB.length-1);
 		Country = countriesFromDB[rand];
 		countriesFromDB.RemoveAt(rand);
 		//Debug.Log("rand: "+rand);
 		//Debug.Log("country: "+Country);
 		//Debug.Log(countriesFromDB);
 		return Country;
 	}
 	return "err";
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
	var TipsAudioclip : AudioClip = Resources.Load("Sounds/Tips/Tip");
	TipsSound.clip = TipsAudioclip;
	
	
	Music = gameObject.AddComponent("AudioSource");
	Music.clip = MyMusic[Random.Range(0, MyMusic.length)];
	timer = 0;
	Music.Play();
	
}

function SetRandomMusic(){
	Music = gameObject.AddComponent("AudioSource");
	Music.clip = MyMusic[Random.Range(0, MyMusic.length)];
	Music.Play();
	timer = 0;
	//Debug.Log("Entrei no set");
}

function setMusicAndSFXOptions(){
	if(playerVariables.getSFX()){
		FlagMovementSound.mute = false;
		CorrectAnswerSound.mute = false;
		WrongAnswerSound.mute = false;
		TipsSound.mute = false;
	}else {
		FlagMovementSound.mute = true;
		CorrectAnswerSound.mute = true;
		WrongAnswerSound.mute = true;
		TipsSound.mute = true;
	}
	
	
	
	if( playerVariables.getMusic()) {
		Music.mute = false;

	
	}else {
		Music.mute = true;

	}

}
