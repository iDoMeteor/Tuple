/**
 * Created by mainusr on 03.08.15.
 */
DeskCardsC = new Mongo.Collection(null);
TmpCards=[-1,-1,-1,-1, 26];
CardCSS=["card", "cardsel"];


if (DeskCardsC.find().count() == 0) {
    CardsProp.restart(); var j;
    for (j = 0; j < 12; j++) {
        DeskCardsC.insert({ind: j,mcl: "card", val: j, par: CardsProp.d[j]});
    }
}