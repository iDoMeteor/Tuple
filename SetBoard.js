  /************************************************************************/
  // Variables
	// Methods
	SetBoard.prototype.initSetCards        = SetBoard_initSetCards;
	SetBoard.prototype.initSets            = SetBoard_initSets;
	SetBoard.prototype.smallScreen         = SetBoard_smallScreen;
	SetBoard.prototype.zero                = SetBoard_zero;
	SetBoard.prototype.getFoundMessage     = SetBoard_getFoundMessage;
	SetBoard.prototype.processSetFound     = SetBoard_processSetFound;
	SetBoard.prototype.theSetsString       = SetBoard_theSetsString;
	SetBoard.prototype.callSet             = SetBoard_callSet;
	SetBoard.prototype.count               = SetBoard_count;
	SetBoard.prototype.cardClicked         = SetBoard_cardClicked;
	SetBoard.prototype.loadImages          = SetBoard_loadImages;
	SetBoard.prototype.showImages          = SetBoard_showImages;
	SetBoard.prototype.syncCardImageNumber = SetBoard_syncCardImageNumber;

//***********************************************************************/
function SetBoard(winner, showScore, setsFound)
{
  this.setsFound = setsFound;
  this.winner     = winner;
  this.showScore  = showScore;
  this.found=0;
  this.set = new Array();
  this.set[1] = false;
  this.set[2] = false;
  this.set[3] = false;
  this.set[4] = false;
  this.set[5] = false;
  this.set[6] = false;
  this.setFoundOrder = new Array();
  this.images = new Array();
  this.theSets = new Array();
  this.theCards = new Array();
  this.showScore(this.found);
  this.imagesloaded = 0;
	this.imageOffset = 0;
	this.startTime = new Date();
	this.syncCardImageNumber();
	this.getSetsFoundImages();
}

//***********************************************************************/
SetBoard.prototype.getSetsFoundImages = function()
{
	this.setsFoundImages = new Array();
	for (var i = 0; i < this.setsFound.childNodes.length; i++)
	{
		if (this.setsFound.childNodes[i].tagName  == 'IMG')
		{
			this.setsFoundImages.push(this.setsFound.childNodes[i]);
		}
	}
}
//***********************************************************************/
function SetBoard_syncCardImageNumber()
{
	for (var i = 0; i < document.images.length; i++)
	{
		if (document.images[i].name == "card1")
		{
			this.imageOffset = i;
			break;
		}
	}
}
//***********************************************************************/
SetBoard.prototype.getLastSetTime = function()
{
  return (this.endTime.getTime()) - this.lastTime.getTime();
}
//***********************************************************************/
SetBoard.prototype.getElapsedTime = function()
{
  return (this.endTime.getTime()) - this.startTime.getTime();
}
//***********************************************************************/

function SetBoard_initSetCards(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12)
{
	this.theCards[1] = new SetCard(a1);
  this.theCards[2] = new SetCard(a2);
  this.theCards[3] = new SetCard(a3);
  this.theCards[4] = new SetCard(a4);
  this.theCards[5] = new SetCard(a5);
  this.theCards[6] = new SetCard(a6);
  this.theCards[7] = new SetCard(a7);
  this.theCards[8] = new SetCard(a8);
  this.theCards[9] = new SetCard(a9);
  this.theCards[10] = new SetCard(a10);
  this.theCards[11] = new SetCard(a11);
  this.theCards[12] = new SetCard(a12);
  //this.loadImages();
}
//***********************************************************************/

function SetBoard_loadImages()
{
  for (var i = 1; i < this.theCards.length; i++)
  {
    this.images[i-1] = new Image();
    this.images[i-1].src = this.theCards[i].getImageURL();
  }
  this.showImages();
}

//***********************************************************************/

function SetBoard_showImages()
{
  for (var i = 0; i < this.images.length; i++)
  {
    document.images[ i + this.imageOffset].src = this.images[i].src;
  }
}

//***********************************************************************/

function SetBoard_initSets(a1,a2,a3,b1,b2,b3,c1,c2,c3,d1,d2,d3,e1,e2,e3,f1,f2,f3)
{
  if (arguments.length != 18)
  {
    alert("initSets called with only " + arguments.length + " params");
    return;
  }
  for (i = 0; i < 6; i ++)
  {
  	array = new Array();
  	array[0] = arguments[i*3];
    array[1] = arguments[i*3 + 1];
    array[2] = arguments[i*3 + 2];
  	this.theSets[i+1] = array;
  }
}
//***********************************************************************/
/**
  * This is for the showSets Window
  **/
SetBoard.prototype.writeSetFound = function(orderNumber)
{

	var setFound = this.setFoundOrder[orderNumber];

  for (var i = 0; i < 3; i++)
	{
		var image = this.setsFoundImages[3*orderNumber + i];
    if (this.set[setFound])
    {

			image.src = this.theCards[this.theSets[setFound][i]].getImageURL();
    }
    else
    {

      image.src = "../images/setcards/small/empty_card.gif";
    }
  }
}

//***********************************************************************/

SetBoard.prototype.showSetsFound = function()
{
	if (!this.showSetsFoundWindow) {return;}
	try
	{
	  for (var i = 0; i < this.setFoundOrder.length; i++)
	  {
	    this.writeSetFound(i);
	  }
	}
	catch (e)
	{

		alert("Your browser cannot display the sets found window.\n" + e.toString());
		this.toggleSetsFound(false);
	}
}
//***********************************************************************/

SetBoard.prototype.toggleSetsFound = function(show)
{
	this.showSetsFoundWindow = show;
  toggle(show, window.document.setsFoundTab);
  toggle(!show, window.document.setsFoundImage);
  Cookie_setCookie(null,null,"ShowSetsFound", show);
  this.showSetsFound();
}

//***********************************************************************/

function SetBoard_smallScreen()
{
  window.open('set.htm#Puzzle','newWin',
              'scrollbars=1,toolbar=0,location=0,directories=0,height=480,width=680');
}

//***********************************************************************/

function SetBoard_zero()
{
  window.document.card.A1.checked = 0;
  window.document.card.A2.checked = 0;
  window.document.card.A3.checked = 0;
  window.document.card.A4.checked = 0;
  window.document.card.A5.checked = 0;
  window.document.card.A6.checked = 0;
  window.document.card.A7.checked = 0;
  window.document.card.A8.checked = 0;
  window.document.card.A9.checked = 0;
  window.document.card.A10.checked = 0;
  window.document.card.A11.checked = 0;
  window.document.card.A12.checked = 0;
}

//***********************************************************************/

function SetBoard_getFoundMessage(on_off)
{
  var message = null;
  if (on_off==1 && this.found==1){message='GREAT! \n'+this.found+' Set Found'}
  if (on_off==1 && this.found>1){message='GREAT! \n'+this.found+' Sets Found'}
  if (on_off!=1){message='You already found that one!\nStill have '+ (6-this.found)+' to find'}
  return message;
}

//***********************************************************************/
function SetBoard_processSetFound(i)
{
  if (this.set[i]==false)
  {
    this.set[i]=true;
		this.setFoundOrder.push(i);
    this.found++;
    this.showSetsFound();
    return this.getFoundMessage(1);
  }
  else
  {
    return this.getFoundMessage(2);
  }
}
//***********************************************************************/
function SetBoard_theSetsString(i)
{
	return ("A" + this.theSets[i][0] + this.theSets[i][1]+ this.theSets[i][2]);
}

//***********************************************************************/
function SetBoard_callSet(setFound, set)
{
  var setexist = false;
  var message = null;
  for (var i = 1; i <= 6 ; i++)
  {
    if (setFound == this.theSetsString(i))
    {
      setexist = true;
      message = this.processSetFound(i);
    }
  }
  this.showScore(this.found);
  if (setexist==true)
  {
    alert(message)
  }
  else
  {
    var text = "NOT A SET!\n";
    text += set.reasonToString(set.isValidSet());
    alert(text)
  }
  if (this.found==5)
  {
		this.lastTime = new Date();
  }
  if (this.found==6)
  {
		this.endTime = new Date();
    return this.winner();
  }
  else
  {
    return void(0);
  }
}
//***********************************************************************/
function SetBoard_count()
{
  var total=0;
  var setFound='A';
  var i = 1;
  cards = new Array();
  var returning = void(0);
  if (window.document.card.A1.checked == 1) {total++;setFound=setFound+1; cards[cards.length] = this.theCards[1];}
  if (window.document.card.A2.checked == 1) {total++;setFound=setFound+2; cards[cards.length] = this.theCards[2];}
  if (window.document.card.A3.checked == 1) {total++;setFound=setFound+3; cards[cards.length] = this.theCards[3];}
  if (window.document.card.A4.checked == 1) {total++;setFound=setFound+4; cards[cards.length] = this.theCards[4];}
  if (window.document.card.A5.checked == 1) {total++;setFound=setFound+5; cards[cards.length] = this.theCards[5];}
  if (window.document.card.A6.checked == 1) {total++;setFound=setFound+6; cards[cards.length] = this.theCards[6];}
  if (window.document.card.A7.checked == 1) {total++;setFound=setFound+7; cards[cards.length] = this.theCards[7];}
  if (window.document.card.A8.checked == 1) {total++;setFound=setFound+8; cards[cards.length] = this.theCards[8];}
  if (window.document.card.A9.checked == 1) {total++;setFound=setFound+9; cards[cards.length] = this.theCards[9];}
  if (window.document.card.A10.checked == 1) {total++;setFound=setFound+10; cards[cards.length] = this.theCards[10];}
  if (window.document.card.A11.checked == 1) {total++;setFound=setFound+11; cards[cards.length] = this.theCards[11];}
  if (window.document.card.A12.checked == 1) {total++;setFound=setFound+12; cards[cards.length] = this.theCards[12];}
  if (total == 3)
  {
    total = 0;
    returning = this.callSet(setFound, new Set(cards[0], cards[1], cards[2]));
    this.zero();
  }
  else if (total > 3)
  {
    this.zero();
  }
  return returning;
}
//***********************************************************************/
function SetBoard_cardClicked(cardPressed)
{
  var theCard = window.document.card.elements[cardPressed-1];
  theCard.checked = !theCard.checked;
  this.count();
}
//***********************************************************************/
//***********************************************************************/
