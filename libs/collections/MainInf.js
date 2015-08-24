/**
 * Created by mainusr on 04.08.15.
 */


StStopC = new Mongo.Collection(null);
CScore = new Mongo.Collection(null);
if (StStopC.find().count() == 0) {
  StStopC.insert({ind:0, msg:"Start Game", st:0});
  //console.log(DeskCardsEvents);
}
if (CScore.find().count() == 0) {
  CScore.insert({ind:0, msg:"Score:", val:0});
  CScore.insert({ind:1, msg:"Maked mistakies:", val:0});
  CScore.insert({ind:2, msg:"Cards unselected:", val:0});

  //console.log(DeskCardsEvents);
}