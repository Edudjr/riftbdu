#pragma strict

private static var activated : String = null;
private var Globe : Transform;
private var index : int;
private var pos : int = 1;
private var matt : Material;
public var precision : float = 0.4;
//public var MaterialGroup : String;

function Awake (){
	//get the parent of the markers
	Globe = transform.parent;
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

	}else{

		Globe.renderer.materials[pos].color.a = 0.1;
	}
	
}

function getActivated(){
	return activated;
}

function OnDestroy (){
	DestroyImmediate(renderer.material);
}