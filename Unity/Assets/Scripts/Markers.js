#pragma strict

private static var activated : String = null;
private var Globe : Transform;
private var index : int;
private var pos : int = 1;
private var matt : Material;
public var precision : float = 0.4;

private var Board : GameObject; //This game object will be linked to the plane that shows the selected country
public var boardObject : String = "CountryBoard"; //A variable which contains the name of the plane that will display the name of the selected country
//public var MaterialGroup : String;

function Awake (){
	//get the parent of the markers
	Globe = transform.parent;
	//Just setting the name again, to make sure.
	boardObject = "CountryBoard";
	//When start, look for the plane
	Board = GameObject.Find(boardObject);
}
function Start(){
	
	//Defines the index for each marker at the beggining of the execution
	//It MUST have only one group of markers enabled (Otherwise, we would get different markers with the same index)
	for(index = 1; index<Globe.renderer.materials.length; index++){
		matt = Globe.renderer.materials[index];
		//If current material name == current marker name
		if (matt.name == (transform.name + " (Instance)")){
			pos = index;
		}
	}
	
}
function Update(){
	
	//Check if marker is at the right place
	if((transform.position.z < 0)&&	
	((transform.position.y < precision)&&(transform.position.y > -precision))&&
	((transform.position.x < precision)&&(transform.position.x > -precision))){
		
		Globe.renderer.materials[pos].color.a = 1;
		
		//Get the name of the marker selected and gives to the variable "activated"
		activated = transform.name;
		//Change the texture of the plane, loading a new texture from the Resources folder
		
		/* This line was commented to do not let the name on the board change whenever the country is selected
		
		Board.renderer.material.mainTexture = Resources.Load(transform.name+"-Board");
		*/
		transform.renderer.material.color = Color.green ;
		//Debug.Log(activated);

	}else{
		//activated = null;
		Globe.renderer.materials[pos].color.a = 0.1;
		transform.renderer.material.color = Color.yellow ;
	}
	
}

public function getActivated(){
	
	return activated;
}

function OnDestroy (){
	DestroyImmediate(renderer.material);
}