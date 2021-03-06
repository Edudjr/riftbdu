﻿#pragma strict

private var option : int = 0;
private var MaxPosition : int = 3;
private var MinPosition : int = 1;
private var fadeInOut : SceneFadeInOut;
private var lockButton : boolean = false;
private var soundBool : int = 1;
private var musicBool : int = 1;
private var playerVariables : PlayerVariables;

public var Music : AudioSource; 
public var MoveSound : AudioSource;
public var SelectSound : AudioSource;


function Start () {

	setAudioClips();

	fadeInOut = GameObject.FindObjectOfType(SceneFadeInOut);
	playerVariables = GameObject.FindObjectOfType(PlayerVariables);
	playerVariables.setSFX(1);
	playerVariables.setMusic(1);
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
			transform.Find("TutorialText").GetComponent(TextMesh).color = Color.green;
			break;
		case 3:
			transform.Find("SettingsText").GetComponent(TextMesh).color = Color.green;
			break;
		case 4:
			transform.Find("Sounds").GetComponent(TextMesh).color = Color.green;
			break;
		case 5:
			transform.Find("Music").GetComponent(TextMesh).color = Color.green;
			break;
		case 6:
			transform.Find("Back Settings").GetComponent(TextMesh).color = Color.green;
			break;
		case 7:
			GameObject.Find("OptionAll").GetComponent(TextMesh).color = Color.green;
			break;
		case 8:
			GameObject.Find("OptionAsia").GetComponent(TextMesh).color = Color.green;
			break;
		case 9:
			GameObject.Find("OptionAfrica").GetComponent(TextMesh).color = Color.green;
			break;
		case 10:
			GameObject.Find("OptionEurope").GetComponent(TextMesh).color = Color.green;
			break;
		case 11:
			GameObject.Find("OptionNorthAmerica").GetComponent(TextMesh).color = Color.green;
			break;
		case 12:
			GameObject.Find("OptionOceania").GetComponent(TextMesh).color = Color.green;
			break;
		case 13:
			GameObject.Find("OptionSouthAmerica").GetComponent(TextMesh).color = Color.green;
			break;
		case 14:
			transform.Find("Back").GetComponent(TextMesh).color = Color.green;
			break;
	}
	
	// -------------CONTROLLERS---------------
	getChange();
	
	//What kind of game should be loaded now: 
	if(Input.GetButtonDown("Jump")) {
		SelectSound.Play();
		playerVariables.setOption(option);
		switch(option){
			case 1:
				MaxPosition = 14;
				MinPosition = 7;
				GameObject.Find("OptionNorthAmerica").renderer.enabled = true;
				GameObject.Find("OptionAll").renderer.enabled = true;
				GameObject.Find("OptionAsia").renderer.enabled = true;
				GameObject.Find("OptionAfrica").renderer.enabled = true;
				GameObject.Find("OptionOceania").renderer.enabled = true;
				GameObject.Find("OptionEurope").renderer.enabled = true;
				GameObject.Find("OptionSouthAmerica").renderer.enabled = true;
				transform.Find("Back").renderer.enabled = true;
				break;
			case 2:
				fadeInOut.FadeOutLoad("Tutorial");
				
				break;
			case 3:
				MaxPosition = 6;
				MinPosition = 4;
				transform.Find("Sounds").renderer.enabled = true;
				transform.Find("Sounds").GetChild(0).renderer.enabled = true;
				transform.Find("Music").renderer.enabled = true;
				transform.Find("Music").GetChild(0).renderer.enabled = true;
				transform.Find("Back Settings").renderer.enabled = true;
				transform.Find("SettingsMenu").renderer.enabled = true;
				
				break;
			case 4:
				if(soundBool == 1 ){
					transform.Find("Sounds").GetChild(0).GetComponent(TextMesh).text = "OFF";
					transform.Find("Sounds").GetChild(0).GetComponent(TextMesh).color  = Color.red;
					soundBool = 0;
					MoveSound.mute = true;
					SelectSound.mute = true;
					playerVariables.setSFX(0);
				}
				else {
					transform.Find("Sounds").GetChild(0).GetComponent(TextMesh).text = "ON";
					transform.Find("Sounds").GetChild(0).GetComponent(TextMesh).color  = Color.green;
					soundBool = 1;
					MoveSound.mute = false;
					SelectSound.mute = false;
					playerVariables.setSFX(1);
				}
				break;
			case 5:
				if(musicBool == 1 ){
					transform.Find("Music").GetChild(0).GetComponent(TextMesh).text = "OFF";
					transform.Find("Music").GetChild(0).GetComponent(TextMesh).color  = Color.red;
					Music.mute = true;
					playerVariables.setMusic(0);
					musicBool = 0;
				}
				else {
					transform.Find("Music").GetChild(0).GetComponent(TextMesh).text = "ON";
					transform.Find("Music").GetChild(0).GetComponent(TextMesh).color  = Color.green;
					Music.mute = false;
					playerVariables.setMusic(1);
					musicBool = 1;
				}
				break;
			case 6:
				MaxPosition = 3;
				MinPosition = 1;
				transform.Find("Music").renderer.enabled = false;
				transform.Find("Music").GetChild(0).renderer.enabled = false;
				transform.Find("Sounds").renderer.enabled = false;
				transform.Find("Sounds").GetChild(0).renderer.enabled = false;
				transform.Find("Back Settings").renderer.enabled = false;
				transform.Find("SettingsMenu").renderer.enabled = false;
				break;
			case 7:
				playerVariables.setContinent("All");
				fadeInOut.FadeOutLoad("DiscoveryMode");
				break;
			case 8:
				playerVariables.setContinent("Asia");
				fadeInOut.FadeOutLoad("DiscoveryMode");
				break;
			case 9:
				playerVariables.setContinent("Africa");
				fadeInOut.FadeOutLoad("DiscoveryMode");
				break;
			case 10:
				playerVariables.setContinent("Europe");
				fadeInOut.FadeOutLoad("DiscoveryMode");
				break;
			case 11:
				playerVariables.setContinent("NorthAmerica");
				fadeInOut.FadeOutLoad("DiscoveryMode");
				break;
			case 12:
				playerVariables.setContinent("Oceania");
				fadeInOut.FadeOutLoad("DiscoveryMode");
				break;
			case 13:
				playerVariables.setContinent("SouthAmerica");
				fadeInOut.FadeOutLoad("DiscoveryMode");
				break;
			case 14:
				MaxPosition = 3;
				MinPosition = 1;
				GameObject.Find("OptionEurope").renderer.enabled = false;
				GameObject.Find("OptionNorthAmerica").renderer.enabled = false;
				GameObject.Find("OptionSouthAmerica").renderer.enabled = false;
				GameObject.Find("OptionAll").renderer.enabled = false;
				GameObject.Find("OptionAsia").renderer.enabled = false;
				GameObject.Find("OptionAfrica").renderer.enabled = false;
				GameObject.Find("OptionOceania").renderer.enabled = false;
				transform.Find("Back").renderer.enabled = false;
				break;
		}

	}
	
	if(Input.GetKeyDown(KeyCode.Escape)){
		Application.Quit();
	}
	
	
}

function getChange(){
	
	if(!lockButton){
		if((  Input.GetAxisRaw("LeftAnalog_Vertical")>0.5 ) || (Input.GetKeyDown(KeyCode.UpArrow))){
			lockButton = true;
			option--;
			MoveSound.Play();
			yield WaitForSeconds(0.3);
		}else if(( Input.GetAxisRaw("LeftAnalog_Vertical")<-0.5) || (Input.GetKeyDown(KeyCode.DownArrow))){	
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
	//End of visual movement menu
	
}

public function getOption(){
	return option;
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
