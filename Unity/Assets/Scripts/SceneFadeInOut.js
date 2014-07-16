#pragma strict

public var fadeSpeed : float = 1.0f;            // Speed that the screen fades to and from black.


private var sceneStarting : boolean = true;     // Whether or not the scene is still fading in.


function Start(){
	//Test
	//FadeIn();
	//yield WaitForSeconds(4);
	//FadeOut();
}

function FadeIn(){
	if(transform.renderer.material.color.a == 0)
    	transform.renderer.material.color.a = 1;
    while(transform.renderer.material.color.a>0.1){	
    	transform.renderer.material.color = Color.Lerp(transform.renderer.material.color, Color.clear, fadeSpeed * Time.deltaTime);
		yield;
	}
	transform.renderer.material.color.a = 0;
}	

function FadeOut(){
	if(transform.renderer.material.color.a == 1)
    	transform.renderer.material.color.a = 0;
    while(transform.renderer.material.color.a<0.99){	
    	transform.renderer.material.color = Color.Lerp(transform.renderer.material.color, Color.black, fadeSpeed * Time.deltaTime);
		yield;
	}
	transform.renderer.material.color.a = 1;
}

function FadeOutLoad(level : String){
	if(transform.renderer.material.color.a == 1)
    	transform.renderer.material.color.a = 0;
    while(transform.renderer.material.color.a<0.99){	
    	transform.renderer.material.color = Color.Lerp(transform.renderer.material.color, Color.black, fadeSpeed * Time.deltaTime);
		yield;
	}
	transform.renderer.material.color.a = 1;
	Application.LoadLevel(level);
}		
