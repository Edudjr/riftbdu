#pragma strict

private var PlanetSelectorObject : GameObject;
var setter : String = "PlanetSelector";

function Start () {
	PlanetSelectorObject = GameObject.Find(setter);
}

function Update () {

if( (Input.GetKeyDown(KeyCode.D )) || (Input.GetButtonDown("Button_A")) ) {
Application.LoadLevel("scene2");
}

}