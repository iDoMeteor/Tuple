  /************************************************************************/
  // Variables
  Set.prototype.SHADING	= 42;
	Set.prototype.COLOR	= 39;
	Set.prototype.SYMBOL	= 45;
	Set.prototype.NUMBER	= 48;
	Set.prototype.COLOR_RED		= 40;
	Set.prototype.COLOR_PURPLE	= 41;
	Set.prototype.COLOR_GREEN		= 42;
	Set.prototype.SHADING_SOLID	= 43;
	Set.prototype.SHADING_LINED	= 44;
	Set.prototype.SHADING_EMPTY	= 45;
	Set.prototype.SYMBOL_SWIGGLE	= 46;
	Set.prototype.SYMBOL_DIAMOND	= 47;
	Set.prototype.SYMBOL_OVAL		= 48;
	Set.prototype.NUMBER_ONE		= 49;
	Set.prototype.NUMBER_TWO		= 50;
	Set.prototype.NUMBER_THREE	= 51;
	Set.prototype.VALID_SET= 3;
	Set.prototype.INVALID_CARDS= 4;
	// Methods
	Set.prototype.isValidSet = Set_isValidSet;
  Set.prototype.isFeatureValid = Set_isFeatureValid;
  Set.prototype.reasonToString = Set_reasonToString;
  /************************************************************************/

  function Set(card1, card2, card3)
  {
    this.cards = new Array(card1, card2, card3);
  }
  /************************************************************************/
  function Set_reasonToString(reason)
  {
    var text = "";
    switch (reason)
    {
      case this.COLOR_RED      : text = "two are RED and one is not."; break;
      case this.COLOR_PURPLE	  : text = "two are PURPLE and one is not."; break;
      case this.COLOR_GREEN		: text = "two are GREEN and one is not."; break;
      case this.SHADING_SOLID	: text = "two are SOLID and one is not."; break;
      case this.SHADING_LINED	: text = "two are LINED and one is not."; break;
      case this.SHADING_EMPTY	: text = "two are EMPTY and one is not."; break;
      case this.SYMBOL_SWIGGLE	: text = "two are SWIGGLES and one is not."; break;
      case this.SYMBOL_DIAMOND	: text = "two are DIAMONDS and one is not."; break;
      case this.SYMBOL_OVAL    : text = "two are OVALS and one is not."; break;
      case this.NUMBER_ONE		  : text = "two have ONE symbol and one does not."; break;
      case this.NUMBER_TWO     : text = "two have TWO symbols and one does not."; break;
      case this.NUMBER_THREE   : text = "two have THREE symbols and one does not."; break;
      default : text = "reason = " + reason;
    }
    return text;
  }
  /************************************************************************/

	function Set_isValidSet()
	{
		var reason = this.VALID_SET;
		var base = 0;
		var product = 0;
		if (this.cards[0] == null || this.cards[1] == null || this.cards[2] == null )
		{
			return this.INVALID_CARDS;
		}
		if (this.isFeatureValid(this.cards[0].number, this.cards[1].number, this.cards[2].number))
		{
			if (this.isFeatureValid(this.cards[0].symbol, this.cards[1].symbol, this.cards[2].symbol))
			{
				if (this.isFeatureValid(this.cards[0].shading, this.cards[1].shading, this.cards[2].shading))
				{
				  if (this.isFeatureValid(this.cards[0].color, this.cards[1].color, this.cards[2].color))
					{
            // Valid Set
					}
					else
					{
						base = this.COLOR;
						product =  this.cards[0].color * this.cards[1].color * this.cards[2].color;
					}
				}
				else
				{
					base = this.SHADING;
					product =  this.cards[0].shading * this.cards[1].shading * this.cards[2].shading;
				}
			}
			else
			{
				base = this.SYMBOL;
				product =  this.cards[0].symbol * this.cards[1].symbol * this.cards[2].symbol;
			}
		}
		else
		{
			base = this.NUMBER;
			product =  this.cards[0].number * this.cards[1].number * this.cards[2].number;
		}
	reason = base;
	//System.out.print (" reason = " + reason + "/n");
	switch (product)
	{
		case 0 	: reason = this.VALID_SET; break;
		case 2 	: reason += 1; break;
		case 3 	: reason += 1; break;
		case 4 	: reason += 2; break;
		case 12 : reason += 2; break;
		case 9 	: reason += 3; break;
		case 18 : reason += 3; break;
	}
	//System.out.print (" reason = " + reason + "/n");
	return reason;
	}

  /************************************************************************/

  function Set_isFeatureValid(f1, f2, f3)
  {
  	return (((f1 == f2) &&	(f1 == f3)) || ((f1 + f2 + f3) == 6));
  }

  /************************************************************************/
  /************************************************************************/
