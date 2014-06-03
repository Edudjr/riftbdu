#pragma strict


private var cam : Camera;
var fov : float = 60f;
var zoom_speed : float = 60.0f;
var zoom_min : float = 30.0f;
var zoom_max : float = 90.0f;

function Start () {
	cam = this.camera;
}

function Update () {
 cam.fieldOfView = fov;
 
    if(fov >= zoom_max)
       fov = zoom_max;
    if(fov <= zoom_min)
       fov = zoom_min;
    if(Input.GetAxis("Vertical") > 0)
        fov+= zoom_speed * Time.smoothDeltaTime;
    else if(Input.GetAxis("Vertical") < 0)
        fov-= zoom_speed * Time.smoothDeltaTime;
}