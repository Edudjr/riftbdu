#pragma strict
var speed : float = 50;
var Planet : Transform;
var PlanetName : String;
Planet = GameObject.Find(PlanetName).transform;
function Start () {

}

function Update () {
transform.RotateAround(Planet.position, Vector3.up, speed*Time.deltaTime);

}