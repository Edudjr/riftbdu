#pragma strict

var TextDisplayer1 : Transform ;
var TextDisplayer2 : Transform ;
var ImageDisplayer1 : Transform;
var ImageDisplayer2 : Transform;
var ImageDisplayer3 : Transform;
var Earth : Transform;
var Panel : Transform;

var fadeInOut : SceneFadeInOut;
private var playerVariables : PlayerVariables;

public var Flagboard : GameObject;


private static var lastSelected : String = null;

var soundtrack : AudioSource; 
var TutorialPart : int;

var textFilePath : String;
var nLines : int;
var receiver : String;
var Writer : String;


var markers : Markers; 

function Start () {
	fadeInOut = GameObject.FindObjectOfType(SceneFadeInOut);
	Earth = GameObject.Find("Earth").transform;
	
	
	
	playerVariables = GameObject.FindObjectOfType(PlayerVariables);
	markers = GameObject.FindObjectOfType(Markers);

	TutorialPart = 0;
	textFilePath = "Assets//Resources//Tutorial//Tutorial.txt";
	nLines = GetNumberOfLines(textFilePath);
	
	setAudio();
	ApplySettings();

	Panel = GameObject.Find("Panel").transform;
	Panel.active = false;
	TextDisplayer1 = GameObject.Find("Text Displayer1").transform;
	TextDisplayer2 = GameObject.Find("Text Displayer2").transform;
	
	ImageDisplayer1 =  GameObject.Find("ImageDisplayer1").transform;
	ImageDisplayer2 =  GameObject.Find("ImageDisplayer2").transform;
	ImageDisplayer3 =  GameObject.Find("ImageDisplayer3").transform;
	
		
	receiver = ReadLine(textFilePath, TutorialPart);
	Writer = getLineBreaker(receiver);
	TextDisplayer1.GetComponent(TextMesh).text = Writer;
		
	receiver = ReadLine(textFilePath, TutorialPart+1);
	Writer = getLineBreaker(receiver);
	TextDisplayer2.GetComponent(TextMesh).text = Writer;

	soundtrack.Play();
	fadeInOut.FadeIn();
	Earth.active = false;

}
function Update () {


	if(TutorialPart < nLines-1){
		TextChanger();
		ImageChanger();
		if (Input.GetButtonDown("Jump")) {
			TutorialPart= TutorialPart + 2;
				
			
			
		}
	
		if (Input.GetButtonDown("Fire1") ) {
			TutorialPart = TutorialPart - 2;
		
	
		}
	
	}
	else{
		fadeInOut.FadeOutLoad("Menu");
	}
	
	if(Input.GetKeyDown(KeyCode.Escape)){
		Application.Quit();
	}
	
}


function ReadLine(filePath : String, nLine : int) : String{
	var reader = new StreamReader(File.Open(filePath, FileMode.Open)) ;
	var line : String = " ";
	var n : int = 0;
	while (n++ <= nLine)
	    line = reader.ReadLine();
	reader.Close();
	return line;
}

function getLineBreaker(CurrentString : String) : String{
	var Test : String = "";
	for (var i : int = 0; i<CurrentString.Length; i++){
			if ( (CurrentString[i] == "\\") && (CurrentString[i+1] == "n") ){
				Test = Test + "\n" + CurrentString[i+2];
				i+=2;
			}
			else {
				Test = Test + CurrentString[i];
			}
		}
		return Test;
}

function GetNumberOfLines(filePath : String) : int{
	var reader = new StreamReader(File.Open(filePath, FileMode.Open));
	var number = reader.ReadToEnd().Split("\n"[0]).Length;
	reader.Close();
	return number;
}

function TextChanger(){
		receiver = ReadLine(textFilePath, TutorialPart);
		Writer = getLineBreaker(receiver);
		TextDisplayer1.GetComponent(TextMesh).text = Writer;
		
		receiver = ReadLine(textFilePath, TutorialPart+1);
		Writer = getLineBreaker(receiver);
		TextDisplayer2.GetComponent(TextMesh).text = Writer;
	

}

function moveFlag(){
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

function ChangeFlagtoCurrentSelected(Countryname : String){
	Flagboard.renderer.material.mainTexture = Resources.Load("Flags/All Flags/" + Countryname +"-flag");
}

function setFlagAlpha(alpha : float){
	Flagboard.transform.renderer.material.color.a = alpha;
}

function ApplySettings(){
	if(playerVariables.getSFX()){
		
	}else {

	}
	
	
	
	if( playerVariables.getMusic()) {
		soundtrack.mute = false;

	
	}else {
		soundtrack.mute = true;

	}

}

function setAudio(){
	soundtrack = gameObject.AddComponent("AudioSource");
	var soundtrackAudioclip  : AudioClip = Resources.Load("Sounds/jlbrock44_-_Rise_Up_To_Heaven_(Instrumental)");
	soundtrack.clip = soundtrackAudioclip;

}

//Puts flag to initial position (center of the screen, small scale)
function resetFlag(){
	Flagboard.transform.position = Vector3(0,0,-4);
	Flagboard.transform.eulerAngles = Vector3(90,-180,0);
	Flagboard.transform.localScale = Vector3(.02, .02, .02);
	
}

function ImageChanger(){
	var activated;
	if(TutorialPart == 0){//Welcome to the game
			
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
		}
	if(TutorialPart == 2){//Show controlers
			
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Controllers");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 4){//Teaching
		
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			
			//TURN OFF EARTH AND PANEL
			if (Earth.active == true){
				Earth.active = false;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
		}
		if(TutorialPart == 6){//Show the Earth and ask to move analog
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			if (Earth.active == false){
				Earth.active = true;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
			
				
			
			if(Input.GetAxisRaw("LeftAnalog_Vertical") > 0.3 || Input.GetAxisRaw("LeftAnalog_Vertical")< -0.3
				|| Input.GetAxisRaw("LeftAnalog_Horizontal") > 0.3  || Input.GetAxisRaw("LeftAnalog_Horizontal")< -0.3 ){
				TextDisplayer1.GetComponent(TextMesh).text = "";
				TextDisplayer2.GetComponent(TextMesh).text = "";
				}


		}
		if(TutorialPart == 8){//Show flags
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial 3");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			if (Earth.active == false){
				Earth.active = true;
			}
			if (Flagboard.active == false){
				Flagboard.active = true;
			}
			
			//Change the flag displayed according to the country selected
			ChangeFlagtoCurrentSelected( markers.getActivated() );
			
			//the Var Activated will always receive the marker that is selected at the moment
			activated = markers.getActivated();
			//If the country changes, we need to remake the flag animation
			if(lastSelected != activated){
				//Clean last loaded material
				Resources.UnloadUnusedAssets();
				lastSelected = activated;
				moveFlag();
				}//End of the checking if the country changed
			
		}
		if(TutorialPart == 10){//Zoom in and out
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			if (Earth.active == false){
				Earth.active = true;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
			//Turn OFF Panel
			if (Panel.active == true){
				Flagboard.active = false;
			}
			
			//Change the flag displayed according to the country selected
			ChangeFlagtoCurrentSelected( markers.getActivated() );
			
			//the Var Activated will always receive the marker that is selected at the moment
			activated = markers.getActivated();
			//If the country changes, we need to remake the flag animation
			if(lastSelected != activated){
				//Clean last loaded material
				Resources.UnloadUnusedAssets();
				lastSelected = activated;
				moveFlag();
				}//End of the checking if the country changed
			
			
			
			
		}
		if(TutorialPart == 12){//How game works
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			//TURN OFF EARTH AND PANEL
			if (Earth.active == true){
				Earth.active = false;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
			if (Panel.active == true){
				Panel.active = false;
			}
			
		}
		if(TutorialPart == 14){//Panel Tip
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			if (Panel.active == false){
				Panel.active = true;
			}
			
			if (Earth.active == false){
				Earth.active = true;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
			
	
			setAnswer("", Color.red);
		}
		if(TutorialPart == 16){//Wrong
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 7");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		//	ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			if (Panel.active == false){
				Panel.active = true;
			}
			
			if (Earth.active == false){
				Earth.active = true;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
			
			setAnswer("Wrong!", Color.red);
			setCountryName("");
		
		}
		if(TutorialPart == 18){//Name and yellow
			//ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 1");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		//	ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			if (Panel.active == false){
				Panel.active = true;
			}
			
			if (Earth.active == false){
				Earth.active = true;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
			
			
			setAnswer("", Color.red);
			setCountryName("Brazil");
		
			
			
		}
		if(TutorialPart == 20){
		//	ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 1");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			if (Panel.active == false){
				Panel.active = true;
			}
			
			if (Earth.active == false){
				Earth.active = true;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
			
			
			setAnswer("Canada!", Color.green);
			setCountryName("");
		}	
		if(TutorialPart == 22){
		//	ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 1");
			//ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			//ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			if (Panel.active == false){
				Panel.active = true;
			}
			
			if (Earth.active == false){
				Earth.active = true;
			}
			if (Flagboard.active == true){
				Flagboard.active = false;
			}
			
			
			setAnswer("Have a good game!", Color.green);
			setCountryName("");
		}	
		

}



function setAnswer(str : String, Colour : Vector4){
	var theText = GameObject.Find("AnswerText").transform;
	theText.GetComponent(TextMesh).text = str;
	theText.GetComponent(TextMesh).color = Colour;

	while(theText.transform.position.z > -5){
		theText.Translate(0, 0, -5 * Time.deltaTime);
		yield;
	}


	
	theText.position = Vector3(0,0,-5);
}

function setCountryName(str : String){
	var theText = GameObject.Find("CountryDisplay").transform;
	theText.GetComponent(TextMesh).text = str;
	
}