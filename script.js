let boxes=document.querySelectorAll(".box");
console.log(boxes);
let resetbutton=document.querySelector("#reset");
let tossbutton=document.querySelector("#toss");
let instruction=document.querySelector("#instruction");
let result=document.querySelector("#result");

let playButton=document.querySelector("#play");
let vsComputerButton=document.querySelector("#vsComputer");
let vsotherPlayerButton=document.querySelector("#vsotherPlayer");
let tohideDiv=document.querySelector("#tohide");
let homeButton=document.querySelector("#home");
let par1=document.querySelector("#par1");
let par2=document.querySelector("#par2");
let symbolheading=document.querySelector(".symbolins")


let vsComputer;

playButton.addEventListener("click",(e)=>{
    tohideDiv.style.visibility="visible";
    playButton.disabled=true;
    
    console.log(playButton);


});

vsComputerButton.addEventListener("click",(e)=>{
    vsComputer=true;
    setTimeout(par1.style.display="none",5000);
    par2.style.display="unset",5000;
    // location.assign("index1.html");


});

vsotherPlayerButton.addEventListener("click",(e)=>{
    vsComputer=false;
    
    // location.assign("index1.html");
    setTimeout(par1.style.display="none",5000);
    par2.style.display="unset",5000;

});


let turn=0;
let winningPatterns=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

function returnIndex(arr,val){

    let ret=-1;
    for(let i=0;i<arr.length;i++)
    {
        if(val==arr[i])
        {return i;}
    }
    return -1;
}

let player1={
    name:"Player-1",
    symbol:"O",
    turn:0
};

let player2={
    name:"Player-2",
    symbol:"X",
    turn:0
};


let currentPlayer;
let otherPlayer;



resetbutton.addEventListener("click",(e)=>{
    
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
        box.style.backgroundColor="white";
        
    }

    tossbutton.disabled=false;
    result.innerText="";
    gameOver=false;
    instruction.innerText="Toss!";
    symbolheading.innerText="";
});
 
homeButton.addEventListener("click",(e)=>{
     location.assign("index.html");
});


let index=null;
function checkWinner(){
    let winningSymbol=null;
    

    for(let item of winningPatterns)
    {
        if((boxes[item[0]-1].innerText=="O")&&(boxes[item[1]-1].innerText=="O")&&(boxes[item[2]-1].innerText=="O"))
        {
            winningSymbol="O";
            index=item;
        }

        else if((boxes[item[0]-1].innerText=="X")&&(boxes[item[1]-1].innerText=="X")&&(boxes[item[2]-1].innerText=="X"))
        {
            winningSymbol="X";
            index=item;
        }

        
    }
    
    

    
    return winningSymbol;
}


let  gameOver=false;


//computer
let computer={
    name:"Computer",
    symbol:"X",
    turn:0
};

function ratingSystem(availableArray,symbol){

    let rating=[];
    let n=0;
    for(let index of availableArray)
    {
        let localRating=[];
        for(let item of winningPatterns)
    {
        

        for(let i=0;i<3;i++)
        {
            
            if(item[i]==index)
            {
                let flag=0;
                let count=0;
                for(let j=0;j<3;j++)
                {
                    if(boxes[item[j]-1].innerText==symbol)
                    {count++;
                    
                    }
                    
                    else if(boxes[item[j]-1].innerText=="")
                    {;}

                    else{
                        flag=1;
                        count=0;
                        break;
                    }
                }

                
                {localRating.push(count);}

            }
        }

       
        
    }

    if(returnIndex(localRating,2)==-1)
    {
        // console.log("hi");
       if(returnIndex(localRating,1)==-1)
        {rating[n]=0;}

        else
        {
            // let count1=0;
            // for(let value of localRating)
            // {
            //     if(value==1)
            //     {count1++;}
            // }
            
            // if(count1>1)
            // {rating=1.5;}
            // else
            // {rating=1;}
            rating[n]=1;

        }
    }

    else{
        rating[n]=2;
    }

    
    // console.log("localRating:",localRating);

    // console.log("rating:",rating);
    // console.log("n:",n);  
    n++;
    }
    return rating;
}


function computerTurn(){
    if(!gameOver){
        let ind;
        //finding available boxes
        let boxesAvailable=[];
        for(let i=0;i<boxes.length;i++)
        {
            if(boxes[i].disabled==false)
            {boxesAvailable.push(i+1);
            //  console.log(i);   
            }
        }
        console.log("boxesAvailable:",boxesAvailable);

        if(boxesAvailable.length==0)
        {
            // console.log("yo");
            gameOver=true;
        }
        
        else{
            //now develop a rating system
        let computersRatings=ratingSystem(boxesAvailable,"X");
        let playersRatings=ratingSystem(boxesAvailable,"O");

        console.log("computersRatings",computersRatings);
        console.log("playersRatings",playersRatings);
        //now decide
        if(returnIndex(computersRatings,2)!=-1)
        {
            boxes[boxesAvailable[returnIndex(computersRatings,2)]-1].innerText="X";
            console.log("returnIndex:",boxesAvailable[returnIndex(computersRatings,2)]);
            ind=returnIndex(computersRatings,2);
            boxes[boxesAvailable[returnIndex(computersRatings,2)]-1].disabled=true;
        
            }
        else{
            if(returnIndex(playersRatings,2)!=-1)
            {
                boxes[boxesAvailable[returnIndex(playersRatings,2)]-1].innerText="X";
                ind=returnIndex(playersRatings,2);
                console.log("returnIndex:",boxesAvailable[returnIndex(playersRatings,2)]);
                boxes[boxesAvailable[returnIndex(playersRatings,2)]-1].disabled=true;
            }

            else 
            {
                let maxRating=computersRatings[0];
                for(let i=0;i<computersRatings.length;i++)
                {
                    if(computersRatings[i]>maxRating)
                    {maxRating=computersRatings[i];}
                }
                

                // console.log("returnIndex:",returnIndex(computersRatings,maxRating));
                ind=returnIndex(computersRatings,maxRating);
                console.log("returnIndex:",boxesAvailable[returnIndex(computersRatings,maxRating)]);
                boxes[boxesAvailable[returnIndex(computersRatings,maxRating)]-1].innerText="X";
                boxes[boxesAvailable[returnIndex(computersRatings,maxRating)]-1].disabled=true;
            }
        }


        
        // console.log("ind:",ind);
        // console.log("maxRating",maxRating);


        }
    }

    
}


tossbutton.addEventListener("click",(e)=>{

    let randomnum=Math.random();
    console.log(randomnum);
    if(randomnum<0.5)
    {
        player1.turn=1;
     currentPlayer=player1;
    
     if(!vsComputer){
        otherPlayer=player2;
     }

     else{
        otherPlayer=computer;
     }
     console.log(currentPlayer);
    instruction.innerText=currentPlayer.name+"'s turn.";
    if(!vsComputer)
    {symbolheading.innerText="O:Player-1\nX:Player-2 ";}
    else
    {symbolheading.innerText="O:Player-1\nX:Computer ";}

    tossbutton.disabled=true;
    
    }
    
    else
    {
        if(!vsComputer)
        {player2.turn=1;
         currentPlayer=player2;
         instruction.innerText=currentPlayer.name+"'s turn."; 
         symbolheading.innerText="O:Player-1\nX:Player-2 ";  
        }
        
         else{
            computer.turn=1;
         currentPlayer=computer;
         instruction.innerText=currentPlayer.name+"'s turn.";
         symbolheading.innerText="O:Player-1\nX:Computer ";
        
        //  setTimeout( console.log("hi-by computer") ,50000);
         setTimeout( ()=>{
            computerTurn();
            currentPlayer=player1;
         otherPlayer=computer;

         instruction.innerText=currentPlayer.name+"'s turn.";
         } ,300);
         
         
         
        
        
         
         }
        
         otherPlayer=player1;
         console.log(currentPlayer);
    
         
         tossbutton.disabled=true;
    }
    
    });


boxes.forEach((box)=>{
    box.addEventListener("click",(e)=>
    
    {
        if(!vsComputer){
            if(currentPlayer.turn==1)
        {
            box.innerText=currentPlayer.symbol;
            currentPlayer.turn=0;
            otherPlayer.turn=1;
            let temp=currentPlayer;
            currentPlayer=otherPlayer;
            otherPlayer=temp;
            box.disabled=true;
               
        }
        }

        else{
            
            //in case of vs computer,the eventListener will only be activated when currentPlayer=Player1.
            box.innerText=currentPlayer.symbol;
            box.disabled=true;
            currentPlayer.turn=0;
            otherPlayer.turn=1;
            currentPlayer=computer;
            otherPlayer=player1;
            // setTimeout(computerTurn(),3000);
            instruction.innerText=currentPlayer.name+"'s turn."
            
            // instruction.innerText=currentPlayer.name+"'s turn."
            console.log("HEEEEEllo");
            computerTurn();
            otherPlayer.turn=1;
            currentPlayer.turn=0;
            currentPlayer=player1;
            otherPlayer=computer;
            

           
            
            
        }

        let symbol=checkWinner();
        console.log(symbol);
        if(symbol==null)
        {   
            let count=0;
            for(let i=0;i<boxes.length;i++)
            {
                if(boxes[i].disabled==true)
                {
                    count++;
                }
            }

            if(count==boxes.length)
            {
                result.innerText="Draw";
                gameOver=true;
            }
            // console.log(boxes.length);
            // console.log(count);

        }

        else if(symbol=="X")
        {
            if(!vsComputer)
            {result.innerText="Player-2 won.";}
            else
            {{result.innerText="Computer won.";}}
            for(let i=0;i<boxes.length;i++)
            {
                boxes[i].disabled=true;
            }
            gameOver=true;
            
            for(let i=0;i<3;i++)
            {
                boxes[index[i]-1].style.backgroundColor="green";
            }
            



        }

        else if(symbol=="O")
        {
            result.innerText="Player-1 won.";
            for(let i=0;i<boxes.length;i++)
            {
                boxes[i].disabled=true;
            }
            gameOver=true;
            console.log(index);

            for(let i=0;i<3;i++)
            {
                boxes[index[i]-1].style.backgroundColor="green";
            }
        }

        if(!gameOver)
        {instruction.innerText=currentPlayer.name+"'s turn.";}
        else{
            instruction.innerText="";
            symbolheading.innerText="";
        }

    });



});
