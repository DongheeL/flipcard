import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ImageList, ImageListItem } from '@mui/material';
import { stat } from 'fs';


function App() {

  const [level,setLevel] = useState<number>(1);
  const [cards,setCard] = useState<number[]>([]);

  function getNewCards(number:number){
    setLevel(number);
    let total = Math.pow(2*number,2);
    console.log(total);
    let icons:number[] = [];
    for(let i=0;i<total/2;i++){
      let tmp = Math.floor(Math.random()*(9) + 1);  //난수 생성
      if(icons.indexOf(tmp)>-1){
        i--;
      }else{
        icons.push(tmp);
        icons.push(tmp);
      }
    }
    icons.sort(()=>Math.random()-0.5);
    console.log(icons);
    setCard(icons);
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
        <ImageList cols={2*level} >
          {cards.map((val,index)=>{
            return(
              <ImageListItem key={(index+1)/(2*level)}>
                <img  
                  className='card'
                  src={require(`./icons/${val}.png`)}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={val.toString()}
                  loading="lazy"
                  key={index}
                />
              </ImageListItem>  
            )
          })}
        </ImageList>
      </div>
    </div>
  );
}

export default App;
