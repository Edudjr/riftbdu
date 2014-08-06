#pragma strict

var TextDisplayer1 : Transform ;
var TextDisplayer2 : Transform ;
var ImageDisplayer1 : Transform;
var ImageDisplayer2 : Transform;
var ImageDisplayer3 : Transform;


var soundtrack : AudioSource; 
var TutorialPart : int;

var textFilePath : String;
var nLines : int;
var receiver : String;
var Writer : String;

function Start () {
	

	TutorialPart = 0;
	textFilePath = "Assets//Resources//Tutorial//Tutorial.txt";
	nLines = GetNumberOfLines(textFilePath);
	
	soundtrack = gameObject.AddComponent("AudioSource");
	var soundtrackAudioclip  : AudioClip = Resources.Load("Sounds/jlbrock44_-_Rise_Up_To_Heaven_(Instrumental)");
	soundtrack.clip = soundtrackAudioclip;
	

	
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

}
function Update () {
	if(TutorialPart <= nLines){
		if (Input.GetButtonDown("Jump")) {
			TutorialPart= TutorialPart + 2;
				
			TextChanger();
			ImageChanger();
			
		}
	
		if (Input.GetButtonDown("Fire1") ) {
			TutorialPart = TutorialPart - 2;
		
			TextChanger();
			ImageChanger();	
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

function ImageChanger(){
	if(TutorialPart == 2){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/TutorialA");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 4){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial 1");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
		}
		if(TutorialPart == 6){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial 2");
		}
		if(TutorialPart == 8){
			ImageDisplayer1.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
			ImageDisplayer2.transform.renderer.material = Resources.Load("Tutorial/Tutorial 3");
			ImageDisplayer3.transform.renderer.material = Resources.Load("Tutorial/Tutorial Invisible");
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