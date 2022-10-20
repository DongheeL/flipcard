import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, cardHeaderClasses, ImageList, ImageListItem } from '@mui/material';
import { stat } from 'fs';
import zIndex from '@mui/material/styles/zIndex';




function App() {

  type card = {
    no: number,
    isFlip: boolean,
    matched: boolean
  }

  type cardSet = {
    no1:number,
    no2:number,
  }

  const [level, setLevel] = useState<number>(1);
  const [cards, setCard] = useState<card[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [selected, setSelected] = useState<cardSet[]>([]);
  const [clicked, setClicked] = useState<number|null>(null);
  const timer = useRef<any>(null);
  const [count, setCount] = useState<number>(0);

  const flipTimer = () => {
    timer.current = setTimeout(() => {
      if(clicked!=null){
        setFlip(clicked);
        // setClicked(null);
      }
    }, 1000);
    console.log(timer.current);
  }

  // useEffect(() => {
  //   console.log(cards)
  // }, [cards])

  useEffect(() => {
    console.log(level);
    setStarted(false);
    setSelected([]);
    setClicked(null);
    setCount(0);
    setCard(getNewCards(level));
  }, [level])

  useEffect(() => {
    console.log(started)
    if (started) {
      flipAll();
      let timeout = setTimeout(() => { flipAll() }, 1000);
    }
  }, [started])

  useEffect(() => {
    console.log(selected);
    // clearTimeout(timer.current);
    let lastSet = selected[selected.length-1];
    if(selected.length>0){
      if (cards[lastSet.no1].no==cards[lastSet.no2].no) {
        const newCard = [...cards];
        newCard[lastSet.no1].matched = true;
        newCard[lastSet.no2].matched = true;
        setCard(newCard);
        console.log(selected.length)
      } else {
        let timer2 = setTimeout(() => { 
          setFlip(lastSet.no1);
          setFlip(lastSet.no2);
        }, 1000);
      }
    }
  }, [selected])

  useEffect(() => {
    console.log(clicked);
    if(clicked!=null){
      flipTimer();
    }
  }, [clicked])

  const getNewCards = (number: number) => {
    let total = Math.pow(2 * number, 2);
    let icons: card[] = [];
    let numbers: number[] = [];

    for (let i = 0; i < total / 2; i++) {
      let tmp = Math.floor(Math.random() * (19) + 1);  //난수 생성
      if (numbers.indexOf(tmp) > -1) {
        i--;
      } else {
        icons.push({ no: tmp, isFlip: false, matched: false });
        icons.push({ no: tmp, isFlip: false, matched: false });
        numbers.push(tmp);
      }
    }
    icons.sort(() => Math.random() - 0.5);
    console.log(icons)

    return icons;
  }

  const flipAll = () => {
    console.log(cards);
    const newCard = [...cards];
    newCard.map((val) => {
      if(!val.matched){
        val.isFlip = !val.isFlip
      }
    });
    setCard(newCard);
  }

  const setFlip = (index: number) => {
    //useState로 상태가 변경되는 배열을 수정할 경우,
    //state 변경함수들은 state를 완전히 대체하는 것이기 때문에 완전히 새로운 배열을 넣어주어야 함.
    //따라서, 기존 배열을 수정해도 변경되지 않음.
    //기존 배열을 복사한 새로운 배열을 수정한 후 state변경 함수에 넣어주어야 새로운 배열로 적용됨.
    const newCard = [...cards];
    newCard[index].isFlip = !newCard[index].isFlip;
    setCard(newCard);
    clearTimeout(timer.current);
    if (newCard[index].isFlip) {
      if(clicked==null){
        setClicked(index);
      }else{
        const set:cardSet = {
          no1:clicked,
          no2:index
        }
        const tmp = [...selected, set];
        setSelected(tmp);
        setClicked(null);
      }
    }else{
      setClicked(null);
    }
  }

  return (
    <div className="App">
      <header className="App-header">

        <p>
          Move:{count}
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
        <Button variant="text" onClick={() => setLevel(1)}>Level 1</Button>
        <Button variant="text" onClick={() => setLevel(2)}>Level 2</Button>
        <Button variant="text" onClick={() => setLevel(3)}>Level 3</Button>
        <Button variant="contained" onClick={() => setStarted(true)}>start</Button>
      </div>

      {/* <img src="../icons/1.png"></img> */}
      <div className='panel'>
        <ImageList cols={2 * level} style={{ maxWidth: `${100}%`, height: '100%' }}>
          {cards.map((val, index) => {
            return (
              <ImageListItem key={index} style={{ maxWidth: `${100}%`, height: '100%' }}  >
                <div
                  className='card'
                  style={{ maxWidth: `${100}%`, height: '100%' }}
                  onClick={() => { if (started && !val.matched) { setCount(count+1); setFlip(index); } }}
                >
                  <div className={`front ${val.isFlip ? '' : 'isFlip'}`}>
                    <img
                      style={{ width: `${700 / (2 * level) * 0.9}px` }}
                      src={require(`./icons/${val.no}.png`)}
                      alt={val.toString()}
                      // loading="lazy"
                      key={index}
                    />
                  </div>
                  <div
                    className={`back ${val.isFlip ? '' : 'isFlip'}`}
                    style={{ width: `${700 / (2 * level) * 0.9}px`, height: `${700 / (2 * level) * 0.9}px` }}
                  >
                    back
                  </div>
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
