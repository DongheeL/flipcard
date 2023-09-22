import React from "react";
import { card, cardSet } from "./types/types";

interface Props {
  cards: card[];
  level: number;
}

export default function ImagePanel({ cards, level }: Props) {
  return (
    <div className={`h-full w-full p-8 `}>
      <div className={`grid grid-cols-${2*level} grid gap-4 h-full `}>

      {/* <div className="border border-black"></div>
      <div className="border border-black"></div>
      <div className="border border-black"></div>
      <div className="border border-black"></div> */}
      {/* <div className="h-full w-full bg-cover" style={{ backgroundImage: `url("../icons/1.png")` }}  ></div> */}
      {cards.map((val, index) => {
        return (
          <div className="h-full w-full bg-cover" style={{ backgroundImage: `url(./icons/${val.no}.png)` }}  >
            {/* <img
            className={`cont`}
              // style={{ height: `${100/2*level}%`, width: `${100/2*level}%` }}
              src={require(`./icons/${val.no}.png`)}
              alt={val.toString()}
              // loading="lazy"
              key={index}
            /> */}

          </div>

        //   <ImageListItem
        //     key={index}
        //     style={{ maxWidth: `${100}%`, height: "100%" }}
        //   >
            // <div
            //   className="border border-black w-full"
            //   style={{   backgroundImage:require(`./icons/${val.no}.png`) }}
              
            // //   onClick={() => {
            // //     if (started && !val.matched) {
            // //       setCount(count + 1);
            // //       setFlip(index);
            // //     }
            // //   }}
            // >
            //   {/* <div className={`front ${val.isFlip ? "" : "isFlip"}`}>
            //     <img
            //     //   style={{ width: `${(700 / (2 * level)) * 0.9}px` }}
            //       src={require(`./icons/${val.no}.png`)}
            //       alt={val.toString()}
            //       // loading="lazy"
            //       key={index}
            //     />
            //   </div>
            //   <div
            //     className={`back ${val.isFlip ? "" : "isFlip"}`}
            //     // style={{
            //     //   width: `${(700 / (2 * level)) * 0.9}px`,
            //     //   height: `${(700 / (2 * level)) * 0.9}px`,
            //     // }}
            //   ></div> */}
            // </div>
        //   </ImageListItem>
        );
      })}
      </div>
    </div>
    // <ImageList
    //   cols={2 * level}
    //   style={{ maxWidth: `${100}%`, height: "100%" }}
    // >
    // </ImageList>
  );
}
