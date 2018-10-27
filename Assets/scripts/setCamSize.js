#pragma strict

function Awake()
{   
	var size:float = (Screen.height/2);
    transform.GetComponent.<Camera>().orthographicSize = size/10;
}
function Start ()
{

}

function Update () {

}