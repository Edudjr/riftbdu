#pragma strict

var movTexture : MovieTexture;
var soundtrack : AudioSource; 
var audioFromVideo : AudioSource; 

function Start () {

renderer.material.mainTexture = movTexture; 
movTexture.Play();
soundtrack.Play();

}
function Update () {

}