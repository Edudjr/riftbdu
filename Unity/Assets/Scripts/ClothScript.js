#pragma strict

var markers : Markers;
private var initialPosition : Vector3;
public var distance : float = 0.3f;

function Start () {
	markers = GameObject.FindObjectOfType(Markers);
	initialPosition = transform.position;
}

function Update () {

}

function moveClothFlag(){
	//FlagMovementSound.Play();
	//resetClothFlag();
	//GameObject.Find("InteractiveCloth").GetComponent(ClothRenderer).renderer.enabled = true;
	transform.position = initialPosition;
	while(transform.position.y < (initialPosition.y + distance) ){
		transform.Translate(Vector3.up*Time.deltaTime*4, Space.World);
		yield;
	}
	
	while(transform.position.y > initialPosition.y){
		transform.Translate(-Vector3.up*Time.deltaTime*4, Space.World);
		yield;
	}
	ChangeClothFlagtoCurrentSelected( markers.getActivated() );	
}

function ChangeClothFlagtoCurrentSelected(Countryname : String){
	GameObject.Find("InteractiveCloth").renderer.material.mainTexture = Resources.Load("Flags/All Flags/" + Countryname +"-flag");
}