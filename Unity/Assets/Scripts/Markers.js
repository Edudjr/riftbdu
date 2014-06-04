#pragma strict

private var Globe : GameObject;
private var index : int;
private var pos : int = 0;
private var matt : Material;

function Awake ()
{
	Globe = GameObject.Find("Sphere");
}
function Update(){
print("PosX: "+transform.position.x);
print("PosY: "+transform.position.y);
print("PosZ: "+transform.position.z);

if(transform.position.z < 0){	
	if((transform.position.y < 0.4)&&(transform.position.y > -0.4)){
		if((transform.position.x < 0.4)&&(transform.position.x > -0.4)){
			
			for(index = 0; index<Globe.renderer.materials.length; index++){
				matt = Globe.renderer.materials[index];
				if (matt.name == (transform.name + " (Instance)")){
					matt.color.a = 90;
					pos = index;
					//GameObject.Find("Timer").SendMessage("GetMarker", transform.name);
					//GameObject.Find("Timer").SendMessage("newGetMarker", transform.name);
				}
			}
		}
		else
			Globe.renderer.materials[pos].color.a = 0;
	}
	else 
		Globe.renderer.materials[pos].color.a = 0;
}
	
}

function OnDestroy ()
{
	DestroyImmediate(renderer.material);
}