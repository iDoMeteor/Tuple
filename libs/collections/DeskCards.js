/**
 * Created by mainusr on 03.08.15.
 */
DeskCardsC = new Mongo.Collection();
TmpCards=[-1,-1,-1,-1, 26];
TCards=[];
if (DeskCardsC.find().count() == 0) {
    CardsProp.restart();
    for (var j = 0; j < 12; j++) {
        DeskCardsC.insert({ind: j,mcl: "card", val: j, par: CardsProp.d[j]});
    }
}