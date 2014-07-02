#pragma strict

private static var activated : String = null;
private var Globe : Transform;
//each country has its own index, which is the index inside the renderer.materials[]
private var index : int = 1;
private var matt : Material;
public var precision : float = 0.4;
public var Flagboard : GameObject;
private var str : String = "FlagBoard";

private var initialPos : Vector3;

//private var Board : GameObject; //This game object will be linked to the plane that shows the selected country
//public var boardObject : String = "CountryBoard"; //A variable which contains the name of the plane that will display the name of the selected country
//public var MaterialGroup : String;

function Awake (){
	//get the parent of the markers
	Globe = transform.parent;
	//Just setting the name again, to make sure.
	//boardObject = "CountryBoard";
	//When start, look for the plane
	//Board = GameObject.Find(boardObject);
}
function Start(){
	Flagboard = GameObject.Find("FlagBoard");
	//Defines the index for each marker at the beggining of the execution
	//It MUST have only one group of markers enabled (Otherwise, we would get different markers with the same index)
	for(var i = 1; i<Globe.renderer.materials.length; i++){
		matt = Globe.renderer.materials[i];
		//If current material name == current marker name
		if (matt.name == (transform.name + " (Instance)")){
			index = i;
		}
	}
	
	//Initial position for the flag
	for (var child : Transform in transform) {
		initialPos = child.transform.localPosition;
	}
	
}
function Update(){
	
	
	//Check if marker is at the right place
	if((transform.position.z < 0)&&	
	((transform.position.y < precision)&&(transform.position.y > -precision))&&
	((transform.position.x < precision)&&(transform.position.x > -precision))){
		
		//set material's alpha to 100%
		Globe.renderer.materials[index].color.a = 1;
		activated = transform.name;
		for (var child : Transform in transform) {
			child.transform.renderer.enabled = false;
		}
		/*Changes the texture of the plane when country is selected		
		//Board.renderer.material.mainTexture = Resources.Load(transform.name+"-Board");
		*/
		//transform.renderer.material.color = Color.green;
	}else{
		//activated = null;
		for (var child : Transform in transform) {
			child.transform.renderer.enabled = true;
		}
		Globe.renderer.materials[index].color.a = 0.1;
		transform.renderer.material.color = Color.yellow ;
	}
	
	
}



public function getActivated() : String{
	
	return activated;
}
public function getIndex(){
	return index;
}

function OnDestroy (){
	DestroyImmediate(renderer.material);
}