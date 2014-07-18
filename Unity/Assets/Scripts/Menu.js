#pragma strict

private var option : int = 0;
private var fadeInOut : SceneFadeInOut;

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
			break;
		case 2:
			transform.Find("DiscoveryText").GetComponent(TextMesh).color = Color.green;
			break;
		case 3:
			transform.Find("OptionsText").GetComponent(TextMesh).color = Color.green;
			break;
	}
	
	
	if(Input.GetKeyDown(KeyCode.W) || (Input.GetAxisRaw("LeftAnalog_Vertical") < -0.9) ){
		WaitController(-1);
	}else if(Input.GetKeyDown(KeyCode.S) || (Input.GetAxisRaw("LeftAnalog_Vertical") > 0.9) ){
		WaitController(1);
	}
	
	
	//Make sure that option is available
	if(option > 3){
		option=3;
	}else if(option < 1){
		option=1;
	}
	//End of visual moviment menu
	
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



function WaitController(num : int) {

	yield new WaitForSeconds(1);
	option = option + num;
}


	
