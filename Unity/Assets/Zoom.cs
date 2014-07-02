using UnityEngine;
using System.Collections;

public class Zoom : MonoBehaviour {
	
	public float speed = 5.0f;
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
		if(transform.position.z >= -8.0f && transform.position.z <= -5.0f){
			
			if(Input.GetKey(KeyCode.S)){
				transform.position -= new Vector3(0,0,speed * Time.deltaTime);
			}
			if(Input.GetKey(KeyCode.W)){
				transform.position += new Vector3(0,0,speed * Time.deltaTime);
			}
			
		}
		
		if (transform.position.z > -5.0f) {
			
			//Vector3 temp = transform.position; 
			//temp.z = -5.0f; 
			//transform.position = temp; 
			transform.position = new Vector3(0, 0, -5);
		}
		
		if (transform.position.z < -8.0f) {
			
			//Vector3 temp = transform.position; 
			//temp.z = -8.0f; 
			//transform.position = temp;
			transform.position = new Vector3(0, 0, -8);
		}
	}
}
