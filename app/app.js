
  var board = null;
  var instructions = "../set/puzzle_instructions.htm";
  var faq = "../set/puzzle_faq.htm";


  //***********************************************************************/
  /**
   * This is executed when the player has found all six sets.
   * Although it will return a string of resulting page location, this
   * is not how the page is loaded. it is loaded though a call to window.location;
   *
   * @return a String of the linking page.(i believe this is necessary.
   **/
  function gameOver() {
    var URL = "http://www.setgame.com/you_completed_todays_puzzle?time=" + board.getElapsedTime();
    window.top.location = URL;
  }
  //***********************************************************************/
  function showScore(score) {
    if (document.card != null) {
      document.card.score.value = score;
    }
  }
  //***********************************************************************/
  function show(page) {
    var page = open(page, "PuzzleFrame", "scrollbars=yes,resizable=yes,toolbar=no,width=620,height=250");
    page.focus();
  }
  //***********************************************************************/
  function showTutorial() {
    var page = open("http://www.setgame.com/sites/default/files/tutorials/tutorial/SetTutorial.swf", "PuzzleFrame", "scrollbars=no,resizable=no,toolbar=no,width=604,height=404");
    page.focus();
  }
  //***********************************************************************/
  function init() {
    try {
      window.document.setsFoundTab = window.document.getElementById("setsFoundTab");
      board = new SetBoard(gameOver, showScore, window.document.getElementById("setsFound"));
      board.initSets(1, 2, 10, 1, 3, 9, 1, 5, 12, 2, 11, 12, 4, 9, 11, 5, 8, 9);
      board.initSetCards(71, 14, 74, 10, 78, 23, 64, 67, 59, 38, 54, 55);
      //board.toggleSetsFound((Cookie_getCookieValue("ShowSetsFound") != "false"));
      board.toggleSetsFound(true);
    } catch (e) {
      var platform = "\n on browser " + window.clientInformation.appName;
      platform = platform + " version " + window.clientInformation.appVersion;
      platform = platform + " for " + window.clientInformation.platform;
      alert("There is a problem with the Daily SET Puzzle on your browser, please email webmaster@setgame.com with this message and I will try to fix it\n" + e.description + "\n" + platform);
    }
  }
  //***********************************************************************/
  function setAltText(set) {
    if (set) {
      board.syncCardImageNumber();
      var i = board.imageOffset;
      document.images[i++].alt = "2 Green Diamonds Empty s";
      document.images[i++].alt = "2 Purple Diamonds Solid s";
      document.images[i++].alt = "2 Red Ovals Empty s";
      document.images[i++].alt = "1 Red Diamonds Solid ";
      document.images[i++].alt = "3 Purple Ovals Empty s";
      document.images[i++].alt = "2 Purple Ovals Solid s";
      document.images[i++].alt = "1 Red Diamonds Empty ";
      document.images[i++].alt = "1 Purple Diamonds Empty ";
      document.images[i++].alt = "2 Purple Squiggles Empty s";
      document.images[i++].alt = "2 Red Diamonds Striped s";
      document.images[i++].alt = "3 Green Ovals Striped s";
      document.images[i++].alt = "1 Red Squiggles Empty ";
    }
  }
