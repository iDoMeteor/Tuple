  /************************************************************************/
  // Variables
	SetCard.prototype.SWIGGLE = 1;
	SetCard.prototype.DIAMOND = 2;
	SetCard.prototype.OVAL    = 3;
	SetCard.prototype.RED	  	= 1;
	SetCard.prototype.PURPLE	= 2;
	SetCard.prototype.GREEN 	= 3;
	SetCard.prototype.SOLID 	= 1;
	SetCard.prototype.LINED 	= 2;
	SetCard.prototype.EMPTY 	= 3;
	SetCard.prototype.DECK_SIZE = 27;
  SetCard.prototype.IMAGE_HEADER = "../images/setcards/small/";
  SetCard.prototype.IMAGE_FOOTER = ".gif";
  SetCard.prototype.symbol  = 0;
	SetCard.prototype.number  = 0;
	SetCard.prototype.shading = 0;
	SetCard.prototype.color   = 0;
	// Methods
	SetCard.prototype.getGraphicsNumber = SetCard_getGraphicsNumber;
  SetCard.prototype.getShading = SetCard_getShading;
  SetCard.prototype.getSymbol= SetCard_getSymbol;
  SetCard.prototype.getColor = SetCard_getColor;
  SetCard.prototype.getNumber = SetCard_getNumber;
  SetCard.prototype.setShading = SetCard_setShading;
  SetCard.prototype.setSymbol= SetCard_setSymbol;
  SetCard.prototype.setColor = SetCard_setColor;
  SetCard.prototype.setNumber = SetCard_setNumber;
  SetCard.prototype.toMyString = SetCard_toMyString;
  SetCard.prototype.getImageURL = SetCard_getImageURL;
  SetCard.prototype.getPaddedGraphicsNumber = SetCard_getPaddedGraphicsNumber;


  /************************************************************************/
  function SetCard(graphicNumber)
  {
  	if ((graphicNumber < 1) || (graphicNumber > 81))
  	{
      alert("SetCard:Tried to create card with graphicNumber("+ graphicNumber +")");
  	}

  	graphicNumber--;
  	this.shading = Math.floor(((graphicNumber%81) / 27) + 1);
  	this.symbol 	= Math.floor(((graphicNumber%27) / 9) + 1);
  	this.color   = Math.floor(((graphicNumber%9) / 3) + 1);
  	this.number	= Math.floor(((graphicNumber%3) / 1) + 1);
  }

  /************************************************************************/
  function SetCard_getImageURL()
  {
    return this.IMAGE_HEADER + this.getPaddedGraphicsNumber() + this.IMAGE_FOOTER;
  }
  /***********************************************************************/
  function SetCard_getPaddedGraphicsNumber()
  {
    var text = "" + this.getGraphicsNumber();
    while (text.length < 2)
    {
      text = "0" + text;
    }
    return text;
  }
  /************************************************************************/
  function SetCard_getGraphicsNumber()
  {
  	var num;
  	num = (this.shading - 1) * 27;
  	num += (this.symbol - 1) * 9;
  	num += (this.color - 1) * 3;
  	num += this.number; //should be (Number - 1) * 1 but over all sum needs to be inc by one anyhow...
  	return num;
  }

  /************************************************************************/
  function SetCard_getShading()
  {
    return this.shading;
  }
  /************************************************************************/
  function SetCard_getSymbol()
  {
    return this.symbol;
  }
  /************************************************************************/
  function SetCard_getColor()
  {
    return this.color;
  }
  /************************************************************************/
  function SetCard_getNumber()
  {
    return this.number;
  }
  /************************************************************************/
  function SetCard_setShading(shading)
  {
    this.shading = shading;
  }
  /************************************************************************/
  function SetCard_setSymbol(symbol)
  {
    this.symbol = symbol;
  }
  /************************************************************************/
  function SetCard_setColor(color)
  {
    this.color = color;
  }
  /************************************************************************/
  function SetCard_setNumber(number)
  {
    this.number = number;
  }
  /************************************************************************/
  function SetCard_toMyString()
  {
  	return  "[Shading = " + this.shading + ",Symbol = " + this.symbol +
  		      ",Color = " + this.color + ",Number = " + this.number + "]";
  }

  /************************************************************************/
  /************************************************************************/
