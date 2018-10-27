#pragma strict

private var slots:Transform[] = new Transform[12];
private var ray:Ray;
private var hit:RaycastHit;
private var guitools:GUITools;
private var GUICamera:GameObject;
private var textTransform:Transform;
private var text:TextMesh;

function Awake()
{
	GUICamera = GameObject.Find("GUICamera");
	guitools = GUICamera.GetComponent(GUITools);
	textTransform = GameObject.Find("GUIText").transform;
	text = textTransform.GetComponent(TextMesh);
	slots[0] = GameObject.Find("slot1").transform;
	slots[1] = GameObject.Find("slot2").transform;
	slots[2] = GameObject.Find("slot3").transform;
	slots[3] = GameObject.Find("slot4").transform;
	slots[4] = GameObject.Find("slot5").transform;
	slots[5] = GameObject.Find("slot6").transform;
	slots[6] = GameObject.Find("slot7").transform;
	slots[7] = GameObject.Find("slot8").transform;
	slots[8] = GameObject.Find("slot9").transform;
	slots[9] = GameObject.Find("slot10").transform;
	slots[10] = GameObject.Find("slot11").transform;
	slots[11] = GameObject.Find("slot12").transform;
	guitools.slots = slots;
	for(var i:Transform in slots)
	{
		i.gameObject.SetActive(false);
	}
}

function Update ()
{
	if(Input.touchCount > 0)
	{
		if(Input.GetTouch(0).phase == TouchPhase.Began)
		{
			ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
			if(Physics.Raycast(ray,hit))
			{
				if(hit.transform.tag == "item")
				{
					var info = hit.transform.GetComponent(information);
					if(info.hint == "")
					{
						takeItem(hit.transform);
						GameObject.Destroy(hit.transform.gameObject);
					}else
					{
						if(info.hint == "iron")
						{
							if(guitools.animatedChair.gameObject.activeSelf)
							{
								takeItem(hit.transform);
								GameObject.Destroy(hit.transform.gameObject);
							}else
							{
								write("لا أستطيع التقاطها انها مرتفعة جداً",4);
							}
						}
						if(info.hint == "paper")
						{
							if(guitools.doHave("iron"))
							{
								takeItem(hit.transform);
								hit.transform.Find("animation").GetComponent.<Animation>().Play();
							}else
							{
								write("لا أستطيع فتحه قفله عالق اظن انه يجب كسر القفل",5);
							}
						}
					}
				}
			}
		}
	}
}

function findSlot():Transform
{
	for(var i:Transform in slots)
	{
		if(i.gameObject.activeSelf == false)
		{
			var target:Transform = i;
			break;
		}
	}
	return target;
}

function takeItem(item:Transform)
{
	var info = hit.transform.GetComponent(information);
	var slot:Transform = findSlot();
	var srenderer:SpriteRenderer = info.pic.GetComponent.<Renderer>();
	slot.gameObject.SetActive(true);
	info.pic.localScale.x = slot.GetComponent.<Collider2D>().bounds.size.x/srenderer.bounds.size.x;
	info.pic.localScale.y = info.pic.localScale.x;
	srenderer.enabled = true;
	info.pic.parent = slot;
	info.pic.position = slot.position;
}
function write(theText:String,n:float)
{
	text.text = ArabicSupport.ArabicFixer.Fix(theText);
	yield WaitForSeconds(n);
	text.text = "";
}