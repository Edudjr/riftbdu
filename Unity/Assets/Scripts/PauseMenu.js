#pragma strict


var objectSpawn : GameObject;
var pause : boolean = false;
var Menu : GameObject;
var MinPosition : int = 0;
var MaxPosition : int = 3;
var option : int = 0;
private var lockButton : boolean = false;
var Resume : Transform;
var Credits : Transform;
var Back : Transform;
var Quit : Transform;
//var pauseGUI : GUITexture;
//pauseGUI.enabled = false;



function Update(){
	if( Input.GetKeyUp(KeyCode.Escape) || Input.GetButtonDown("StartButton") ) {
		if(pause==true){
			pause = false;
			Destroy(Menu);	
		}
		else {
			pause = true;
			InstantiateThePauseMenu();
			option = 0;
		}
		
		}
		
		if(pause == true) {
			//Menu.transform.position = Menu.transform.parent.GetChild(0).position + Vector3(0,0,2);
			getChange();
			switch(option){
				case 0:
					Resume.GetComponent(TextMesh).color = Color.green;
					Credits.GetComponent(TextMesh).color = Color.white;
					Back.GetComponent(TextMesh).color = Color.white;
					Quit.GetComponent(TextMesh).color = Color.white;
					break;
				case 1:
					Credits.GetComponent(TextMesh).color = Color.green;
					Resume.GetComponent(TextMesh).color = Color.white;
					Back.GetComponent(TextMesh).color = Color.white;
					Quit.GetComponent(TextMesh).color = Color.white;
					break;
				case 2:
					Back.GetComponent(TextMesh).color = Color.green;
					Resume.GetComponent(TextMesh).color = Color.white;
					Credits.GetComponent(TextMesh).color = Color.white;
					Quit.GetComponent(TextMesh).color = Color.white;
					break;
				case 3:
					Quit.GetComponent(TextMesh).color = Color.green;
					Resume.GetComponent(TextMesh).color = Color.white;
					Credits.GetComponent(TextMesh).color = Color.white;
					Back.GetComponent(TextMesh).color = Color.white;
					break;
			}
			
			if( Input.GetButtonDown("Jump") ) {
				switch(option){
					case 0:
						pause = false;
						Destroy(Menu);	
					break;
					case 1:
						Debug.Log("Gameeeeeeeee");
					break;
					case 2:
						Debug.Log("Back to menu");
					break;
					case 3:			
						Application.Quit();
					break;
					
				}
			
			}
				
		
		
		
	} 
	
	

}


function InstantiateThePauseMenu(){
		Menu = Instantiate(objectSpawn, GameObject.Find("OVRCameraController").transform.position + Vector3(0,0,1) , transform.rotation* Quaternion.Euler(-90,0,0));
				Menu.transform.parent = GameObject.Find("OVRCameraController").transform.GetChild(1);
				Resume = Menu.transform.GetChild(0);
				Resume.localPosition = Vector3(0,0,3.616419);
				Resume.GetComponent(TextMesh).text = "Resume";
				Credits = Menu.transform.GetChild(1);
				Credits.localPosition = Vector3(0,0,1.469896);
				Credits.GetComponent(TextMesh).text = "Credits";
				Back = Menu.transform.GetChild(2);
				Back.localPosition = Vector3(0,0,-0.7591888);
				Back.GetComponent(TextMesh).text = "Back To Menu";
				Quit = Menu.transform.GetChild(3);
				Quit.localPosition = Vector3(0,0,-2.97907);
				Quit.GetComponent(TextMesh).text = "Quit";

}

function getChange(){
	
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
	if(option >= MaxPosition){
		option=MaxPosition;
	}else if(option <= MinPosition){
		option=MinPosition;
	}
	//End of visual movement menu
	
}
