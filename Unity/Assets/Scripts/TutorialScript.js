#pragma strict

var TextDisplayer1 : Transform ;
var TextDisplayer2 : Transform ;
var ImageDisplayer1 : Transform;
var ImageDisplayer2 : Transform;
var ImageDisplayer3 : Transform;
var Earth : Transform;
var Panel : Transform;

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
	
	Earth = GameObject.Find("Earth").transform;
	
		
	markers = GameObject.FindObjectOfType(Markers);

	TutorialPart = 0;
	textFilePath = "Assets//Resources//Tutorial//Tutorial.txt";
	nLines = GetNumberOfLines(textFilePath);
	
	soundtrack = gameObject.AddComponent("AudioSource");
	var soundtrackAudioclip  : AudioClip = Resources.Load("Sounds/jlbrock44_-_Rise_Up_To_Heaven_(Instrumental)");
	soundtrack.clip = soundtrackAudioclip;
	

	Panel = GameObject.Find("Panel").transform;
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
	
	Earth.active = false;

}
function Update () {

	
TextChanger();
			ImageChanger();


	if(TutorialPart <= nLines){
		if (Input.GetButtonDown("Jump")) {
			TutorialPart= TutorialPart + 2;
				
			
			
		}
	
		if (Input.GetButtonDown("Fire1") ) {
			TutorialPart = TutorialPart - 2;
		
	
		}
	
	}
	else{
		Application.LoadLevel("DiscoveryMode");
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

//Puts flag to initial position (center of the screen, small scale)
function resetFlag(){
	Flagboard.transform.position = Vector3(0,0,-4);
	Flagboard.transform.eulerAngles = Vector3(90,-180,0);
	Flagboard.transform.localScale = Vector3(.02, .02, .02);
	
}

function ImageChanger(){
	if(TutorialPart == 2){
			
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial 1");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 4){
		
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 6){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			
			if (Earth.active == false){
				Earth.active = true;
			}
			
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
				
			
			if(Input.GetAxisRaw("LeftAnalog_Vertical") > 0.3 || Input.GetAxisRaw("LeftAnalog_Vertical")< -0.3
				|| Input.GetAxisRaw("LeftAnalog_Horizontal") > 0.3  || Input.GetAxisRaw("LeftAnalog_Horizontal")< -0.3 ){
				TextDisplayer1.GetComponent(TextMesh).text = "";
				TextDisplayer2.GetComponent(TextMesh).text = "";
				}


		}
		if(TutorialPart == 8){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial 3");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			Earth.active = false;
			
		}
		if(TutorialPart == 10){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 4");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 12){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial 5");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial 6");
		}
		if(TutorialPart == 14){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 16){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 7");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 18){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 1");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 20){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 1");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}	

}