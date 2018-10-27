#pragma strict

function Awake()
{
	transform.GetComponent(TextMesh).fontSize = Screen.width/20;
}