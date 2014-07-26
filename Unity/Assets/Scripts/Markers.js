#pragma strict

private static var activated : String = null;
private var Globe : Transform;
//each country has its own index, which is the index inside the renderer.materials[]
private var index : int = 1;
public var precision : float = 0.4;


private var initialPos : Vector3;


function Awake (){
	//get the parent of the markers
	Globe = transform.parent.parent;
	
}
function Start(){
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
		
		
		activated = transform.name;
		Globe.renderer.material = Resources.Load("CountriesMaterials/"+activated);
		
		//for (var child : Transform in transform) {
		//	child.transform.renderer.enabled = false;
		//}
		transform.GetChild(0).renderer.enabled = false;
	
	}else{
		//Resources.UnloadUnusedAssets();
		//for (var child : Transform in transform) {
		//	child.transform.renderer.enabled = true;
		//}
		transform.GetChild(0).renderer.enabled = true;

	}
	
	
}

public function getActivated() : String{
	
	return activated;
}


function OnDestroy (){
	DestroyImmediate(renderer.material);
}