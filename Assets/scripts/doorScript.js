#pragma strict

var doorSound:AudioSource;
private var ray:Ray;
private var hit:RaycastHit;

function Update ()
{
	if(Input.touchCount > 0)
	{
		if(Input.GetTouch(0).phase == TouchPhase.Began)
		{
			ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
			if(Physics.Raycast(ray,hit))
			{
				if(hit.transform.tag == "door")
				{
					go();
				}
			}
		}
	}
}

function go()
{
	if(Camera.main.transform.GetComponent(scene2).gaming)
	{
		doorSound.Play();
		Camera.main.transform.GetComponent(scene2).gaming = false;
		yield WaitForSeconds(3);
		Application.LoadLevel(Application.loadedLevel + 1);
	}
}