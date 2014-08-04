#pragma strict

private var option : int = 0;
private var MaxPosition : int = 3;
private var MinPosition : int = 1;
private var fadeInOut : SceneFadeInOut;
private var lockButton : boolean = false;

function Start () {
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
			transform.Find("StartText").GetComponent(TextMesh).color = Color.green;
			break;
		case 2:
			transform.Find("DiscoveryText").GetComponent(TextMesh).color = Color.green;
			break;
		case 3:
			transform.Find("OptionsText").GetComponent(TextMesh).color = Color.green;
			break;
		case 4:
			transform.Find("Sounds").GetComponent(TextMesh).color = Color.green;
			break;
		case 5:
			transform.Find("Music").GetComponent(TextMesh).color = Color.green;
			break;
		case 6:
			transform.Find("Back").GetComponent(TextMesh).color = Color.green;
			break;
	}
	
	// -------------CONTROLLERS---------------
	getChange();
	
	//What kind of game should be loaded now: 
	if(Input.GetButtonDown("Jump")) {
		switch(option){
		case 1: 
			fadeInOut.FadeOutLoad("GameMode");
			break;
		case 2:
			fadeInOut.FadeOutLoad("DiscoveryMode");
			break;
		case 3:
			MaxPosition = 6;
			MinPosition = 4;
			transform.Find("Music").renderer.enabled = true;
			transform.Find("Sounds").renderer.enabled = true;
			transform.Find("Back").renderer.enabled = true;
			transform.Find("SettingsMenu").renderer.enabled = true;
			
			break;
		case 4:
			MaxPosition = 6;
			MinPosition = 4;
			break;
		case 5:
			MaxPosition = 6;
			MinPosition = 4;
			break;
		case 6:
			MaxPosition = 3;
			MinPosition = 1;
			transform.Find("Music").renderer.enabled = false;
			transform.Find("Sounds").renderer.enabled = false;
			transform.Find("Back").renderer.enabled = false;
			transform.Find("SettingsMenu").renderer.enabled = false;
			break;
		}

	}
	
	
	
}

function getChange(){
	//Debug.Log(lockButton);
	if(!lockButton){
		if((  Input.GetAxisRaw("LeftAnalog_Vertical")>0.5 ) || (Input.GetKeyDown(KeyCode.W))){
			lockButton = true;
			option--;
			yield WaitForSeconds(0.3);
		}else if(( Input.GetAxisRaw("LeftAnalog_Vertical")<-0.5) || (Input.GetKeyDown(KeyCode.S))){	
			lockButton = true;
			option++;
			yield WaitForSeconds(0.3);
		}
		//Debug.Log('inside '+lockButton);
		lockButton = false;
	}
	
	//Make sure that option is available
	if(option > MaxPosition){
		option=MaxPosition;
	}else if(option < MinPosition){
		option=MinPosition;
	}
	//End of visual moviment menu
}