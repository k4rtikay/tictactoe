
const container = document.querySelector('.container');

/*function playerOne(){
    let uid;
    let arrP1 = [];
    function user (){
        uid = prompt("Enter Player One:");
    }
    return {setUser: user,
        get uid(){
            return uid;
        },
        arr: arrP1
    };
}

function playerTwo(){
    let uid;
    let arrP2 = [];
    function user (){
        uid = prompt("Enter Player Two:");
    }
    return {setUser: user,
        get uid(){
            return uid;
        },
        arr: arrP2
    };
}*/




const gameboard =(function () {
    const boxContainer = document.querySelector('.boxContainer');
    function createBoard (){
        for(let i=0;i<9;i++){
            let newBox = document.createElement('div');
            newBox.classList.add('box');
            newBox.style.height="10rem";
            newBox.style.width="10rem";
            boxContainer.appendChild(newBox);
        }
    }

    function playerBanner (){
        let playerBanner = document.createElement('div');
        container.appendChild(playerBanner);
    }
    
    //arrBoard = [1,2,3,4,5,6,7,8,9];
    return {createBoard};
})();

/*const gameControl = (function(){
    let winMatrix = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];


    const p1 = playerOne();
    const p2 = playerTwo();
    //p1.setUser();
    //p2.setUser();


    for(let i=0;i<9;i++){
        
        if(i%2==0){
           /* console.log(`${p1.uid}'s turn:`);
            let choice = parseInt(prompt("Choose a block P1:"));
            console.log(choice);
            p1.arr.push(choice);
            p1.arr.sort((a, b) => a - b);
            console.log(typeof(p1.arr[i]));

            let isArrayInMatrix = winMatrix.some(
                subArray => subArray.every(value => p1.arr.includes(value))
            );
            console.log(p1.arr);
            console.log(isArrayInMatrix);
            if(isArrayInMatrix && p1.arr.length>=3){
                console.log(`${p1.uid} WINS!!!!`);
                break;
            }
            if(i===8 && isArrayInMatrix==false){
                console.log("IT'S A DRAW!!!!");
                break;
            }
        }else{
            console.log(`${p2.uid}'s turn:`);
            let choice = parseInt(prompt("Choose a block P2:"));
            console.log(choice);
            p2.arr.push(choice);
            p2.arr.sort((a, b) => a - b);
            
            let isArrayInMatrix = winMatrix.some(
                subArray => subArray.every(value => p2.arr.includes(value))
            );
            console.log(isArrayInMatrix);
            if(isArrayInMatrix&&p2.arr.length>=3){
                console.log(`${p2.uid} WINS!!!!`);
                break;
            }

            if(i===8 && isArrayInMatrix==false){
                console.log("IT'S A DRAW!!!!");
                break;
            }
        }
    }
})();*/

const game = (function() {;

    const start = document.querySelector('.start');
    function startgame(){
        console.log('starting..')
        document.querySelector('.welcome').remove();
        document.querySelector('.start').remove();
        gameboard.createBoard();
    }

    start.addEventListener('click', startgame);
})();
