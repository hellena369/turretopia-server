let { base1:  o1 , base1protected:  p1  } = require('../tiles/tdm.js'),
    { bossSpawn:   b , atmg:  A   , outside:  o} = require('../tiles/siege.js'),
    { wall: WALL, nest:  n , normal:   _  } = require('../tiles/misc.js'),
    { rock:   r  } = require('../tiles/decoration.js'),

// Yes. I am aware that the food distract the ATMGs, but ask trplnr why he put normal's instead of outside's outside the room
room = [
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o , A  ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  o ,  o ],
    [  o , A  ,  o ,  o , A  ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o , A  ,  o ,  o ,  o ,  o ,WALL, o  ,  o ],
    [  o ,  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,  o ,  o ,  o ,  o ,  o ,WALL,  o ,WALL,WALL,WALL,  o ,  o ,  o ,WALL,WALL,WALL],
    [  o ,  o ,  o ,  o ,  o ,WALL,  r ,  r ,WALL, A  ,  o ,  o ,  o ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,WALL, A  ,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,WALL,  r ,  r ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
    [  o , A  ,WALL,  o ,  o ,WALL,  o ,WALL,WALL,WALL,WALL,WALL,WALL,  o ,WALL,WALL,WALL,WALL,WALL,WALL,  o ,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,WALL,  r ,  r ,  r ,WALL,  o ,  o ,  o ,  o ,  o ,WALL,  b ,  b ,  b ,WALL,  o ,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,WALL,  r , o  ,  r ,WALL,WALL,WALL,  o ,WALL,WALL,WALL,  o ,  o ,  o ,WALL,  o ,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,WALL,  r ,  r ,  r ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,WALL,  o ,WALL,WALL,  o ,  o ,WALL,WALL,WALL],
    [ o  , A  ,WALL,  o ,  o ,WALL,  r ,  r ,  r ,WALL,  _ , o1 , o1 , o1 ,  _ ,WALL,  o ,  o ,  o ,WALL,  o ,  o ,  o ,  o ,WALL],
    [  o ,  o ,  o ,  o ,  o ,WALL,  r ,  r ,  r ,  o ,  _ , o1 , p1 , o1 ,  _ ,  o ,  o , o  ,  o ,WALL,  o ,  o ,WALL,  o ,WALL],
    [  o ,  o ,  o ,  o ,  o ,WALL,  r ,  r ,  r ,WALL,  _ , o1 , o1 , o1 ,  _ ,WALL,  o ,  o ,  o ,WALL,  o , A  ,WALL, o  ,WALL],
    [  o ,  o ,  o ,  o ,  o ,WALL,WALL,  r ,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,WALL,WALL,WALL,WALL,  o ,  o ,WALL,  o ,WALL],
    [  o , A  ,WALL,  o ,  o ,WALL,  r ,  r ,  r ,WALL,  _ ,WALL,WALL,WALL,  _ ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,WALL,WALL,WALL],
    [  o ,  o ,  o ,  o ,  o ,WALL,  r ,  r ,  r ,WALL,  r ,  o ,  o ,  o ,  r ,WALL,  o ,  o ,  o ,  o ,WALL,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,WALL,WALL,WALL,  o ,WALL,WALL,WALL,WALL,WALL,WALL,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  b ,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  r ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o , A  ,  o , A  ,  o ],
    [  o , A  ,WALL,  o ,  o ,  o ,  o ,WALL,  o ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  o ,  o ,  o ,  b ,  o , o  ,  o ,  b ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  o , A  ,  o ,  o ,  o , A  ,  o , A  ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  b ,  o ,  o ],
];

module.exports = room;