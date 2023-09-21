import React from "react";
import { card, cardSet } from "./types/types";

interface Props {
  cards: card[];
}

export default function ImagePanel({ cards }: Props) {
  return (
    <>
      {cards.map((val, index) => {
        return (
        //   <ImageListItem
        //     key={index}
        //     style={{ maxWidth: `${100}%`, height: "100%" }}
        //   >
            <div
              className="border border-black"
              style={{ maxWidth: `${100}%`, height: "100%", backgroundImage:require(`./icons/${val.no}.png`) }}
              
            //   onClick={() => {
            //     if (started && !val.matched) {
            //       setCount(count + 1);
            //       setFlip(index);
            //     }
            //   }}
            >
              <div className={`front ${val.isFlip ? "" : "isFlip"}`}>
                <img
                //   style={{ width: `${(700 / (2 * level)) * 0.9}px` }}
                  src={require(`./icons/${val.no}.png`)}
                  alt={val.toString()}
                  // loading="lazy"
                  key={index}
                />
              </div>
              <div
                className={`back ${val.isFlip ? "" : "isFlip"}`}
                // style={{
                //   width: `${(700 / (2 * level)) * 0.9}px`,
                //   height: `${(700 / (2 * level)) * 0.9}px`,
                // }}
              ></div>
            </div>
        //   </ImageListItem>
        );
      })}
    </>
    // <ImageList
    //   cols={2 * level}
    //   style={{ maxWidth: `${100}%`, height: "100%" }}
    // >
    // </ImageList>
  );
}
