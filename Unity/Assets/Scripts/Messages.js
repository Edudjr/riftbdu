#pragma strict


public var Text3DHandler : TextMesh;

function Start () {

}

function Update () {

}

function setText(message : String){
	Text3DHandler.text = message;
}

function clearText(){
	Text3DHandler.text = "";
}

function FindObject(ObjectName: String) : Transform{
	return GameObject.Find(ObjectName).transform;
	
}


/*function setAnswer(str : String, Colour : Vector4, ObjectName : String ){
	var theText = GameObject.Find(ObjectName).transform;
	theText.GetComponent(TextMesh).text = str;
	theText.GetComponent(TextMesh).color = Colour;
	while(theText.transform.position.z > -5){
		theText.Translate(0, 0, -answerSpeed * Time.deltaTime);
		yield;
	}
	while(theText.transform.position.z < 0){
		theText.Translate(0, 0, answerSpeed * Time.deltaTime);
		yield;
	}
	theText.GetComponent(TextMesh).text = "";
	theText.position = Vector3(0,0,0);
}*/