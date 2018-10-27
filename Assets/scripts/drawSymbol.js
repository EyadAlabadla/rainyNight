#pragma strict

var pic:Texture2D;
private var width:float;
private var height:float;
private var scale:float;
private var point:Vector2;

function Awake()
{
	width = Screen.width;
	height = Screen.height;
}

function Start () {

}

function Update () {

}

function OnGUI()
{
	GUI.color.a = .6;
	point = Camera.main.WorldToScreenPoint(transform.position);
	scale = width/25;
	GUI.DrawTexture(Rect(point.x - scale/2,height - point.y - scale/2,scale,scale),pic);
}