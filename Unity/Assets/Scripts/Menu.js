#pragma strict

private var option : int = 0;

function Start () {
	
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
			transform.Find("OptionsText").GetComponent(TextMesh).color = Color.green;
			break;
	}
	
	//Change option using K and S keys
	if(Input.GetKey(KeyCode.W)){
		option --;
	}else if(Input.GetKey(KeyCode.S)){
		option ++;
	}
	
	//Make sure that option is available
	if(option > 2){
		option=2;
	}else if(option < 1){
		option=1;
	}
}