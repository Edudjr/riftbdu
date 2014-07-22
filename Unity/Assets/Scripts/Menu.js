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
	
	
	if( (Input.GetAxisRaw("LeftAnalog_Vertical") < -0.9) ){
		WaitController(-1);
	}else if((Input.GetAxisRaw("LeftAnalog_Vertical") > 0.9) ){
		WaitController(1);
	}
	
	
	if(Input.GetKeyDown(KeyCode.W) ){
		option--;
	}else if(Input.GetKeyDown(KeyCode.S)  ){
		option++;
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


	
