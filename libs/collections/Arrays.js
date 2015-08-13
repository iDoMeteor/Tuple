/**
 * Created by mainusr on 03.08.15.
 */

Mongo.CardsProp = new Mongo.Collection( "CardsProp" );

Mongo.CardsPairs = new Mongo.Collection( "CardsPairs" );

//////////////////
function SInr1( Figure, val, param ) {
  return ( Figure + 1 + Math.floor( val / param ) % 2 ) % 3;
}

function SInr2( Figure, val, param ) {
  return ( Figure + 2 - Math.floor( val / param ) % 2 ) % 3;
}

function CRand( Num ) {
  return Math.floor( Math.random() * Num );
}

CardsPairs.d = [];

CardsPairs.clears = function () {
  var j;
  for ( j = 0; j < this.d.length; j++ ) this.d[ j ].splice( 0, this.d[ j ].length );
  this.d.splice( 0, this.d.length );
};
//////////////Cards Prop
CardsProp.d = []; //include dates
CardsProp.fr = [];
CardsProp.restart = function () {
  this.d.splice( 0, this.d.length );
  this.fr.splice( 0, this.fr.length );
  CardsPairs.clears();
  if ( CardsProp.d.length == 0 ) {
    for ( i = 0; i < 81; i++ ) {
      CardsProp.fr[ i ] = i;
      CardsProp.d[ i ] = [];
      CardsPairs.d[ i ] = [];
      CardsProp.d[ i ][ 0 ] = i % 3;
      CardsProp.d[ i ][ 1 ] = Math.floor( i / 3 ) % 3;
      CardsProp.d[ i ][ 2 ] = Math.floor( i / 9 ) % 3;
      CardsProp.d[ i ][ 3 ] = Math.floor( i / 27 ) % 3;
      CardsProp.d[ i ][ 4 ] = 0; // used 1 , 0 not use
      for ( j = 0; j < 8; j++ ) {
        CardsPairs.d[ i ][ ( j << 1 ) ] = SInr1( CardsProp.d[ i ][ 0 ], j, 1 ) + SInr1( CardsProp.d[ i ][ 1 ], j, 2 ) * 3 + SInr1( CardsProp.d[ i ][ 2 ], j, 4 ) * 9 + SInr1( CardsProp.d[ i ][ 3 ], j, 8 ) * 27;
        CardsPairs.d[ i ][ ( j << 1 ) + 1 ] = SInr2( CardsProp.d[ i ][ 0 ], j, 1 ) + SInr2( CardsProp.d[ i ][ 1 ], j, 2 ) * 3 + SInr2( CardsProp.d[ i ][ 2 ], j, 4 ) * 9 + SInr2( CardsProp.d[ i ][ 3 ], j, 8 ) * 27;
      }
    }

  }

};

CardsProp.GetFreeInd = function () {
  if ( this.fr.length != 0 ) {
    var ppr = CRand( this.fr.length );
    this.fr.splice( ppr, 1 );
    this.d[ ppr ][ 4 ] = 1;
    return ppr;
  } else return ( -1 );
};

CardsProp.MakeUsedInd = function ( Ind ) { /*will be optimise*/
  var j;
  var allreadyused = false;
  for ( j = 0; j < this.fr.length; j++ ) {
    if ( this.fr[ j ] == Ind ) {
      allreadyused = true;
      this.fr.splice( j, 1 );
      break;
    }
  }
  this.d[ Ind ][ 4 ] = 1;
  return allreadyused;
};

CardsProp.IsUsed = function ( Ind ) { /*will be optimise*/
  var j;
  var allreadyused = false;
  for ( j = 0; j < this.fr.length; j++ ) {
    if ( this.fr[ j ] == Ind ) {
      allreadyused = true;
      break;
    }
  }
  return allreadyused;
};

////////////////Cards Pairs
CardsPairs.IsPair = function ( One, Two ) {
  for ( var j = 0; j < 3; j++ ) {
    if ( CardsProp.d[ One ][ j ] == CardsProp.d[ Two ][ j ] ) return false;
  }
  return true;
};