/**
 * Created by mainusr on 26.07.15.
 */
Meteor.startup(MStart);


function MStart (){
}

function updateByTmpCardInd(Ind){
    DeskCardsC.update({ind:TmpCards[Ind]},{$set:{val:TCards.d[TmpCards[Ind]], par:CardsProp.d[TCards.d[TmpCards[Ind]]]}});
}

function GenNewCards (){ //generate next cards
   // console.clear(); console.log("Start add new cards");
    if (TmpCards[4] < 1) return true; // no eny cards in the deck
    var j; var k; var t; var TmPairs = []; var TMSets = []; var ppar;
    for (j =1; j<4; j++) TCards.MakeFreeInd(TmpCards[j]);
    if (CardsProp.fr.length<1) {for(j = 1; j<4; j++){TCards.d[TmpCards[j]]=81; updateByTmpCardInd(j);} return true;}
    //find pairs
    for(j = 0; j<12; j++) TmPairs[j]=[];
    for (j = 0;  j< 12; j++)
        if (TCards.d[j]>-1)
            for (k = j+1; k<12; k++)
                if (TCards.d[k] >-1)
                    if (CardsPairs.IsPair(TCards.d[j], TCards.d[k])===1){
                        TmPairs[j][TmPairs[j].length]= k; TmPairs[k][TmPairs[k].length]= j; }

    //find sets
    for (j = 0; j<12 ; j++)
        if (TmPairs[j].length>1) // (typeof TmPairs[j] != undefined)
            for (k =j+1; k<TmPairs[j].length; k++)
               if(typeof TmPairs[j][k+1] !=undefined)
                   for (t = k+1; t<TmPairs[j].length; t++)
                       if (TCards.d[j] + TCards.d[k] + TCards[t] == 120){ //set was finded
                        TMSets[TMSets.length] = j; TMSets[TMSets.length] = k; TMSets[TMSets.length] = t;
               }

    //console.log("Sets", TMSets); //show help on console

    //to be completed by new cards from deck
    if (TMSets.length>0){//if we have set in desk cards
        for (j = 1; j<4; j++){
            TmpCards[j] = TCards.InsertVal(CardsProp.GetFreeInd); //use random cards from deck;
            updateByTmpCardInd(j);//update collection
        }      console.log("Help to you44:", TCards.d[TmpCards[1]], TCards.d[TmpCards[2]], TCards.d[TmpCards[3]]);
    }
    else {  //try to find card form making 'set' whi some cards 'pair'
        var NoPairs = true;
        var FC = j = CRand(12);  //get random index of desk card
        var SC; //second card index of desk card
        do {
            if (typeof TmPairs[FC] != undefined){// console.log("TmPairs[",FC,"]51=", TmPairs[FC]);
                if (TmPairs[FC].length>0){
                    SC = k = CRand(TmPairs[FC].length); //find 'pair' and third card to create set
                    do {
                        t = 120 - TCards.d[FC] -TCards.d[TmPairs[FC][SC]];
                        if (CardsProp.NotUsed(t)==1){ //can create 'set'?

                            CardsProp.MakeUsedInd(t);
                            TmpCards[1] = TCards.InsertVal(t);
                            updateByTmpCardInd(1);
                            //get other 2 random card from the deck
                            for (ppar = 2; ppar < 4; ppar++){
                                TmpCards[ppar] = TCards.InsertVal(CardsProp.GetFreeInd()); //use random cards from deck;
                                updateByTmpCardInd(ppar);
                            }  console.log("Help to you 64", TCards.d[FC], TCards.d[TmPairs[FC][SC]], t);
                            FC=j-1; SC=TmPairs[j].length-1; NoPairs=false;
                            return true;//break;
                        }
                        SC++; if (SC >=TmPairs[FC].length ) SC = 0;
                    }while (SC != k)
                }
            }
            FC++; if (FC > 11) FC = 0;
        }while(FC != j);
        //if can't create new set ussing 'pairs' of desk cards
        if (NoPairs){ console.log("No eny sets and Pairs", TCards.d);console.log("TmPairs78", TmPairs);
            FC = j = CRand(12);
            do {
                if (TCards.d[FC]>-1 && TCards.d[FC]<81){
                SC = k = CRand(16);
                do {
                    if(CardsProp.NotUsed(CardsPairs.d[TCards.d[FC]][SC])==1){// can get a 'pair'
                        t = 120 - TCards.d[FC] -  CardsPairs.d[TCards.d[FC]][SC];
                        if (CardsProp.NotUsed(t)==1){// can create 'set'?
                            console.log("t85=",t);
                            FC = TCards.d[FC];
                            //add third card
                            CardsProp.MakeUsedInd(t);
                            TmpCards[1] = TCards.InsertVal(t);
                            updateByTmpCardInd(1);

                            //add second card
                            t = CardsPairs.d[FC][SC];
                            CardsProp.MakeUsedInd(t);
                            TmpCards[2] = TCards.InsertVal(t);
                            updateByTmpCardInd(2);

                            //add first card
                            /*t =FC;
                            CardsProp.MakeUsedInd(t);*/
                            TmpCards[3] = TCards.InsertVal(CardsProp.GetFreeInd());
                            updateByTmpCardInd(3);
                            //finish all loops
                            console.log("Help to you99", TCards.d[TmpCards[1]], TCards.d[TmpCards[2]],FC, TCards.d);
                            FC=j-1; //if (FC<0) FC=CardsProp.fr.length;
                            return true;//break;
                        }
                    }
                    SC++; if (SC >= 16) SC = 0;
                }while (SC != k);
                }
                FC++; if (FC >= 12) FC = 0;
            }while(FC != j);

        }
    }
    for(j = 1; j<4; j++) {TCards.d[TmpCards[j]]=81; updateByTmpCardInd(j);}
    console.log("All variants a finish", TCards.d, TCards.fr, CardsProp.fr);

}

function CardClick(e)
{
  if (TmpCards[0] == -1) return true;
   var DCI = e.currentTarget["id"]; ///DeskCardInd
    if (DCI=="") DCI = e.currentTarget.parentNode["id"];
    DCI= parseInt( DCI.substr(4));
    var rdc = DeskCardsC.find({ind:DCI}).fetch(); //
    if (rdc[0].mcl==CardCSS[0])
    {
        if (TCards.d[DCI] == 81) {alert("It's not card for play!"); return true;}
        switch (TmpCards[0])
        {
            case 0://selected first card
                TmpCards[0]++; TmpCards[1]= DCI; DeskCardsC.update({ind:DCI},{$set:{mcl:CardCSS[1]}});
                break;
            case 1://selected second card
               // console.log("Second card Sel", TCards.d);
                if (CardsPairs.IsPair(TCards.d[DCI], TCards.d[TmpCards[1]])===1){
                    TmpCards[0]++; TmpCards[2] = DCI; DeskCardsC.update({ind:DCI},{$set:{mcl:CardCSS[1]}});
                }
                else{alert("Wrong card! Try other..."); CScore.update({ind:1}, {$inc:{val:1}});}
                break;
            case 2://selected third card
                if (TCards.d[TmpCards[1]] + TCards.d[TmpCards[2]] + TCards.d[DCI] == 120){
                    TmpCards[0]=0; TmpCards[3] = DCI;
                    DeskCardsC.update({mcl:CardCSS[1]},{$set:{mcl:CardCSS[0]}}, {multi: true});
                    CScore.update({ind:0}, {$inc:{val:3}}); GenNewCards();
                }
                else{alert("Wrong card! Try other..."); CScore.update({ind:1}, {$inc:{val:1}});}
                break;
            default:return false; // game not started or have a some problem
        }
    }
    else
    {    //deselecting cards
        DeskCardsC.update({mcl:CardCSS[1]},{$set:{mcl:CardCSS[0]}}, {multi: true});
        TmpCards[0]=0;
        CScore.update({ind:2}, {$inc:{val:1}});
    }
}

Template.PlayDesk.events(
    {'click': function(e){/* console.log(e);*/ CardClick(e);  e.preventDefault(); }
});

Template.PlayDesk.helpers({fld: function() {return DeskCardsC.find(); }});

function CRand (Num){return Math.floor(Math.random()*Num); }

function IsUsed(Buff, value)
{
    res = false;
    for (var j =0; j< Buff.length; j++)
    {
        if (Buff[j]==value){ res =true; break;}
    }
    return res;
}

function nIsUsed(Buff, value, len)
{
    res = false;
    for (var j =0; j< len; j++)
    {
        if (Buff[j]==value){ res =true; break;}
    }
    return res;
}

function GetFrSpace(Buff, Num){
    var ppar = CRand(Num);
    var ppar2 = ppar;
    //find free ind
    while (Buff[ppar]!='-1'){
        ppar ++;
        if (ppar ==Num) ppar=0;
        if (ppar == ppar2) break;
    }
    Buff[ppar]=ppar;
    return ppar;
}

function StartBtnClick  (e){
    var ts = StStopC.find({ind:0}).fetch();
    CardsProp.restart(); TCards.reset();
    var j ; var ppar; var tcd; var sum=0;
    if (ts[0].st ==0)     { StStopC.update({ind:0},{$set:{ msg:"Stop Game", st:1}});
        CScore.update({ind:0}, {$set:{val:0}});
        CScore.update({ind:1}, {$set:{val:0}});
        CScore.update({ind:2}, {$set:{val:0}});
        /// initialization of game
        tcd = CardsProp.GetFreeInd();
        ppar=TCards.InsertVal(tcd);
        sum=tcd;
        console.log(tcd);
        ///initialisation second card
        j = CRand(16);    tcd = j;
        while (CardsProp.IsUsed(CardsPairs.d[sum][tcd])==1) {tcd++; if (tcd == 12)tcd = 0; if (tcd==j)break;}
        tcd = CardsPairs.d[sum][tcd];
        console.log(tcd);
        CardsProp.MakeUsedInd(tcd);
        TCards.InsertVal(tcd);
        sum+=tcd;
        /// initialisation third card
        tcd = 120 - sum;
        console.log(tcd);
        CardsProp.MakeUsedInd(tcd);
        TCards.InsertVal(tcd);
        ///initialization other 9 cards
        for (j =0; j<9; j++)  TCards.InsertVal(CardsProp.GetFreeInd());
        /// update data to collection
        for (j = 0 ; j<12; j++) DeskCardsC.update({ind:j},{$set:{mcl: CardCSS[0], val: TCards.d[j], par: CardsProp.d[TCards.d[j]]}});
        ///initialisation of temparery selected cards inf
        TmpCards[0]=TmpCards[1]=TmpCards[2]=TmpCards[3]=0; TmpCards[4] = 26;
        /// ready for play
    }
    else {
        StStopC.update({ind:0},{$set:{ msg:"Start Game", st:0}});
        TmpCards[0]=TmpCards[1]=TmpCards[2]=TmpCards[3]=TmpCards[4]=-1;
        //stopping game
    }
}

Template.MainInf.events(
    {'click #startbtn': function(e){ StartBtnClick(e);  e.preventDefault(); }
    });

Template.MainInf.helpers({BtnSt: function() {return StStopC.find(); }, GameInf: function() {return CScore.find(); }});

