#pragma strict

private var option : int = 0;
private var MaxPosition : int = 2;
private var MinPosition : int = 1;
private var fadeInOut : SceneFadeInOut;
private var lockButton : boolean = false;
private var soundBool : int = 1;
private var musicBool : int = 1;

public var Music : AudioSource; 
public var MoveSound : AudioSource;
public var SelectSound : AudioSource;

function Start () {

	setAudioClips();

	fadeInOut = GameObject.FindObjectOfType(SceneFadeInOut);
	//When start, fade the screen from black to transparent
	fadeInOut.FadeIn();
	option = 0;
	
	
	//Set all children's color to white
	for (var child : Transform in transform) {
    	child.GetComponent(TextMesh).color = Color.white;
	}
}

function Update () {
	
		for (var child : Transform in transform) {
    	child.GetComponent(TextMesh).color = Color.white;
	}
	
	//Look for selected option and turn it green
	switch(option){
		case 1:
			transform.Find("DiscoveryText").GetComponent(TextMesh).color = Color.green;
			break;
		case 2:
			transform.Find("SettingsText").GetComponent(TextMesh).color = Color.green;
			break;
		case 3:
			transform.Find("Sounds").GetComponent(TextMesh).color = Color.green;
			break;
		case 4:
			transform.Find("Music").GetComponent(TextMesh).color = Color.green;
			break;
		case 5:
			transform.Find("Back").GetComponent(TextMesh).color = Color.green;
			break;
	}
	
	// -------------CONTROLLERS---------------
	getChange();
	
	//What kind of game should be loaded now: 
	if(Input.GetButtonDown("Jump")) {
		SelectSound.Play();
		switch(option){
		case 1:
			fadeInOut.FadeOutLoad("DiscoveryMode");
			break;
		case 2:
			MaxPosition = 5;
			MinPosition = 3;
			transform.Find("Sounds").renderer.enabled = true;
			transform.Find("Sounds").GetChild(0).renderer.enabled = true;
			transform.Find("Music").renderer.enabled = true;
			transform.Find("Music").GetChild(0).renderer.enabled = true;
			transform.Find("Back").renderer.enabled = true;
			transform.Find("SettingsMenu").renderer.enabled = true;
			
			break;
		case 3:
			if(soundBool == 1 ){
				transform.GetChild(6).GetChild(0).GetComponent(TextMesh).text = "OFF";
				transform.GetChild(6).GetChild(0).GetComponent(TextMesh).color  = Color.red;
				soundBool = 0;
				MoveSound.mute = true;
				SelectSound.mute = true;
			}
			else {
				transform.GetChild(6).GetChild(0).GetComponent(TextMesh).text = "ON";
				transform.GetChild(6).GetChild(0).GetComponent(TextMesh).color  = Color.green;
				soundBool = 1;
				MoveSound.mute = false;
				SelectSound.mute = false;
			}
			break;
		case 4:
			if(musicBool == 1 ){
				transform.GetChild(3).GetChild(0).GetComponent(TextMesh).text = "OFF";
				transform.GetChild(3).GetChild(0).GetComponent(TextMesh).color  = Color.red;
				Music.mute = true;
				
				musicBool = 0;
			}
			else {
				transform.GetChild(3).GetChild(0).GetComponent(TextMesh).text = "ON";
				transform.GetChild(3).GetChild(0).GetComponent(TextMesh).color  = Color.green;
				Music.mute = false;
				musicBool = 1;
			}
			break;
		case 5:
			MaxPosition = 2;
			MinPosition = 1;
			transform.Find("Music").renderer.enabled = false;
			transform.Find("Music").GetChild(0).renderer.enabled = false;
			transform.Find("Sounds").renderer.enabled = false;
			transform.Find("Sounds").GetChild(0).renderer.enabled = false;
			transform.Find("Back").renderer.enabled = false;
			transform.Find("SettingsMenu").renderer.enabled = false;
			
			break;
		}

	}
	
	
	
}

function getChange(){
	
	if(!lockButton){
		if((  Input.GetAxisRaw("LeftAnalog_Vertical")>0.5 ) || (Input.GetKeyDown(KeyCode.W))){
			lockButton = true;
			option--;
			MoveSound.Play();
			yield WaitForSeconds(0.3);
		}else if(( Input.GetAxisRaw("LeftAnalog_Vertical")<-0.5) || (Input.GetKeyDown(KeyCode.S))){	
			lockButton = true;
			option++;
			MoveSound.Play();
			yield WaitForSeconds(0.3);
		}
		//Debug.Log('inside '+lockButton);
		lockButton = false;
	}
	
	//Make sure that option is available
	if(option >= MaxPosition){
		option=MaxPosition;
	}else if(option <= MinPosition){
		option=MinPosition;
	}
	//End of visual moviment menu
	
}

public function getSoundConfiguration() : int{
	return soundBool;
}

public function getMusicConfiguration() : int{
	return musicBool;
}

function setAudioClips(){
//Define the file source of music.
	Music = gameObject.AddComponent("AudioSource");
	//This is the way we pass the value to the variable
	var MusicAudioclip : AudioClip = Resources.Load("Sounds/Menu/Music/MusicMenu");
	Music.clip = MusicAudioclip;
	//Play the music
	Music.Play();
	

	MoveSound = gameObject.AddComponent("AudioSource");
	var MoveAudioclip : AudioClip = Resources.Load("Sounds/Menu/SFX/Move");
	MoveSound.clip = MoveAudioclip;
	
	SelectSound = gameObject.AddComponent("AudioSource");
	var SelectionAudioclip : AudioClip = Resources.Load("Sounds/Menu/SFX/Selecting");
	SelectSound.clip = SelectionAudioclip;
	
	//END OF MUSIC CONFIGURATION ----------------------------------------------------------------------
}
