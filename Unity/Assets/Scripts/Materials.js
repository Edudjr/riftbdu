#pragma strict
//Group is the object that contains all the materials to render
private var Group : GameObject;
//MaterialGroup is the
//public var MaterialGroup : String; 

function Awake ()
{
	//Group = GameObject.Find(MaterialGroup);	
	var i : int;
	
	for (i = 1; i < transform.renderer.materials.length; i++){
		transform.renderer.materials[i].color.a = 0;
	}
}

function Update(){

}

function OnDestroy ()
{
	DestroyImmediate(renderer.material);
}