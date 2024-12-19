
const container = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const playerForm = document.querySelector('form');
let flag = 0;
function player(){
    let uid;
    let arr = [];
    function user (val){
        uid = val;
    }
    return {setUser: user,
        get uid(){
            return uid;
        },
        get arr(){
            return arr;
        },
        clear(){
            arr=[];
        }
    };
}

const p1 = player();
const p2 = player();



const gameboard =(function () {
    
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

        let playerBanner = document.createElement('div');
        playerBanner.style.height='4rem';
        playerBanner.style.width='21rem';
        playerBanner.classList.add('playerBanner');
        playerBanner.textContent='Enter Players:';
        container.appendChild(playerBanner);
    }

    function clearBoard(){
        p1.clear();
        p2.clear();
        document.querySelector('.boxContainer').remove();
    }
    
    function restart(){
        const restartButton = document.createElement('button');
        restartButton.textContent='RESTART';
        restartButton.classList.add('.restart');
        restartButton.type='submit';
        container.appendChild(restartButton);
 
        restartButton.addEventListener('click', ()=>{
            document.querySelector('.playerBanner').remove();
            gameboard.createBoard();
            restartButton.remove();
            document.querySelector('.playerBanner').textContent=`${p1.uid}'s turn`;
            gameControl.start();
        })
    }

    return {createBoard, clearBoard, restart};
})();
 

const game = (function() {;

    const start = document.querySelector('.start');
    function startgame(){
        console.log('starting..');
        document.querySelector('.modal').showModal();
        document.querySelector('.welcome').remove();
        document.querySelector('.start').remove();
        gameboard.createBoard();

    }

    start.addEventListener('click', startgame);
})();


document.getElementById('form').addEventListener('submit', function(event) {
    console.log('defaul preventsed')
    event.preventDefault();

    p1.setUser((nameOne.value));
    
    gameControl.start(); 
    document.querySelector('.playerBanner').textContent=`${p1.uid}'s turn`
    dialog.close();
  });
    

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

    const gameControl = (function start(){
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
    
        p1.setUser(nameOne.value);
        p2.setUser(nameTwo.value);

        const selectBox = document.querySelectorAll('.box');
        
        selectBox.forEach(element => {
            element.addEventListener('click', ()=>{
                if(flag==0){
                    console.log('p1 turn')
                    console.log(p1);
                    let num = parseInt(element.getAttribute('data-index'));
                    if(!(p1.arr.includes(num)||p2.arr.includes(num))){
                        p1.arr.push(num);
                        element.textContent='X';

                        let isArrayInMatrix = winMatrix.some(
                            subArray => subArray.every(value => p1.arr.includes(value))
                        );
                        if(isArrayInMatrix){
                            document.querySelector('.playerBanner').textContent=`${p1.uid} WINS!!`;
                            flag=0;
                            gameboard.clearBoard();
                            gameboard.restart();
                        }else if(p1.arr.length==5){
                            document.querySelector('.playerBanner').textContent=`TIE GAME!!!`;
                            gameboard.clearBoard();
                            gameboard.restart();
                        }else{
                            console.log(p1.arr)
                            flag=1;
                            document.querySelector('.playerBanner').textContent=`${p2.uid}'s turn`;
                        }   
                    }else{
                        console.log('block already taken');
                    }
                }else if(flag==1){
                    console.log('p2 turn')
                    let num = parseInt(element.getAttribute('data-index'));
                    if(!(p1.arr.includes(num)||p2.arr.includes(num))){
                        p2.arr.push(num);
                        element.textContent='O';

                        let isArrayInMatrix = winMatrix.some(
                            subArray => subArray.every(value => p2.arr.includes(value))
                        );
                        if(isArrayInMatrix){
                            document.querySelector('.playerBanner').textContent=`${p2.uid} WINS!!`
                            flag=0;
                            gameboard.clearBoard();  
                            gameboard.restart(); 
                        }else{
                        console.log(p2.arr)
                        flag=0;
                        document.querySelector('.playerBanner').textContent=`${p1.uid}'s turn`;
                        }
                    }else{
                        console.log('block already taken');
                    }
                    
                }
            })
        });
        
       return{
        start
       } 
    
    })();

