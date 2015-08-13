/**
 * Created by mainusr on 26.07.15.
 */
Meteor.startup( MStart );


function MStart() {

}

function GenNewCards() { //generate next cards
  var j;
  var k;
  var st;
  var fr;
  var sec;
  var frj;
  var secj;
  if ( TmpCards[ 4 ] === 0 ) {
    StartBtnClick( j );
    return false;
  } //finish game
  TmpCards[ 4 ]--;
  TmpCards[ 0 ] === 0;
  var TmpPairs = [];
  var TmpSets = [];
  TCards[ TmpCards[ 1 ] ] = TCards[ TmpCards[ 2 ] ] = TCards[ TmpCards[ 3 ] ] = -1;
  //check for 'pairs'
  if ( CardsProp.fr.length === 0 ) return true;
  for ( j = 0; j < 12; j++ ) {
    TmpPairs[ j ] = [];
    if ( TCards[ j ] == -1 ) continue;
    for ( k = j + 1; k < 12; k++ ) {
      if ( TCards[ k ] != -1 ) {
        if ( CardsPairs.IsPair( TCards[ j ], TCards[ k ] ) ) {
          TmpPairs[ j ][ TmpPairs[ j ].length ] = k; //TmpPairs[k][TmpPairs[k].length-1]=j;
        }
      }
    }
  }
  //check for 'set'
  for ( j = 0; j < 12; j++ ) {
    if ( TmpPairs[ j ].length < 0 ) continue;
    for ( k = 0; k < TmpPairs[ j ].length; k++ ) {
      for ( st = k + 1; st < TmpPairs[ j ].length; st++ ) {
        if ( TCards[ j ] + TCards[ TmpPairs[ j ][ k ] ] + TCards[ TmpPairs[ j ][ st ] ] == 120 ) {
          TmpSets[ TmpSets.length ] = j;
          TmpSets[ TmpSets.length ] = k;
          TmpSets[ TmpSets.length ] = st;
          k = st = TmpPairs[ j ].length;
          j = 12;
          break;
        }
      }
    }
  }
  //upload new cards
  // check for ready sets
  if ( TmpSets.length != 0 ) {
    console.log( "Sets is includes" );
    for ( j = 0; j < 3; j++ ) {
      k = CardsProp.GetFreeInd(); // CRand(81);
      st = GetFrSpace( TCards, 12 );
      TCards[ st ] = k;
      DeskCardsC.update( {
        ind: st
      }, {
        $set: {
          mcl: "card",
          val: k,
          par: CardsProp.d[ k ]
        }
      } );
      return true;
    }
  } else {
    var NoPair = true;
    frj = fr = CRand( TmpPairs.length );
    console.log( TmpPairs );
    console.log( "Find Pair..." );
    do {
      if ( TmpPairs[ frj ].length != 0 ) {
        sec = secj = CRand( TmpPairs[ frj ].length );
        do {

          st = 120 - TCards[ frj ] - TCards[ TmpPairs[ frj ][ secj ] ];
          console.log( st );
          if ( st > -1 && st < 81 ) {
            if ( CardsProp.d[ st ][ 4 ] == 0 ) {
              console.log( "Pair finded" );
              NoPair = false;
              CardsProp.MakeUsedInd( st );
              k = GetFrSpace( TCards, 12 );
              TCards[ k ] = st;
              DeskCardsC.update( {
                ind: k
              }, {
                $set: {
                  mcl: "card",
                  val: st,
                  par: CardsProp.d[ st ]
                }
              } );
              for ( j = 0; j < 2; j++ ) {
                st = CardsProp.GetFreeInd();
                k = GetFrSpace( TCards, 12 );
                TCards[ k ] = st;
                DeskCardsC.update( {
                  ind: k
                }, {
                  $set: {
                    mcl: "card",
                    val: st,
                    par: CardsProp.d[ st ]
                  }
                } );
              }
              sec = secj - 1;
              fr = frj - 1;
              return true;
            }
          }
          secj++;
          if ( secj == TmpPairs[ frj ].length ) secj = 0;
        } while ( sec != secj );
      }
      frj++;
      if ( frj == TmpPairs.length ) frj = 0;
    } while ( frj != fr );
    //////////// no 'pairs'
    if ( NoPair ) {
      fr = frj = CRand( CardsProp.fr.length );
      do {
        k = CardsProp.fr[ frj ];
        sec = secj = CRand( 16 );
        do {
          j = CardsPairs.d[ k ][ secj ];
          if ( CardsProp.d[ j ][ 4 ] == 0 ) {
            st = 120 - k - j;
            if ( ( st > -1 ) && ( st < 81 ) ) {
              if ( CardsProp.d[ st ][ 4 ] == 0 ) {
                sec = GetFrSpace( TCards, 12 );
                TCards[ sec ] = k;
                DeskCardsC.update( {
                  ind: sec
                }, {
                  $set: {
                    mcl: "card",
                    val: k,
                    par: CardsProp.d[ k ]
                  }
                } );

                sec = GetFrSpace( TCards, 12 );
                TCards[ sec ] = j;
                DeskCardsC.update( {
                  ind: sec
                }, {
                  $set: {
                    mcl: "card",
                    val: j,
                    par: CardsProp.d[ j ]
                  }
                } );

                sec = GetFrSpace( TCards, 12 );
                TCards[ sec ] = st;
                DeskCardsC.update( {
                  ind: sec
                }, {
                  $set: {
                    mcl: "card",
                    val: st,
                    par: CardsProp.d[ st ]
                  }
                } );
                return true;
              }
            }
          }
          secj++;
          if ( secj == 16 ) secj = 0;
        } while ( sec = secj );
        frj++;
        if ( frj == CardsProp.fr.length ) frj = 0;
      } while ( fr != frj );

    }
  }
}

function CardClick( e ) {
  if ( TmpCards[ 0 ] == -1 ) return true;
  var DeskCardInd = e.currentTarget[ "id" ];
  if ( DeskCardInd == "" ) DeskCardInd = e.currentTarget.parentNode[ "id" ];
  DeskCardInd = parseInt( DeskCardInd.substr( 4 ) );
  var ts = DeskCardsC.find( {
    ind: DeskCardInd
  } ).fetch();
  if ( ts[ 0 ].mcl == "card" ) {
    ts[ 0 ].mcl = "cardsel";
    if ( TmpCards[ 0 ] == 0 ) {
      ///operating with first card
      TmpCards[ 1 ] = DeskCardInd;
      TmpCards[ 0 ] = 1;
    } else {
      if ( TmpCards[ 0 ] == 1 ) {
        ///operating with first card
        if ( IsUsed( CardsPairs.d[ ts[ 0 ].val ], TCards[ TmpCards[ 1 ] ] ) ) {
          TmpCards[ 2 ] = DeskCardInd;
          TmpCards[ 0 ] = 2;
        } else {
          alert( "Wrong card! Try other..." );
          ts[ 0 ].mcl = "card";
          CScore.update( {
            ind: 1
          }, {
            $inc: {
              val: 1
            }
          } );
        }
      } else {
        if ( TmpCards[ 0 ] == 2 ) {
          if ( TCards[ TmpCards[ 1 ] ] + TCards[ TmpCards[ 2 ] ] + ts[ 0 ].val == 120 ) {
            alert( 'Good!' );
            TmpCards[ 0 ] = 3;
            TmpCards[ 3 ] = DeskCardInd;
            /*generate new cards*/
            ts[ 0 ].mcl = "card";
            GenNewCards();
            CScore.update( {
              ind: 0
            }, {
              $inc: {
                val: 3
              }
            } );
          } else {
            alert( "Wrong card! Try other..." );
            ts[ 0 ].mcl = "card";
            CScore.update( {
              ind: 1
            }, {
              $inc: {
                val: 1
              }
            } );
          }
        }
      }
    }
  } else { ////deselecting card
    ts[ 0 ].mcl = "card";
    TmpCards[ 0 ] = 0;
    DeskCardsC.update( {
      mcl: "cardsel"
    }, {
      $set: {
        mcl: ts[ 0 ].mcl
      }
    }, function ( error ) {
      if ( error ) {
        alert( error.reason );
      }
    } );
    CScore.update( {
      ind: 2
    }, {
      $inc: {
        val: 1
      }
    } );
    console.log( DeskCardsC.find().fetch() );
  }
  DeskCardsC.update( {
    ind: DeskCardInd
  }, {
    $set: {
      mcl: ts[ 0 ].mcl
    }
  }, function ( error ) {
    if ( error ) {
      alert( error.reason );

    }
  } );
}


Template.PlayDesk.events( {
  'click': function ( e ) {
    console.log( e );
    CardClick( e );
    e.preventDefault();
  }
} );

Template.PlayDesk.helpers( {
  fld: function () {
    return DeskCardsC.find();
  }
} );

function CRand( Num ) {
  return Math.floor( Math.random() * Num );
}

function IsUsed( Buff, value ) {
  res = false;
  for ( var j = 0; j < Buff.length; j++ ) {
    if ( Buff[ j ] == value ) {
      res = true;
      break;
    }
  }
  return res;
}

function nIsUsed( Buff, value, len ) {
  res = false;
  for ( var j = 0; j < len; j++ ) {
    if ( Buff[ j ] == value ) {
      res = true;
      break;
    }
  }
  return res;
}

function GetFrSpace( Buff, Num ) {
  var ppar = CRand( Num );
  var ppar2 = ppar;
  //find free ind
  while ( Buff[ ppar ] != '-1' ) {
    ppar++;
    if ( ppar == Num ) ppar = 0;
    if ( ppar == ppar2 ) break;
  }
  Buff[ ppar ] = ppar;
  return ppar;
}

function StartBtnClick( e ) {
  var ts = StStopC.find( {
    ind: 0
  } ).fetch();
  CardsProp.restart();
  var j;
  var ppar;
  var tcd;
  var sum = 0;
  if ( ts[ 0 ].st == 0 ) {
    StStopC.update( {
      ind: 0
    }, {
      $set: {
        msg: "Stop Game",
        st: 1
      }
    } );

    CScore.update( {
      ind: 0
    }, {
      $set: {
        val: 0
      }
    } );
    CScore.update( {
      ind: 1
    }, {
      $set: {
        val: 0
      }
    } );
    CScore.update( {
      ind: 2
    }, {
      $set: {
        val: 0
      }
    } );
    /// initialization of game
    TCards.splice( 0, TCards.length );
    for ( j = 0; j < 12; j++ ) {
      TCards[ j ] = -1;
    }
    ppar = GetFrSpace( TCards, 12 );
    tcd = CardsProp.GetFreeInd(); //select random card and select it
    sum = tcd;
    console.log( tcd );
    TCards[ ppar ] = tcd;
    ///initialisation second card
    j = CRand( 16 );
    tcd = j;
    while ( CardsProp.d[ CardsPairs.d[ TCards[ ppar ] ][ tcd ] ][ 4 ] == 1 ) {
      tcd++;
      if ( tcd == 12 ) tcd = 0;
      if ( tcd == j ) break;
    }
    tcd = CardsPairs.d[ TCards[ ppar ] ][ tcd ];
    console.log( tcd );
    CardsProp.MakeUsedInd( tcd );
    TCards[ GetFrSpace( TCards, 12 ) ] = tcd;
    sum += tcd;
    /// initialisation third card
    tcd = 120 - sum;
    console.log( tcd );
    CardsProp.MakeUsedInd( tcd );
    TCards[ GetFrSpace( TCards, 12 ) ] = tcd;
    ///initialization other 9 cards
    for ( j = 0; j < 9; j++ ) TCards[ GetFrSpace( TCards, 12 ) ] = CardsProp.GetFreeInd();
    /// update data to collection
    for ( j = 0; j < 12; j++ ) DeskCardsC.update( {
      ind: j
    }, {
      $set: {
        mcl: "card",
        val: TCards[ j ],
        par: CardsProp.d[ TCards[ j ] ]
      }
    } );
    ///initialisation of temparery selected cards inf
    TmpCards[ 0 ] = TmpCards[ 1 ] = TmpCards[ 2 ] = TmpCards[ 3 ] = 0;
    TmpCards[ 4 ] = 26;
    /// ready for play
  } else {
    StStopC.update( {
      ind: 0
    }, {
      $set: {
        msg: "Start Game",
        st: 0
      }
    } );
    TmpCards[ 0 ] = TmpCards[ 1 ] = TmpCards[ 2 ] = TmpCards[ 3 ] = TmpCards[ 4 ] = -1;

    //stopping game
  }
}

Template.MainInf.events( {
  'click #startbtn': function ( e ) {
    StartBtnClick( e );
    e.preventDefault();
  }
} );

Template.MainInf.helpers( {
  BtnSt: function () {
    return StStopC.find();
  },
  GameInf: function () {
    return CScore.find();
  }
} );