#pragma strict

private var option : int = 0;

function Start () {
	option = 0;
}

function Update () {
	//Set all children's color to white
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
	}
	
	//Change option using K and S keys
	if(Input.GetKeyDown(KeyCode.W)){
		option --;
	}else if(Input.GetKeyDown(KeyCode.S)){
		option ++;
	}
	
	//Make sure that option is available
	if(option > 3){
		option=3;
	}else if(option < 1){
		option=1;
	}
	//End of visual moviment menu
	
	//What kind of game should be loaded now: 
	if( (Input.GetKeyDown(KeyCode.D )) || (Input.GetButtonDown("Button_A")) ) {
		switch(option){
		case 1: 
			Application.LoadLevel("GameMode");
			break;
		case 2:
			Application.LoadLevel("DiscoveryMode");
			break;
		case 3:
			//transform.Find("OptionsText").GetComponent(TextMesh).color = Color.green;
			break;
	}

}
	
	
	
}