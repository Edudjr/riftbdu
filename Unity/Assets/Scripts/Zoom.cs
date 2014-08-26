using UnityEngine;
using System.Collections;

public class Zoom : MonoBehaviour {
	
	public float speed = 5;
	public float forwardDistance = 2;
	public float backwardDistance = 2;
	private Vector3 initialPosition;

	void Start () {
		initialPosition = transform.position;
	}
	
	// Update is called once per frame
	void Update () {
		
		if(transform.position.z >= initialPosition.z-backwardDistance 
		   && transform.position.z <= initialPosition.z+forwardDistance){
			
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
		
		if (transform.position.z > initialPosition.z + forwardDistance) {
			transform.position = new Vector3(0, 0, initialPosition.z + forwardDistance);
		}
		
		if (transform.position.z < initialPosition.z - backwardDistance) {
			transform.position = new Vector3(0, 0, initialPosition.z - backwardDistance);
			//Debug.Log("veio");
		}
	}
}
