#pragma strict

var car:Transform;
var carSound:AudioSource;
var carDriving:AudioSource;
var carBreak:AudioSource;
var thunder:AudioSource;
var carCrash:AudioSource;
var rain:AudioSource;
var rock:Transform;
var black:Transform;
private var started:boolean = false;

function Start1 ()
{
	car.GetComponent.<Animation>().Play("carAnimation");
	transform.GetComponent.<Animation>().Play("camAnimation1");
	carSound.Play();
	yield WaitForSeconds(5);
	started = true;
	var currentc = transform.GetComponent.<Camera>().backgroundColor;
	transform.GetComponent.<Camera>().backgroundColor = Color.white;
	thunder.Play();
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = currentc;
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = Color.white;
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = currentc;
	
	rock.position = Vector3(304.5,100.8,198.1);
	
	transform.GetComponent.<Animation>().Play("camAnimation2");
	
	carDriving.volume = .25;
	carDriving.Play();
	yield WaitForSeconds(5);
	transform.GetComponent.<Animation>().Stop();
	transform.parent = car;
	transform.localPosition = Vector3(163,-122,-36);
	transform.localRotation.eulerAngles.x = 90;
	transform.localRotation.eulerAngles.y = 0;
	transform.localRotation.eulerAngles.z = 0;
	car.GetComponent.<Animation>().Play("carAnimation2");
	carDriving.volume = 1;
	carBreak.Play();
	yield WaitForSeconds(1);
	transform.GetComponent.<Camera>().backgroundColor = Color.white;
	thunder.Play();
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = currentc;
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = Color.white;
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = currentc;
	yield WaitForSeconds(.5);
	Time.timeScale = .1;
	yield WaitForSeconds(.8);
	transform.parent = null;
	car.GetComponent.<Animation>().Play("carAnimation3");
	transform.GetComponent.<Animation>().Play("camAnimation3");
	yield WaitForSeconds(.5);
	carSound.Stop();
	carDriving.Stop();
	carBreak.Stop();
	thunder.Stop();
	rain.Stop();
	carCrash.Play();
	Time.timeScale = 1;
	black.GetComponent.<Animation>().Play();
	yield WaitForSeconds(4);
	Application.LoadLevel(Application.loadedLevel+1);
	
	
}

function Update ()
{
	if(Input.touchCount > 0)
	{
		if(Input.GetTouch(0).phase == TouchPhase.Began)
		{
			if(started)
			{
				skip();
			}
		}
	}
}

function skip()
{
	Time.timeScale = 1;
	black.GetComponent.<Animation>().Play();
	yield WaitForSeconds(4);
	Application.LoadLevel(Application.loadedLevel+1);
}