#pragma strict

private var pos:Vector3;

function Update ()
{
	if(Input.touchCount > 0)
	{
		if(Input.GetTouch(0).phase == TouchPhase.Began)
		{
			pos = transform.GetComponent.<Camera>().ScreenToWorldPoint(Input.GetTouch(0).position);
			var target:Collider2D = Physics2D.OverlapPoint(pos);
			if(target != null)
			{
				if(target.transform.tag == "startGame")
				{
					Camera.main.transform.SendMessage("Start1");
					for(var child:Transform in transform)
					{
						if(child.name != "blackBackground")child.GetComponent.<Renderer>().enabled = false;
					}
				}
				if(target.transform.tag == "deleteSave")
				{
					PlayerPrefs.DeleteAll();
				}
			}
		}
	}
}