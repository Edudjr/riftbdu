﻿#pragma strict
public var speed : float = 1;
public var referenceObject: String;
public var rotationLimit : float = 1.0;
public var Speed2 : float = 2 ;
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

	
	if( (Input.GetAxisRaw("LeftAnalog_Horizontal")> 0.1 ) )
	{ 
		transform.Rotate(-Vector3.up * Time.deltaTime * speed* (Input.GetAxisRaw("LeftAnalog_Horizontal")*Speed2) , Space.Self);
		//Debug.Log(-Vector3.up * Time.deltaTime * speed* (Input.GetAxisRaw("LeftAnalog_Horizontal")*3));
	}
	else {
		if ( (Input.GetAxisRaw("LeftAnalog_Horizontal") < -0.1)   )
		{
			transform.Rotate(Vector3.up * Time.deltaTime * speed * (Input.GetAxisRaw("LeftAnalog_Horizontal")*-Speed2), Space.Self);
		}
	}
	
	if( (Input.GetKey(KeyCode.LeftArrow) ) )
	{ 
		transform.Rotate(-Vector3.up * Time.deltaTime * speed, Space.Self);
		//Debug.Log(-Vector3.up * Time.deltaTime * speed* (Input.GetAxisRaw("LeftAnalog_Horizontal")*3));
	}
	else {
		if ( (Input.GetKey(KeyCode.RightArrow)))
		{
			transform.Rotate(Vector3.up * Time.deltaTime * speed , Space.Self);
		}
	}
	
	if((Input.GetAxisRaw("LeftAnalog_Vertical")> 0.3)  )
	{
		if(reference.transform.position.z > transform.position.z - rotationLimit)
		//if(reference.transform.position.z > -1.2)
			transform.Rotate(-Vector3.right * Time.deltaTime * speed * (Input.GetAxisRaw("LeftAnalog_Vertical")*Speed2), Space.World);
	}
	else{
		if((Input.GetAxisRaw("LeftAnalog_Vertical") < -0.3)  )
		{
			if(reference.transform.position.z < transform.position.z + rotationLimit)
			//if(reference.transform.position.z < 1.3)
				transform.Rotate(Vector3.right * Time.deltaTime * speed * (Input.GetAxisRaw("LeftAnalog_Vertical")*-Speed2), Space.World);
		}
	}
	
	
	
	if( (Input.GetKey(KeyCode.UpArrow)) )
	{
		if(reference.transform.position.z > transform.position.z - rotationLimit)
		//if(reference.transform.position.z > -1.2)
			transform.Rotate(-Vector3.right * Time.deltaTime * speed , Space.World);
	}
	else{
		if( (Input.GetKey(KeyCode.DownArrow)))
		{
			if(reference.transform.position.z < transform.position.z + rotationLimit)
			//if(reference.transform.position.z < 1.3)
				transform.Rotate(Vector3.right * Time.deltaTime * speed , Space.World);
		}
	}
}