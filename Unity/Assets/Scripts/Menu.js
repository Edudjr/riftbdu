#pragma strict

private var option : int = 0;
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
	
	
	//Look for selected option and turn it green
	switch(option){
		case 1: 
			transform.Find("StartText").GetComponent(TextMesh).color = Color.green;
			transform.Find("DiscoveryText").GetComponent(TextMesh).color = Color.white;
			transform.Find("OptionsText").GetComponent(TextMesh).color = Color.white;
			break;
		case 2:
			transform.Find("DiscoveryText").GetComponent(TextMesh).color = Color.green;
			transform.Find("OptionsText").GetComponent(TextMesh).color = Color.white;
			transform.Find("StartText").GetComponent(TextMesh).color = Color.white;
			break;
		case 3:
			transform.Find("OptionsText").GetComponent(TextMesh).color = Color.green;
			transform.Find("StartText").GetComponent(TextMesh).color = Color.white;
			transform.Find("DiscoveryText").GetComponent(TextMesh).color = Color.white;
			break;
	}
	
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
			//transform.Find("OptionsText").GetComponent(TextMesh).color = Color.green;
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
	if(option > 3){
		option=3;
	}else if(option < 1){
		option=1;
	}
	//End of visual moviment menu
}