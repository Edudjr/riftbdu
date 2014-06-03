#pragma strict
public var speed : float = 1;
public var referenceObject: String;
public var rotationLimit = 3;

private var reference : GameObject;

function Start(){
	reference = GameObject.Find(referenceObject);
}
function Update () {
	//print(" X = " + transform.localRotation.x);
	//print(" Y = " + transform.localRotation.y);
	//print(" Z = " + transform.localRotation.z);

	getAxis(null);
}

function getAxis (input : String){

	
	if( (Input.GetAxisRaw("RightAnalog_Horizontal")> 0.3 )|| (Input.GetKey(KeyCode.RightArrow )) )
	{ 
		transform.Rotate(-Vector3.up * Time.deltaTime * speed, Space.Self);
	}
	else {
		if ( (Input.GetAxisRaw("RightAnalog_Horizontal") < -0.3)||(Input.GetKey(KeyCode.LeftArrow)))
		{
			transform.Rotate(Vector3.up * Time.deltaTime * speed, Space.Self);
		}
	}
	
	if((Input.GetAxisRaw("RightAnalog_Vertical")> 0.3)||(Input.GetKey(KeyCode.UpArrow)))
	{
		if(reference.transform.position.z > transform.position.z - rotationLimit)
		//if(reference.transform.position.z > -1.2)
			transform.Rotate(-Vector3.right * Time.deltaTime * speed, Space.World);
	}
	else{
		if((Input.GetAxisRaw("RightAnalog_Vertical") < -0.3)||(Input.GetKey(KeyCode.DownArrow)))
		{
			if(reference.transform.position.z < transform.position.z + rotationLimit)
			//if(reference.transform.position.z < 1.3)
				transform.Rotate(Vector3.right * Time.deltaTime * speed, Space.World);
		}
	}
}