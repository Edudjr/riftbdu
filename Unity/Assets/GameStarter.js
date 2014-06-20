#pragma strict

public var referenceObject: String;
private var ObjectStarter : GameObject;


function Start () {
	ObjectStarter = GameObject.Find(referenceObject);
}

function Update () {

}