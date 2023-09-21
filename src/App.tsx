import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import {
  Button,
  cardHeaderClasses,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { stat } from "fs";
import zIndex from "@mui/material/styles/zIndex";
import { card, cardSet } from "./types/types";
import ImagePanel from "./ImagePanel";


function App() {

  const [level, setLevel] = useState<number>(1);
  const [cards, setCards] = useState<card[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [cardSet, setCardSet] = useState<cardSet | null>(null);
  const [selected, setSelected] = useState<cardSet[]>([]);
  const [clicked, setClicked] = useState<number | null>(null);
  const timer = useRef<any>(null);
  const [count, setCount] = useState<number>(0);
  const [record, setRecord] = useState<string>("00:00");
  const [time, setTime] = useState<number>(0);
  const recording = useRef<any>(null);

  const flipTimer = (index: number) => {
    timer.current = setTimeout(() => {
      // if(clicked!=null){
      setFlip(index);
      // setClicked(null);
      // }
    }, 1000);
    // console.log(timer.current);
  };

  useEffect(() => {
    setStarted(false);
    setSelected([]);
    setClicked(null);
    setCount(0);
    setCards(getNewCards(level));
    clearInterval(recording.current);
    setTime(0);
    setRecord("00:00");
  }, [level]);

  useEffect(() => {
    // console.log(started)
    if (started) {
      flipAll();
      let timeout = setTimeout(() => {
        flipAll();
        startRecord();
      }, 1000);
    }
    // return clearInterval(recording.current);
  }, [started]);

  // useEffect(() => {
  //   // console.log(selected);
  //   clearTimeout(timer.current);
  //   let lastSet = selected[selected.length-1];
  //   if(selected.length>0){
  //     if ((lastSet.no1!=lastSet.no2) && (cards[lastSet.no1].no==cards[lastSet.no2].no)) {
  //       // const newCard = [...cards];
  //       cards[lastSet.no1].matched = true;
  //       cards[lastSet.no2].matched = true;
  //       // setCards(newCard);
  //       // console.log(selected.length)
  //     } else if(lastSet.no1!=lastSet.no2){
  //       let timer2 = setTimeout(() => {
  //         setFlip(lastSet.no1);
  //         setFlip(lastSet.no2);
  //       }, 1000);
  //     }
  //   }
  // }, [selected])

  useEffect(() => {
    // console.log(selected);
    clearTimeout(timer.current);
    // let lastSet = selected[selected.length-1];
    if (cardSet != null) {
      if (
        cardSet.no1 != cardSet.no2 &&
        cards[cardSet.no1].no == cards[cardSet.no2].no
      ) {
        // const newCard = [...cards];
        cards[cardSet.no1].matched = true;
        cards[cardSet.no2].matched = true;
        // setCards(newCard);
        // console.log(selected.length)
      } else if (cardSet.no1 != cardSet.no2) {
        let timer2 = setTimeout(() => {
          setFlip(cardSet.no1);
          setFlip(cardSet.no2);
        }, 500);
      }
    }
  }, [cardSet]);

  useEffect(() => {
    let isAllMatched = false;
    if (time > 0) {
      isAllMatched = cards.every((val) => {
        return val.isFlip == true && val.matched == true;
      });
    }
    if (isAllMatched) {
      let timeout = setTimeout(() => {
        alert("level clear!");
      }, 500);
      clearInterval(recording.current);
    }
  }, [cards]);

  useEffect(() => {
    // console.log(clicked);
    if (clicked != null) {
      flipTimer(clicked);
    }
  }, [clicked]);

  useEffect(() => {
    setRecord(
      `${parseInt((time / 60).toString())
        .toString()
        .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`
    );
  }, [time]);

  function startRecord() {
    recording.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }

  const getNewCards = (number: number) => {
    let total = Math.pow(2 * number, 2);
    let icons: card[] = [];
    let numbers: number[] = [];

    for (let i = 0; i < total / 2; i++) {
      let tmp = Math.floor(Math.random() * 19 + 1); //난수 생성
      if (numbers.indexOf(tmp) > -1) {
        i--;
      } else {
        icons.push({ no: tmp, isFlip: false, matched: false });
        icons.push({ no: tmp, isFlip: false, matched: false });
        numbers.push(tmp);
      }
    }
    icons.sort(() => Math.random() - 0.5);

    return icons;
  };

  const flipAll = () => {
    const newCard = [...cards];
    newCard.map((val) => {
      if (!val.matched) {
        val.isFlip = !val.isFlip;
      }
    });
    setCards(newCard);
  };

  const setFlip = (index: number) => {
    //useState로 상태가 변경되는 배열을 수정할 경우,
    //state 변경함수들은 state를 완전히 대체하는 것이기 때문에 완전히 새로운 배열을 넣어주어야 함.
    //따라서, 기존 배열을 수정해도 변경되지 않음.
    //기존 배열을 복사한 새로운 배열을 수정한 후 state변경 함수에 넣어주어야 새로운 배열로 적용됨.

    const newCard = [...cards];
    newCard[index].isFlip = !newCard[index].isFlip;
    setCards(newCard);
    // console.log(index , newCard[index].isFlip)
    if (newCard[index].isFlip) {
      if (clicked == null) {
        setClicked(index);
      } else {
        const set: cardSet = {
          no1: clicked,
          no2: index,
        };
        const tmp = [...selected, set];
        setCardSet(set);
        setSelected(tmp);
        setClicked(null);
      }
    } else {
      setClicked(null);
    }
  };

  return (
    <div className="App h-full flex flex-col">
      <header className="App-header">
        <p>Move:{count}</p>
        <p>{record}</p>
      </header>
      <div>
        <Button variant="text" onClick={() => setLevel(1)}>
          Level 1
        </Button>
        <Button variant="text" onClick={() => setLevel(2)}>
          Level 2
        </Button>
        <Button variant="text" onClick={() => setLevel(3)}>
          Level 3
        </Button>
        <Button variant="contained" onClick={() => setStarted(true)}>
          start
        </Button>
      </div>

      <div className={`flex-1 grid grid-cols-${2 * level} gap-4`} >
        
        <ImagePanel cards={cards} />
      </div>
    </div>
  );
}

export default App;
