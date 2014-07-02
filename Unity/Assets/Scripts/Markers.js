#pragma strict

private static var activated : String = null;
private var Globe : Transform;
//each country has its own index, which is the index inside the renderer.materials[]
private var index : int = 1;
private var matt : Material;
public var precision : float = 0.4;

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
		/*Changes the texture of the plane when country is selected		
		//Board.renderer.material.mainTexture = Resources.Load(transform.name+"-Board");
		*/
		//transform.renderer.material.color = Color.green;
		moveFlag();
	}else{
		//activated = null;
		Globe.renderer.materials[index].color.a = 0.1;
		transform.renderer.material.color = Color.yellow ;
		resetFlag();
	}
	
	
}

function moveFlag(){
	//while((transform.localPosition.x < 10)&&(transform.localPosition.x > 3)&&(transform.localPosition.x > -7)){
		//transform.position = Vector3( 3, 0, 0);
	//	yield;
	//}
	//Debug.Log("local "+transform.localPosition.x+" "+transform.localPosition.y+" "+transform.localPosition.z);
	for (var child : Transform in transform) {
    	// do whatever you want with child transform here
    	//Debug.Log("local "+child.transform.localPosition.x+" "+child.transform.localPosition.y+" "+child.transform.localPosition.z);
		//Debug.Log("global "+child.transform.position.x+" "+child.transform.position.y+" "+child.transform.position.z);
		child.position = Vector3( 0.5, 0, -7);
	}
	
}
function resetFlag(){
	for (var child : Transform in transform) {
		child.localPosition = initialPos;
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