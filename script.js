
const container = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const playerForm = document.querySelector('form');
let flag = 0;
function playerOne(){
    let uid;
    let arrP1 = [];
    function user (val){
        uid = val;
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
    function user (val){
        uid = val;
    }
    return {setUser: user,
        get uid(){
            return uid;
        },
        arr: arrP2
    };
}




const gameboard =(function () {

    const p1 = playerOne();
    const p2 = playerTwo();
    
    function createBoard (){
        const boxContainer = document.createElement('div');
        boxContainer.classList.add('boxContainer');
        container.appendChild(boxContainer);
        for(let i=1;i<=9;i++){
            let newBox = document.createElement('div');
            newBox.classList.add('box');
            newBox.style.height="10rem";
            newBox.style.width="10rem";
            newBox.setAttribute('data-index',`${i}`);
            boxContainer.appendChild(newBox);
        }
    }

    function playerBanner (){
        let playerBanner = document.createElement('div');
        playerBanner.style.height='4rem';
        playerBanner.style.width='21rem';
        playerBanner.classList.add('playerBanner');
        playerBanner.textContent=`${p1.uid}'s turn`;
        container.appendChild(playerBanner);
    }

    function clearBoard(){
        p1.arr='';
        p2.arr='';
        document.querySelector('.boxContainer').remove();
        createBoard();
    }
    
    //arrBoard = [1,2,3,4,5,6,7,8,9];
    return {createBoard, playerBanner, clearBoard};
})();


const game = (function() {;

    const start = document.querySelector('.start');
    function startgame(){
        console.log('starting..');
        document.querySelector('.modal').showModal();
        document.querySelector('.welcome').remove();
        document.querySelector('.start').remove();
        gameboard.createBoard();
        gameboard.playerBanner();
        
    }

    start.addEventListener('click', startgame);
})();


document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  })

/*document.addEventListener("click", e => {
    
    if(!dialog.open) return;
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  })*/  

document.querySelector('.submit').addEventListener('click',()=>{
    
    const gameControl = (function(){
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
        p1.setUser(nameOne.value);
        p2.setUser(nameTwo.value);

        const selectBox = document.querySelectorAll('.box');
        
        selectBox.forEach(element => {
            element.addEventListener('click', ()=>{
                if(flag==0){
                    console.log('p1 turn')
                    let num = parseInt(element.getAttribute('data-index'));
                    p1.arr.push(num);
                    element.textContent='X';

                    let isArrayInMatrix = winMatrix.some(
                        subArray => subArray.every(value => p1.arr.includes(value))
                    );
                    if(isArrayInMatrix){
                        document.querySelector('.playerBanner').textContent=`${p1.uid} WINS!!`
                        gameboard.clearBoard();
                    }else{
                    console.log(p1.arr)
                    flag=1;
                    document.querySelector('.playerBanner').textContent=`${p2.uid}'s turn`;
                    }
                }else if(flag==1){
                    console.log('p2 turn')
                    let num = parseInt(element.getAttribute('data-index'));
                    p2.arr.push(num);
                    element.textContent='O';

                    let isArrayInMatrix = winMatrix.some(
                        subArray => subArray.every(value => p2.arr.includes(value))
                    );
                    if(isArrayInMatrix){
                        document.querySelector('.playerBanner').textContent=`${p2.uid} WINS!!`
                        gameboard.clearBoard();   
                    }else{
                    console.log(p2.arr)
                    flag=0;
                    document.querySelector('.playerBanner').textContent=`${p1.uid}'s turn`;
                    }
                    
                }
            })
        });
        
        
    
    })();
    
    dialog.close();
})

