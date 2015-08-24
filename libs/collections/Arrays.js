/**
 * Created by mainusr on 03.08.15.
 */

CardsProp= {};
CardsPairs= {};
TCards={};
//////////////////
function SInr1(Figure, val, param)
{
    return (Figure+1+Math.floor(val/param)%2)%3;
}
function SInr2(Figure, val, param)
{
    return (Figure+2-Math.floor(val/param)%2)%3;
}
function CRand (Num){return Math.floor(Math.random()*Num); }

CardsPairs.d = [];

CardsPairs.clears=function(){
   var j ;
    for (j = 0; j< this.d.length; j++) this.d[j].splice(0, this.d[j].length);
    this.d.splice(0, this.d.length);
};
//////////////Cards Prop
CardsProp.d = []; //include dates
CardsProp.fr = []; //index of cards in the deck
CardsProp.restart = function() {
    this.d.splice(0, this.d.length); this.fr.splice(0, this.fr.length);
    CardsPairs.clears();
    if (this.d.length == 0) {
        this.d[81]= [] ;
        this.d[81][0]=this.d[81][1]=this.d[81][2]=this.d[81][3]=0;this.d[81][4]=-1;
        for (i = 0; i < 81; i++) { //genetare data of crads, deck and pairs
            this.fr[i] = i; //index of card in deck
            this.d[i] = []; //initialisation of card data
            CardsPairs.d[i] = []; //initialisation of cards 'pairs' data
            this.d[i][0] = i % 3;
            this.d[i][1] = Math.floor(i / 3) % 3;
            this.d[i][2] = Math.floor(i / 9) % 3;
            this.d[i][3] = Math.floor(i / 27) % 3;
            this.d[i][4] = 0; // used 1 , 0 not use
            for (j = 0; j < 8; j++) { //generate 'pairs' for card with index equal i
                CardsPairs.d[i][(j << 1)] = SInr1(CardsProp.d[i][0], j, 1) + SInr1(CardsProp.d[i][1], j, 2) * 3 + SInr1(CardsProp.d[i][2], j, 4) * 9 + SInr1(CardsProp.d[i][3], j, 8) * 27;
                CardsPairs.d[i][(j << 1) + 1] = SInr2(CardsProp.d[i][0], j, 1) + SInr2(CardsProp.d[i][1], j, 2) * 3 + SInr2(CardsProp.d[i][2], j, 4) * 9 + SInr2(CardsProp.d[i][3], j, 8) * 27;
            }
        }

    }

};

CardsProp.GetFreeInd=function() //get random card from the deck
{
    if (this.fr.length !=0) {
        var ppr = CRand(this.fr.length); var ind=this.fr[ppr];
        this.d[ind][4] = 1; //mark card as ussing card
        this.fr.splice(ppr,1); //remove card from the deck
        return ind; // return index of card
    }
    else return (-1);
};

CardsProp.MakeUsedInd = function(Ind){//Maked ussing card by index
    var j; var allreadyused = true;
    for (j=0; j< this.fr.length; j++) //find card in the deck
    {
        if (this.fr[j] == Ind){
            allreadyused = false; //card was not used
            this.fr.splice(j,1); //remove card from the deck
            break;
        }
    }
    this.d[Ind][4] = 1; //mark card as ussing
    return allreadyused; //return was card ussing befor marking it
};

CardsProp.IsUsed=function(Ind){//check is card with index Ind ussing
    if (Ind >-1 && Ind < 81){
        if (this.d[Ind][4]==1) return 1;
        else return 0;
    }
    else console.log("Wrong Ind=", Ind); return -1; }; //show wrong index

CardsProp.NotUsed=function(Ind){//check is card with index Ind ussing
    if (Ind >-1 && Ind < 81){
        if (this.d[Ind][4]===1) return 0;
        else return 1;
    }
    else console.log("Wrong Ind=", Ind); return -1; }; //show wrong index
////////////////Cards Pairs
CardsPairs.IsPair= function(One, Two)
{   if (One<0 || One>80) {console.log("Wrong firs parametr of Pair", One); return -1;}
    if (Two<0 || Two>80) {console.log("Wrong firs parametr of Pair", Two); return -1;}
    for (var j = 0; j<4; j++)
        if(CardsProp.d[One][j] ==CardsProp.d[Two][j])
            return 0;
    return 1;};
/////////////////TCards
TCards.d=[]; //include datas
TCards.fr=[];//include indexes of free data elems
TCards.reset = function(){  for (var j=0; j<12;j++) {this.d[j]='-1'; this.fr[j]=j;}};
///
TCards.MakeFreeInd=function(Ind){ if (Ind>-1 && Ind<12){
    if (this.d[Ind]>-1){this.d[Ind]=-1; this.fr[this.fr.length]=Ind;} }
else console.log("SInd-", Ind)};
///
TCards.GetFreeInd = function(){ if (this.fr.length<1){return -1;}
else{ var ppar = CRand(this.fr.length); var res = this.fr[ppar];
this.fr.splice(ppar, 1); return res; }};
///insert value in free space prefer
TCards.InsertVal = function(Val){if (this.fr.length<1){return -1;}
else{ var ppar = CRand(this.fr.length); var res = this.fr[ppar];
    this.fr.splice(ppar, 1); this.d[res]=Val; return res; } };

