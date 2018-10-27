#pragma strict

private var width:float;
private var height:float;
private var sw:float;
private var sh:float;
var duration:float = 0;
var freeScale:boolean = false;
var sizeX:float;
var sizeY:float;
var lockScaleToX:boolean = false;
var lockScaleToY:boolean = false;
var freePos:boolean = false;
var relatedToObjectPos:Transform;
var posXfull:boolean = false;
var posX:float;
var posYfull:boolean = false;
var posY:float;

function OnEnable ()
{
	resize();
}

function resize()
{
	yield WaitForSeconds(duration);
	if(!freeScale)transform.localScale = Vector3(1,1,transform.localScale.z);
	
	if(transform.GetComponent.<Renderer>() != null)
	{
		width = transform.GetComponent.<Renderer>().bounds.size.x;
		height = transform.GetComponent.<Renderer>().bounds.size.y;
	}else
	{
		if(transform.GetComponent.<Collider>() != null)
		{
			width = transform.GetComponent.<Collider>().bounds.size.x;
			height = transform.GetComponent.<Collider>().bounds.size.y;
		}else
		{
			width = transform.GetComponent.<Collider2D>().bounds.size.x;
			height = transform.GetComponent.<Collider2D>().bounds.size.y;
		}
	}
	
	sw = Screen.width;
	sh = Screen.height;
	if(!freeScale)
	{
		if(sizeX != 0)transform.localScale.x = sw/sizeX/width;
		if(sizeY != 0)transform.localScale.y = sh/sizeY/height;
		if(lockScaleToX)
		{
			transform.localScale.y = transform.localScale.x;
			transform.localScale.z = transform.localScale.x;
		}
		if(lockScaleToY)
		{
			transform.localScale.x = transform.localScale.y;
			transform.localScale.z = transform.localScale.y;
		}
	}
	
	var x:float;
	var y:float;
	if(posXfull)
	{
		x = sw;
	}else
	{
		if(relatedToObjectPos != null)
		{
			var sx:float = transform.root.GetComponent.<Camera>().WorldToScreenPoint(relatedToObjectPos.position).x;
			var sx1:float = transform.root.GetComponent.<Camera>().WorldToScreenPoint(relatedToObjectPos.position - Vector3(relatedToObjectPos.GetComponent.<Renderer>().bounds.size.x,0,0)).x;
			x = sx - (sx - sx1)/posX;
		}else
		{
			x = sw - sw/posX;
		}
	}
	if(posYfull)
	{
		y = sh;
	}else
	{
		y = sh - sh/posY;
	}
	if(!freePos)
	{
		var z:float = transform.position.z;
		transform.position = transform.root.GetComponent.<Camera>().ScreenToWorldPoint(Vector2(x,y));
		transform.localPosition.z = z;
	}
}