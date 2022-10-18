import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, cardHeaderClasses, ImageList, ImageListItem } from '@mui/material';
import { stat } from 'fs';
import zIndex from '@mui/material/styles/zIndex';


function App() {
  
  type card = {
    no:number,
    isFlip:boolean
  }

  const [level,setLevel] = useState<number>(1);
  const [cards,setCard] = useState<card[]>([]);

  useEffect(()=>{
    console.log(cards)
  },[cards])

  const getNewCards = (number:number)=>{
    setLevel(number);
    let total = Math.pow(2*number,2);
    let icons:card[] = [];
    let numbers:number[] = [];

    for(let i=0;i<total/2;i++){
      let tmp = Math.floor(Math.random()*(19) + 1);  //난수 생성
      if(numbers.indexOf(tmp)>-1){
        i--;
      }else{
        icons.push({no:tmp,isFlip:true});
        icons.push({no:tmp,isFlip:true});
        numbers.push(tmp);
      }
    }
    icons.sort(()=>Math.random()-0.5);
    console.log(icons)

    setCard(icons);
    let n: any;
    n = setTimeout(function(){flipAll()}, 1000);
  }

  const flipAll=()=>{
    console.log(cards);
    const newCard = [...cards];
    newCard.map((val)=>val.isFlip=false);
    setCard(newCard);
  }

  const setFlip = (no:number)=>{
    //useState로 상태가 변경되는 배열을 수정할 경우,
    //state 변경함수들은 state를 완전히 대체하는 것이기 때문에 완전히 새로운 배열을 넣어주어야 함.
    //따라서, 기존 배열을 수정해도 변경되지 않음.
    //기존 배열을 복사한 새로운 배열을 수정한 후 state변경 함수에 넣어주어야 새로운 배열로 적용됨.
    const newCard = [...cards];
    newCard[no].isFlip = !newCard[no].isFlip;
    setCard(newCard);
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          {level}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Learn React */}
        </a>
      </header>
      <div>
        <Button variant="text" onClick={()=>getNewCards(1)}>Level 1</Button>
        <Button variant="text" onClick={()=>getNewCards(2)}>Level 2</Button>
        <Button variant="text" onClick={()=>getNewCards(3)}>Level 3</Button>
      </div>
      {/* <img src="../icons/1.png"></img> */}
      <div className='panel'>
        <ImageList cols={2*level} style={{ maxWidth:`${100}%`, height:'100%'}}>
          {cards.map((val,index)=>{
            return(
              <ImageListItem key={index} style={{ maxWidth:`${100}%`, height:'100%'}}  >
                <div className='card' style={{ maxWidth:`${100}%`, height:'100%'}} onClick={()=>setFlip(index)}>
                  {/* {val.isFlip ? */}
                    <div className= {`front ${val.isFlip ? '':'isFlip'}`}>
                      <img  
                        // className='back'
                        style={{width:`${700/(2*level)*0.9}px`}}
                        src={require(`./icons/${val.no}.png`)}
                        alt={val.toString()}
                        loading="lazy"
                        key={index}
                      />                    
                    </div>
                  {/* :  */}
                  <div className= {`back ${val.isFlip ? '':'isFlip'}`} style={{width:`${700/(2*level)*0.9}px`, height:`${700/(2*level)*0.9}px`}}>
                    back
                  </div>
                {/* } */}
              </div>
              </ImageListItem>  
            )
          })}
        </ImageList>
      </div>
    </div>
  );
}

export default App;
