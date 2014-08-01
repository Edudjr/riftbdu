using UnityEngine;
using System.Collections;

public class Zoom : MonoBehaviour {
	
	public float speed = 5;
	public float forwardDistance = 5;
	public float backwardDistance = 5;

	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
		if(transform.position.z >= -backwardDistance && transform.position.z <= -forwardDistance){
			
			if(Input.GetKey(KeyCode.S)){
				transform.position -= new Vector3(0,0,speed * Time.deltaTime);
			}
			if(Input.GetKey(KeyCode.W)){
				transform.position += new Vector3(0,0,speed * Time.deltaTime);
			}

			if((Input.GetAxisRaw("RightAnalog_Vertical")< -0.3)  )
			{
				transform.position -= new Vector3(0,0,speed * Time.deltaTime);
			}
			else{
				if((Input.GetAxisRaw("RightAnalog_Vertical")  > 0.3)  )
				{
					transform.position += new Vector3(0,0,speed * Time.deltaTime);
				}
			}

		}
		
		if (transform.position.z > -forwardDistance) {
			transform.position = new Vector3(0, 0, -forwardDistance);
		}
		
		if (transform.position.z < -backwardDistance) {
			transform.position = new Vector3(0, 0, -backwardDistance);
		}
	}
}
