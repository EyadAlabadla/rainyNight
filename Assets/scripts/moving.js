#pragma strict

private var ray:Ray;
private var hit:RaycastHit;
private var mainRoomPos:Transform;
private var room1CamPos:Transform;
private var room1Cam1:Transform;
private var room1Cam2:Transform;
private var room2CamPos:Transform;
private var room2Cam1:Transform;
private var room3CamPos:Transform;
var doorSound:AudioSource;
private var currentPos:Transform;
private var hiddenCollider:Transform;
var textTransform:Transform;
private var text:TextMesh;
private var going:boolean = false;
private var chair2DCollider:Collider2D;
private var box2DCollider:Collider2D;

function Awake ()
{
	text = textTransform.GetComponent(TextMesh);
	chair2DCollider = GameObject.Find("room1Chair2DCollider").GetComponent.<Collider2D>();
	box2DCollider = GameObject.Find("room2Box2DCollider").GetComponent.<Collider2D>();
	
	mainRoomPos = GameObject.Find("mainRoomPos").transform;
	
	room1CamPos = GameObject.Find("room1CamPos").transform;
	room2CamPos = GameObject.Find("room2CamPos").transform;
	//room3CamPos = GameObject.Find("room3CamPos").transform;
	
	room1Cam1 = GameObject.Find("room1Cam1").transform;
	room1Cam2 = GameObject.Find("room1Cam2").transform;
	room2Cam1 = GameObject.Find("room2Cam1").transform;
	
	check2D();
}

function Start()
{
	
}

function Update ()
{
	if(Input.touchCount > 0)
	{
		if(Input.GetTouch(0).phase == TouchPhase.Began)
		{
			if(Input.GetTouch(0).position.y < Screen.height/9)
			{
				if(currentPos != null && currentPos.parent != null)
				{
					if(hiddenCollider != null)
					{
						hiddenCollider.GetComponent.<Collider>().enabled = true;
						hiddenCollider = null;
					}
					moveCam(currentPos.parent);
				}
			}
			ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
			if(Physics.Raycast(ray,hit))
			{
				if(hit.transform.tag == "door1")
				{
					if(!going)gotoRoom(room1CamPos,hit.transform);
				}
				if(hit.transform.tag == "door2")
				{
					if(!going)gotoRoom(room2CamPos,hit.transform);
				}
				if(hit.transform.tag == "door3")
				{
					
				}
				if(hit.transform.tag == "door4")
				{
					write("هذا الباب مقفل",4);
				}
				if(hit.transform.name == "room1Cam1Collider")
				{
					moveCam(room1Cam1);
					hit.transform.GetComponent.<Collider>().enabled = false;
					hiddenCollider = hit.transform;
				}
				if(hit.transform.name == "room1Cam2Collider")
				{
					moveCam(room1Cam2);
					hit.transform.GetComponent.<Collider>().enabled = false;
					hiddenCollider = hit.transform;
				}
				if(hit.transform.name == "room2Cam1Collider")
				{
					moveCam(room2Cam1);
					hit.transform.GetComponent.<Collider>().enabled = false;
					hiddenCollider = hit.transform;
				}
				if(hit.transform.tag == "jarrar")
				{
					if(hit.transform.GetComponent.<Animation>()["jarrar"].time > 0)
					{
						if(hit.transform.GetComponent.<Animation>()["jarrar"].time <= hit.transform.GetComponent.<Animation>()["jarrar"].length)
						{
							hit.transform.GetComponent.<Animation>()["jarrar"].speed *= -1;
						}else
						{
							hit.transform.GetComponent.<Animation>()["jarrar"].time = hit.transform.GetComponent.<Animation>()["jarrar"].length;
							hit.transform.GetComponent.<Animation>()["jarrar"].speed = -1;
						}
					}else
					{
						hit.transform.GetComponent.<Animation>()["jarrar"].time = 0;
						hit.transform.GetComponent.<Animation>()["jarrar"].speed = 1;
					}
					hit.transform.GetComponent.<Animation>().Play();
				}
				if(hit.transform.tag == "number")
				{
					text.text += hit.transform.name;
				}
				if(hit.transform.tag == "openSafe")
				{
					if(text.text == "5123")
					{
						hit.transform.GetComponent.<Collider>().enabled = false;
						hit.transform.parent.GetComponent.<Animation>().Play();
					}else
					{
						text.text = "";
					}
				}
			}
		}
	}
}

function gotoRoom(pos:Transform,door:Transform)
{
	going = true;
	currentPos = pos;
	var animDoor:Transform = door.FindChild("theDoor").transform;
	animDoor.GetComponent.<Animation>()[animDoor.GetComponent.<Animation>().clip.name].time = 0;
	animDoor.GetComponent.<Animation>()[animDoor.GetComponent.<Animation>().clip.name].speed = 1;
	animDoor.GetComponent.<Animation>().Play();
	doorSound.Play();
	yield WaitForSeconds(3);
	transform.position = pos.position;
	transform.rotation = pos.rotation;
	animDoor.GetComponent.<Animation>()[animDoor.GetComponent.<Animation>().clip.name].time = 0;
	animDoor.GetComponent.<Animation>()[animDoor.GetComponent.<Animation>().clip.name].speed = 0;
	animDoor.GetComponent.<Animation>().Play();
	doorSound.Stop();
	check2D();
	going = false;
}

function write(theText:String,n:float)
{
	text.text = ArabicSupport.ArabicFixer.Fix(theText);
	yield WaitForSeconds(n);
	text.text = "";
}

function moveCam(pos:Transform)
{
	currentPos = pos;
	text.text = "";
	transform.position = pos.position;
	transform.rotation = pos.rotation;
	check2D();
}
function check2D()
{
	if(currentPos == room1CamPos)
	{
		chair2DCollider.gameObject.SetActive(true);
	}else
	{
		chair2DCollider.gameObject.SetActive(false);
	}
	if(currentPos == room2Cam1)
	{
		box2DCollider.gameObject.SetActive(true);
	}else
	{
		box2DCollider.gameObject.SetActive(false);
	}
}