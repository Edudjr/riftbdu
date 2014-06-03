#pragma strict

private var Planet : Transform;
var speed : float = 50;
var RotateAround : String;

Planet = GameObject.Find(RotateAround).transform;

function Start () {

}

function Update () {
	if(Planet != null)
		transform.RotateAround(Planet.position, Vector3.up, speed*Time.deltaTime);
}