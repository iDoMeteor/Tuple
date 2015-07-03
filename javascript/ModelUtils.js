//***********************************************************************/
// For backwards compatability
Array.prototype.push = function(objectToPush)
{
	this[this.length] = objectToPush;
}
  //***********************************************************************/
  String.prototype.lTrim = function()
  {
    return this.replace(/^\s*/, '');
  }
  //***********************************************************************/
   String.prototype.rTrim = function()
  {
    return this.replace(/\s*$/, '');
  }
  //***********************************************************************/
   String.prototype.trim = function() 
  {
    return this.lTrim().rTrim();
  }
  //***********************************************************************/	
  function disableEnterButton()
  {    
    if(window.event.keyCode == 13 && window.event.srcElement.tagName=="INPUT") 
    {
      sType = srcElement.type.toUpperCase();
      window.event.returnValue = (sType=="BUTTON" || sType=="SUBMIT");
		}
  }
  //***********************************************************************/
  function toggle(on, object)
  {
    object.style.visibility = (on ? "visible":"hidden");
    object.style.display = (on ? "" : "none");
    toggleDisabled(!on, object);
  }
   //***********************************************************************/
  function toggleDisabled(disabled, object)
  {
    object.disabled = disabled;
  }  
  //***********************************************************************/
  function selectNode(node, index, passTo)
  {
    if (typeof(node[index]) != "undefined")
    {
      node = node[index];
    }
    
    node.checked = true;
    if (typeof(doRefreshScreen) != "undefined")
    {
      doRefreshScreen();
    }
    if (typeof(passTo) != "undefined")
    {
      passTo.focus();
    }
    
    return void(0);
  }
  //***********************************************************************/
  function toggleNode(node)
  {
    node.checked = !node.checked;
    if (typeof(doRefreshScreen) != "undefined")
    {
      doRefreshScreen();
    }
    return void(0);
  }
  //***********************************************************************/
  function loadURL(url)
  {
    window.location=url;
  }  
  //***********************************************************************/
  function getAsDouble(value)
  {
    if (value == null) {return 0;}
    var i = parseFloat();
    if (isNaN(i))
    {
      var part = stripNonNumeric("" + value);
      part = ((part.charAt(0) == '-') ? part : "0" + part);
      i = parseFloat(part);
      return (isNaN(i) ?  0 : i);
    }
    return i;
  }
  
  //***********************************************************************/
  function clearNull(string)
  {
    if (string == "")
    {
      // do nothing
    }
    else if (string == null || string == "null" || (string.length == 4 && string.toLowerCase() == "null"))
    {
      string = "";
    }
    return string;
  }

  //***********************************************************************/
  function findFormPartByName(name)
  {
    for(var a = 0; a < window.document.forms.length; a++)
    {
      for(var b = 0; b < window.document.forms[a].all.length; b++)
      {
        if (window.document.forms[a].all[b].name == name)
        {
          return window.document.forms[a].all[b];
        }
      }
    }
  }
  //***********************************************************************/
  function stripNonNumeric(number)
  {
    var output = "";
    for (var i = 0; i < number.length ;i++)
    {
      switch (number.charAt(i))
      {
        case "-" :
        case "0" :
        case "1" :
        case "2" :
        case "3" :
        case "4" :
        case "5" :
        case "6" :
        case "7" :
        case "8" :
        case "9" :
        case "E" :
        case "." :
          output += number.charAt(i);
          break;
      }    
    }
    return output;
  }
  //***********************************************************************/
  //**                         TEXT FIELD OBJECT                         **/
  //***********************************************************************/
  function TextFieldObject(object, blankZero)
  {
    this.getAsInt      = TextFieldObject_getAsInt;
    this.getAsDouble   = TextFieldObject_getAsDouble;
    this.setAsCurrency = TextFieldObject_setAsCurrency;
    this.get           = TextFieldObject_get;
    this.set           = TextFieldObject_set;
    this.blankZero     = (blankZero == null) ? false : blankZero;
    this.object = object;
  }
  //***********************************************************************/
  function TextFieldObject_get()
  {
    return this.object.value;
  }
  //***********************************************************************/
  function TextFieldObject_getAsInt()
  {
    var i = parseInt(stripNonNumeric(this.get()));
    return (isNaN(i) ?  0 : i);
  }
  //***********************************************************************/
  function TextFieldObject_getAsDouble()
  {
    return getAsDouble(this.get());
  }
  //***********************************************************************/
  function TextFieldObject_setAsCurrency(doubleValue, object)
  {
    object = (arguments.length == 1 ? this.object : object);
    var amount = getAsDouble(doubleValue, object);
    var zero = ((amount > -0.005) && (amount < 0.005));
    blankZero = (typeof(blankZero) != "undefined") ? blankZero : this.blankZero;
    if ((blankZero == true) && zero)
    {
        this.set("", object);
    }
    else if (zero)
    {
        this.set("$0.00", object);
    }
    else
    {
			var out = "$" + Math.round(amount * 100); 
			var middle = out.length -2;
      out = out.substring(0,middle) + "." + out.substring(middle);
      this.set(out , object);
    }
  }
  //***********************************************************************/
  function TextFieldObject_set(value, object)
  {
    object = (arguments.length == 1) ? this.object : object;
    object.value = clearNull(value);
  }

  //***********************************************************************/
  //**                          CHECKBOX OBJECT                          **/
  //***********************************************************************/
  function CheckBoxObject(object)
  {
    this.get = CheckBoxObject_get;
    this.set = CheckBoxObject_set;
    this.object = object;
  }
  //***********************************************************************/
  function CheckBoxObject_get()
  {
    return this.object.checked;
  }
  //***********************************************************************/
  function CheckBoxObject_set(value)
  {
    this.object.checked = value;
  }

  //***********************************************************************/
  //**                          SELECT OBJECT                            **/
  //***********************************************************************/
  function SelectObject(object)
  {
    this.get = SelectObject_get;
    this.getAsInt = TextFieldObject_getAsInt;
    this.getDisplayedText = SelectObject_getDisplayedText;
    this.set = SelectObject_set;
    this.setElements = SelectObject_setElements;
    this.object = object;
  }
  //***********************************************************************/
  SelectObject.prototype.addOption = function(displayedText, value)
  {
    var option = document.createElement("OPTION");
    this.object.options.add(option);
    option.innerHTML = displayedText;
    option.value = value;
  }
  //***********************************************************************/
  SelectObject.prototype.removeCurrentOption = function()
  {
    this.object.removeChild(this.object.options[this.object.selectedIndex]);
  }
  //***********************************************************************/
  function SelectObject_get()
  {
    return this.object.value;
  }
  //***********************************************************************/
  function SelectObject_setElements(list)
  {
    var num = this.object.options.length;
    for (var i = 0; i < num; i++)
    {
      this.object.options.remove(0);
    }
    for (var i = 0; i < list.length; i++) {
      var option = document.createElement("OPTION");
    this.object.options.add(option);
    option.innerHTML = list[i].displayedText;
    option.value = list[i].value;
    }
    if (this.object.options.length > 0) {
      this.object.options[0].selected = true;
    }
  }
  //***********************************************************************/
  SelectObject.prototype.selectIndexByString = function(value)
  {
    for(var i = 0; i < this.object.options.length; i++)
    {
      if (this.object.options[i].text.toUpperCase().indexOf(value.toUpperCase()) == 0)
      {
        this.object.selectedIndex = i;
        return true;
      }
    }
    return false;
  }
  //***********************************************************************/
  function SelectObject_set(value)
  {
    for(var i = 0; i < this.object.options.length; i++)
    {
      if (this.object.options[i].text == value || this.object.options[i].value == value )
      {
        this.object.selectedIndex = i;
        return true;
      }
    }
    return false;
  }
  //***********************************************************************/
  function SelectObject_getDisplayedText()
  {
    return this.object.options[this.object.selectedIndex].text;
  }
  //***********************************************************************/
  //**                          SELECT ELEMENT                            **/
  //***********************************************************************/
  function SelectElement(value, displayedText)
  {
    this.value = value;
    this.displayedText = displayedText;
  }
  //***********************************************************************/
  //**                           RADIO OBJECT                            **/
  //***********************************************************************/
  function RadioObject(object)
  {
    this.get = RadioObject_get;
    this.set = RadioObject_set;
    this.object = object;
  }
  //***********************************************************************/
  function RadioObject_get()
  {
    if (this.object.length > 0)
    {
      for (var i = 0; i < this.object.length; i++)
      {
        if (this.object[i].checked)
        {
          return this.object[i].value;
        }
      }
    }
    else
    {
      return this.object.value;
    }
  }
  //***********************************************************************/
  function RadioObject_set(value)
  {
    if (this.object.length > 0)
    {
      for (var i = 0; i < this.object.length; i++)
      {
        if (this.object[i].value == value || this.object[i].name == value)
        {
          this.object[i].checked = true;
          return true;
        }
      }
      return false;
    }
    else
    {
      this.object.checked = (this.object.value == value || this.object.name == value)
      return this.object.checked;
    }
  }
  //***********************************************************************/
  //**                          HIDDEN OBJECT                            **/
  //***********************************************************************/
  HiddenObject.prototype.getAsInt      = TextFieldObject_getAsInt;
  HiddenObject.prototype.getAsDouble  = TextFieldObject_getAsDouble;
  HiddenObject.prototype.setAsCurrency = TextFieldObject_setAsCurrency;
  HiddenObject.prototype.get           = TextFieldObject_get;
  HiddenObject.prototype.set           = TextFieldObject_set;
  
  function HiddenObject(object)
  {
    this.object = object;
  }
  //***********************************************************************/
  //**                          ANCHOR OBJECT                            **/
  //***********************************************************************/
  AnchorObject.prototype.getAsInt      = TextFieldObject_getAsInt;
  AnchorObject.prototype.setAsCurrency = TextFieldObject_setAsCurrency;
  AnchorObject.prototype.getAsDouble   = TextFieldObject_getAsDouble;
  AnchorObject.prototype.get           = AnchorObject_get;
  AnchorObject.prototype.set           = AnchorObject_set;
  AnchorObject.prototype.object        = null;
  
  function AnchorObject(object)
  {
    this.object = object;
  }
  //***********************************************************************/
  function AnchorObject_get()
  {
    return this.object.innerText;
  }
  //***********************************************************************/
  function AnchorObject_set(value, object)
  {
	var useObject = (arguments.length == 1) ? this.object : object;
  	useObject.innerText = clearNull(value);
  	useObject.innerHTML = value;
  }
  //***********************************************************************/
  //**                          PARAGRAPH OBJECT                         **/
  //***********************************************************************/
  ParagraphObject.prototype.getAsInt      = TextFieldObject_getAsInt;
  ParagraphObject.prototype.setAsCurrency = TextFieldObject_setAsCurrency;
  ParagraphObject.prototype.getAsDouble   = TextFieldObject_getAsDouble;
  ParagraphObject.prototype.get           = AnchorObject_get;
  ParagraphObject.prototype.set           = AnchorObject_set;
  ParagraphObject.prototype.object        = null;

  function ParagraphObject(object)
  {
    this.object = object;
  }
  //***********************************************************************/
  //**                         DATE OBJECT                               **/
  //***********************************************************************/
  function DateObject(day, month, year)
  {
    this.day   = new SelectObject(day);
    this.month = new SelectObject(month);
    this.year  = new SelectObject(year);
    this.set           = DateObject_set;
  }
  //***********************************************************************/
  function DateObject_set(day, month, year)
  {
    this.day.set(day);
    this.month.set(month);
    this.year.set(year);
  }
  //***********************************************************************/
  //**                       REMEBERED OBJECT                            **/
  //***********************************************************************/
  function RememberedObject(value, wrapper)
  {
    this.value = value;
    this.wrapper = wrapper;
    this.getAsInt      = TextFieldObject_getAsInt;
    this.getAsDouble   = TextFieldObject_getAsDouble;
    this.setAsCurrency = TextFieldObject_setAsCurrency;
  }
  //***********************************************************************/
  RememberedObject.prototype.setObject = function(wrapper)
  {
    if (this.wrapper != null)
    {
      this.value = this.wrapper.get();
    }
    this.wrapper = wrapper;
    this.wrapper.set(this.value);
  }
  //***********************************************************************/
  RememberedObject.prototype.get = function()
  {
    return (this.wrapper == null) ? this.value : this.wrapper.get();
  }
  //***********************************************************************/
  RememberedObject.prototype.set = function(value)
  {
    if (this.wrapper == null)
    {
      this.value = value;
    } 
    else
    {
      this.wrapper.set(value);
      this.value = value;
    }
  }
  //***********************************************************************/
  //**                         ROW CREATOR OBJECT                        **/
  //***********************************************************************/
  function RowCreator(modelRow, deleteRow) 
  {
    this.table = modelRow.parentNode;
    this.row = modelRow.cloneNode(true);
    if (arguments.length < 2 || deleteRow)
    { 
      this.table.deleteRow(modelRow.rowIndex);
    }
  }
  //***********************************************************************/
  RowCreator.prototype.createNew = function(table) 
  {
    table = arguments.length == 0 ? this.table : table;
    var row = this.row.cloneNode(true);
    table.insertRow().replaceNode(row);
    return row;
  }
  //***********************************************************************/
  function getRowIndex(element)
  {
  return getRow(element).rowIndex;
  } 
   //***********************************************************************/
  function getRow(element)
  {
    return getElement(element, 'TR');
  }
  //***********************************************************************/
  function getTable(element)
  {
    return getElement(element, 'TABLE');
  }
  //***********************************************************************/
  function getElement(element, tagName)
  {
    while (element != null && element.tagName != tagName) 
    {
      element = element.parentNode;
    }
    return element;
  }
  //***********************************************************************/
  function moveRowToPosition(row, position)
  {
    row.parentElement.moveRow(row.sectionRowIndex ,position);
  }
  //***********************************************************************/
  function moveRow(row, down)
  {
    finalPlace = row.rowIndex + (down ? 1 : -1);
    if (0 <= finalPlace && finalPlace < row.parentNode.rows.length)
    {
      row.swapNode(row.parentNode.rows[finalPlace]);
    }
  }
  //***********************************************************************/
  //**                         COLLAPSABLE TABLE OBJECT                  **/
  //***********************************************************************/
  function CollapsableTable(table, lowestLevel)
  {
    this.table = table;
    this.shown = true;
    this.lowestLevel = lowestLevel;
    this.toggle = CollapsableTable_toggle;
    this.toggleButton = new AnchorObject(this.table.rows[0].cells[this.table.rows[0].cells.length-1].children[0]);
  }
  //***********************************************************************/
  function CollapsableTable_toggle()
  {
    this.shown = !this.shown;
    for(var i = this.lowestLevel + 1; i < this.table.rows.length; i++)
    {
      toggle(this.shown, this.table.rows[i]);
    }
    this.toggleButton.set(this.shown ? String.fromCharCode(9650) : String.fromCharCode(9660));
  }
  //***********************************************************************/
  //**                         LOGGER OBJECT                             **/
  //***********************************************************************/
  function Logger(on)
  {
    this.writter = null;
    this.events = null;
    this.log       = !on ? Logger_nothing : Logger_log;
    this.logTime   = !on ? Logger_nothing : Logger_logTime;
    this.stopWatch = !on ? Logger_nothing : Logger_stopWatch;
    this.lap       = !on ? Logger_nothing : Logger_lap;
    this.trackEvent= !on ? Logger_nothing : Logger_trackEvent;
    this.lapEvent  = !on ? Logger_nothing : Logger_lapEvent;
    this.logEvent  = !on ? Logger_nothing : Logger_logEvent;
    this.init      = Logger_init;
  }
  //***********************************************************************/
  function Logger_nothing()
  { 
  }
  //***********************************************************************/
  function Logger_init()
  { 
    if (this.writter == null)
    {
      window.document.write("<DIV ID='loggerOutput'>Logger</DIV>");
      this.writter = new ParagraphObject(loggerOutput);
    }
  }
  //***********************************************************************/
  function Logger_log(text)
  { 
    this.init();
    this.writter.set(this.writter.get() + '\n' + text); 
  }
  //***********************************************************************/
  function Logger_stopWatch()
  { 
    this.time = new Array();
    this.time[0] = new Date().getTime();
  }
  //***********************************************************************/
  function Logger_trackEvent(text)
  { 
    if (this.events == null) 
    {
      this.events = new Array();
    } 
    this.events[text + "lap"] = new Date().getTime();
  }
  //***********************************************************************/
  function Logger_lapEvent(text)
  { 
    if (this.events[text] == null) 
    { 
    this.events[text] = 0;
    }
    this.events[text] += new Date().getTime() - this.events[text + "lap"];
    
  }
  //***********************************************************************/
  function Logger_logEvent(text)
  { 
    this.init();
    this.logTime("E {"+ text +"}", 0, this.events[text]);
    this.events[text] = 0;
  }
  //***********************************************************************/
  function Logger_lap(text, overAll)
  { 
    this.init();
    overAll = arguments.length > 1 ? overAll : false;
    var place = this.time.length;
    this.time[place] = new Date().getTime();
    this.logTime(text, this.time[overAll ? 0 : (place-1)], this.time[place]);
  }
  //***********************************************************************/
  function Logger_logTime(text, startTime, endTime)
  { 
    this.init();
    this.writter.set(this.writter.get() + '\n' + text + "[" + (endTime - startTime) + " ms ]"); 
  }
  //***********************************************************************/
  //***********************************************************************/