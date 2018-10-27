#pragma strict

var thunder:AudioSource;
var gaming:boolean = false;
private var showHand:boolean = false;
var hand:Transform;
var door:Transform;
var black:Transform;
var text:Transform;

function Start ()
{
	yield WaitForSeconds(5.5);
	black.GetComponent.<Animation>()["blackBackgroundAlpha"].speed = -1;
	black.GetComponent.<Animation>()["blackBackgroundAlpha"].time = black.GetComponent.<Animation>()["blackBackgroundAlpha"].length;
	black.GetComponent.<Animation>().Play();
	var currentc = transform.GetComponent.<Camera>().backgroundColor;
	transform.GetComponent.<Camera>().backgroundColor = Color.white;
	thunder.Play();
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = currentc;
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = Color.white;
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = currentc;
	yield WaitForSeconds(8);
	transform.GetComponent.<Camera>().backgroundColor = Color.white;
	thunder.Play();
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = currentc;
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = Color.white;
	yield WaitForSeconds(.1);
	transform.GetComponent.<Camera>().backgroundColor = currentc;
	yield WaitForSeconds(1);
	text.GetComponent(TextMesh).text = ArabicSupport.ArabicFixer.Fix("اااه... انا بحاجة للمساعدة");
	yield WaitForSeconds(3.5);
	text.GetComponent(TextMesh).text = ArabicSupport.ArabicFixer.Fix("ما هذا البيت المخيف ؟ سأحاول طلب المساعدة");
	yield WaitForSeconds(4.5);
	hand.GetComponent(SpriteRenderer).enabled = true;
	gaming = true;
	
}