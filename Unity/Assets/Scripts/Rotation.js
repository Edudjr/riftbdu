#pragma strict
var speed : float = 50;
private var Planet : Transform;
var PlanetName : String;
Pointing = GameObject.Find(PlanetName).transform;
function Start () {

}

function Update () {
transform.RotateAround(Pointing.position, Vector3.up, speed*Time.deltaTime);

}