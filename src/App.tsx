import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ImageList, ImageListItem } from '@mui/material';
import { stat } from 'fs';
import zIndex from '@mui/material/styles/zIndex';


function App() {

  const [level,setLevel] = useState<number>(1);
  const [cards,setCard] = useState<{no:number,isFlip:boolean}[]>([]);

  function getNewCards(number:number){
    setLevel(number);
    let total = Math.pow(2*number,2);
    let icons:{no:number,isFlip:boolean}[] = [];
    let numbers:number[] = [];

    for(let i=0;i<total/2;i++){
      let tmp = Math.floor(Math.random()*(19) + 1);  //난수 생성
      if(numbers.indexOf(tmp)>-1){
        i--;
      }else{
        icons.push({no:tmp,isFlip:true});
        icons.push({no:tmp,isFlip:false});
        numbers.push(tmp);
      }
    }
    icons.sort(()=>Math.random()-0.5);
    console.log(icons);
    setCard(icons);
  }

  function setFlip(index:number){
    // cards.
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
                  {val.isFlip ?
                    <div className= 'front'>
                      <img  
                        // className='back'
                        style={{width:`${700/(2*level)*0.9}px`}}
                        src={require(`./icons/${val.no}.png`)}
                        alt={val.toString()}
                        loading="lazy"
                        key={index}
                      />                    
                    </div>
                  : 
                  <div className= 'back' style={{width:`${700/(2*level)*0.9}px`, height:`${700/(2*level)*0.9}px`}}>
                    back
                  </div>
                }
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
