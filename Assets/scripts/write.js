#pragma strict

var style:GUIStyle;
var backgroundColor:Texture2D;
private var width:float;
private var height:float;
var text:String = "";

function Awake()
{
	style.fontSize = Screen.width/30;
	width = Screen.width;
	height = Screen.height;
}

function Start () {

}

function Update () {

}

function OnGUI()
{
	GUI.Button(Rect(width/2 - (text.length*style.fontSize/2)/2,height/1.2,text.length*style.fontSize/2,style.fontSize),ArabicSupport.ArabicFixer.Fix(text),style);
}
function clear(i:float)
{
	yield WaitForSeconds(i);
	text = "";
}