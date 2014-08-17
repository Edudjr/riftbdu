#pragma strict

public static var option : int;
public static var continent : String;
public static var music : int;
public static var sfx : int;

function setOption(opt : int){
	option = opt;
}
function  getOption(){
	return option;
}

function setContinent(cont : String){
	continent = cont;
}

function getContinent(){
	return continent;
}

function setMusic(status : int){
	music = status;
}

function getMusic() : int{
	return music;
}

function setSFX(status : int){
	sfx = status;
}

function getSFX() : int{
	return sfx;
}