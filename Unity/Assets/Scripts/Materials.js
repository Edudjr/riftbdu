#pragma strict

function Awake ()
{
	var i : int;
	
	for (i = 1; i < renderer.materials.length; i++){
		renderer.materials[i].color.a = 0;
	}
}
function Update(){

}

function OnDestroy ()
{
	DestroyImmediate(renderer.material);
}