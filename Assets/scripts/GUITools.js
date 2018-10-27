#pragma strict

private var pos:Vector3;
private var target:Transform;
private var originalPos:Vector3;
var slots:Transform[];
private var fullChair:Transform;
private var textTransform:Transform;
private var text:TextMesh;
var animatedChair:Transform;
private var animatedBox:Transform;
private var realpaper:Transform;
private var showpaper:boolean = true;

function Awake ()
{
	textTransform = GameObject.Find("GUIText").transform;
	text = textTransform.GetComponent(TextMesh);
	fullChair = GameObject.Find("fullChair").transform;
	animatedChair = GameObject.Find("animatedChair").transform;
	animatedBox = GameObject.Find("animatedBox").transform;
	animatedChair.gameObject.SetActive(false);
	realpaper = GameObject.Find("realpaper").transform;
}

function Update ()
{
	if(Input.touchCount > 0)
	{
		if(Input.GetTouch(0).phase == TouchPhase.Began)
		{
			pos = transform.GetComponent.<Camera>().ScreenToWorldPoint(Input.GetTouch(0).position);
			var collider:Collider2D = Physics2D.OverlapPoint(pos);
			if(collider != null)
			{
				if(collider.transform.tag == "GUITool")
				{
					target = collider.transform;
					originalPos = target.position;
				}
			}
		}
		if(Input.GetTouch(0).phase == TouchPhase.Moved)
		{
			if(target != null)
			{
				var mousePos:Vector3 = transform.GetComponent.<Camera>().ScreenToWorldPoint(Input.mousePosition);
				target.position.x = mousePos.x;
				target.position.y = mousePos.y;
			}
		}
		if(Input.GetTouch(0).phase == TouchPhase.Ended)
		{
			if(target != null)
			{
				var hit:Collider2D[] = Physics2D.OverlapAreaAll(target.position - Vector3(target.GetComponent.<Collider2D>().bounds.size.x/2,target.GetComponent.<Collider2D>().bounds.size.x/2,0),target.position + Vector3(target.GetComponent.<Collider2D>().bounds.size.x/2,target.GetComponent.<Collider2D>().bounds.size.x/2,0));
				var theOther:Transform;
				var name1:Transform = target.GetChild(0);
				
				if(hit.Length == 2)
				{
					if(hit[0].transform == target)
					{
						theOther = hit[1].transform;
					}else
					{
						theOther = hit[0].transform;
					}
					if(theOther.tag == "GUITool")
					{
						var name2:Transform = theOther.GetChild(0);
						if((name1.name == "chair" || name1.name == "leg") && (name2.name == "leg" || name2.name == "chair"))
						{
							if(doHave("hammer") && doHave("nuts"))
							{
								name1.GetComponent.<Renderer>().enabled = false;
								name1.parent = null;
								target.gameObject.SetActive(false);
								name2.GetComponent.<Renderer>().enabled = false;
								name2.parent = null;
								theOther.gameObject.SetActive(false);
								var hammerSlot:Transform = getSlot("hammer");
								var nutsSlot:Transform = getSlot("nuts");
								var hammer:Transform = hammerSlot.GetChild(0);
								var nuts:Transform = nutsSlot.GetChild(0);
								hammer.GetComponent.<Renderer>().enabled = false;
								hammer.parent = null;
								hammerSlot.gameObject.SetActive(false);
								nuts.GetComponent.<Renderer>().enabled = false;
								nuts.parent = null;
								nutsSlot.gameObject.SetActive(false);
								getItemAfterCombine(fullChair);
							}else
							{
								write("احتاج شيء ما لتثبيتها",3);
							}
						}
					}
					if(theOther.tag == "GUICollider")
					{
						if(name1.name == "fullChair" && theOther.name == "room1Chair2DCollider")
						{
							name1.GetComponent.<Renderer>().enabled = false;
							name1.parent = null;
							target.gameObject.SetActive(false);
							animatedChair.gameObject.SetActive(true);
							animatedChair.GetComponent.<Animation>().Play();
						}
						if(name1.name == "iron" && theOther.name == "room2Box2DCollider")
						{
							name1.GetComponent.<Renderer>().enabled = false;
							name1.parent = null;
							target.gameObject.SetActive(false);
							animatedBox.GetComponent.<Animation>().Play();
						}
					}
				}
				if(hit.Length == 1)
				{
					if(name1.name == "paper")
					{
						if(Vector3.Distance(target.position,originalPos) < 2)
						{
							showpaper = !showpaper;
							if(showpaper)
							{
								realpaper.GetComponent.<Renderer>().enabled = true;
							}else
							{
								realpaper.GetComponent.<Renderer>().enabled = false;
							}
						}
					}
				}
				target.position = originalPos;
				target = null;
			}
		}
	}
}
function doHave(item:String): boolean
{
	var have:boolean = false;
	for(var slot:Transform in slots)
	{
		if(slot.gameObject.activeSelf)
		{
			if(slot.GetChild(0).name == item)
			{
				have = true;
				break;
			}else
			{
				have = false;
			}
		}
	}
	return have;
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

function getSlot(item:String)
{
	var theSlot:Transform;
	for(var slot:Transform in slots)
	{
		if(slot.gameObject.activeSelf)
		{
			if(slot.GetChild(0).name == item)
			{
				theSlot = slot;
				break;
			}
		}
	}
	return theSlot;
}
function getItemAfterCombine(sprite:Transform)
{
	var slot:Transform = findSlot();
	var srenderer:SpriteRenderer = sprite.GetComponent.<Renderer>();
	slot.gameObject.SetActive(true);
	sprite.localScale.x = slot.GetComponent.<Collider2D>().bounds.size.x/srenderer.bounds.size.x;
	sprite.localScale.y = sprite.localScale.x;
	srenderer.enabled = true;
	sprite.parent = slot;
	sprite.position = slot.position;
}

function write(theText:String,n:float)
{
	text.text = ArabicSupport.ArabicFixer.Fix(theText);
	yield WaitForSeconds(n);
	text.text = "";
}