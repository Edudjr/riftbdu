using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Leap;

public class LeapMovement : MonoBehaviour {
	
	Controller m_leapController;

	Frame f = null;
	Frame previousFrame = null;
	Hand hand = null;
	Vector position = null;
	bool wasClosed = false;
	
	void Start () {
		m_leapController = new Controller();
	}

	bool Pinching(Hand h) {
		if (h == null) return false;
		return h.PinchStrength > 0.7f;
	}
	
	bool Grabbing(Hand h) {
		if (h == null) return false;
		return h.GrabStrength > 0.45f;
	}

	
	// Update is called once per frame
	void Update () {
		
		f = m_leapController.Frame();

		if (f.Hands.Count > 0) {
			hand = f.Hands.Rightmost;
			position = hand.PalmPosition;

			if(previousFrame!=null){
				Vector rotationAxis = f.RotationAxis(previousFrame);
				int multiplier;

//
//				if(rotationAxis.x < -0.4 || rotationAxis.x > 0.4){
//					if(rotationAxis.x > 0)
//						multiplier = 1;
//					else
//						multiplier = -1;
//
//					transform.Rotate(-Vector3.right * Time.deltaTime * 20 * multiplier, Space.World);
//				}
//
//				if(rotationAxis.z < -0.4 || rotationAxis.z > 0.4){
//					if(rotationAxis.z > 0)
//						multiplier = 1;
//					else
//						multiplier = -1;
//
//					transform.Rotate(Vector3.up * Time.deltaTime * 20 * multiplier, Space.Self);
//				}

				if(hand.GrabStrength < 0.5){
					transform.Rotate(Vector3.right * Time.deltaTime * 0.5f * position.z, Space.World);
					transform.Rotate(Vector3.up * Time.deltaTime * 0.3f * position.x, Space.Self);
				}



			}else{
				previousFrame = f;
			}
		}else{
			previousFrame = null;
		}
		
		//string displayRotation = vectorToString(f.rotationAxis(previousFrame)); 
		//GUI.Box(new Rect(10,10,100,90), );
		
	}

	bool isClosed(){
		if(hand==null) return false;

		if(hand.GrabStrength > 0.9)
			return true;
		else
			return false;
	}

	public bool getHandClosed(){
		//If it just got opened
		if(wasClosed && !isClosed()){
			wasClosed=false;
		}

		//If it just got closed
		if(!wasClosed && isClosed()){
			Debug.Log("true");
			wasClosed = true;
			return true;
		}else{
			return false;
		}

	}
}
