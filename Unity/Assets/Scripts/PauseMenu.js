#pragma strict


var objectSpawn : GameObject;
var pause : boolean = false;
//var pauseGUI : GUITexture;
//pauseGUI.enabled = false;



function Update(){
	if( Input.GetKeyUp(KeyCode.Escape) || Input.GetButtonDown("StartButton") ) {
		if(pause==true){
			pause = false;
		}
		else {
			pause = true;
		}
		if(pause == true) {
		
		
			Time.timeScale = 0.0;
			//pauseGUI.enabled = true;
		}
		else {
			Time.timeScale = 1.0;
			//pauseGUI.enabled = false;
		}
	} 
	
	

}


function InstantiateThePauseMenu(){
			var Continue = Instantiate(objectSpawn, transform.position + Vector3(0,3,0), transform.rotation);
			Continue.GetComponent(TextMesh).text = "Continue";
			var Options = Instantiate(objectSpawn, transform.position + Vector3(0,1,0), transform.rotation);
			Options.GetComponent(TextMesh).text = "Options";	
			var ExitToMenu = Instantiate(objectSpawn, transform.position + Vector3(0,-1,0), transform.rotation);
			ExitToMenu.GetComponent(TextMesh).text = "Exit to Menu";
			var QuitGame = Instantiate(objectSpawn, transform.position + Vector3(0,-3,0), transform.rotation);
			QuitGame.GetComponent(TextMesh).text = "Quit Game";

}
