#pragma strict
private var Globe : GameObject;
function Awake ()
{
	Globe = GameObject.Find("Earth");
	
	var i : int;
	
	for (i = 1; i < Globe.renderer.materials.length; i++){
		Globe.renderer.materials[i].color.a = 0;
	}
}
function Update(){

}

function OnDestroy ()
{
	DestroyImmediate(renderer.material);
}