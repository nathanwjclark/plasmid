import ReactDOM from 'react-dom';
import React, { useState, createContext, useMemo, useCallback, useEffect } from 'react';
//import { SeqViz } from "seqviz";
//import { usePersistentCanvas } from './hooks'
import * as d3 from 'd3';
import './App.css'


//const SCALE = 0.2
const OFFSET = 0
function draw(ctx, location) {
  ctx.fillStyle = 'deepskyblue'
  //ctx.shadowColor = 'dodgerblue'
  ctx.shadowBlur = 20
  ctx.save()
  //ctx.scale(SCALE, SCALE)
  //ctx.translate(location.x, location.y)
    const diameter = 20;
    ctx.fillRect(location.x-diameter/2, location.y-diameter/2, diameter, diameter);

  ctx.fillStyle = "black";
  ctx.font="16px Arial";
  ctx.textAlign="center";
  ctx.textBaseline = "middle";
  ctx.fillText(location.base.toUpperCase(),location.x,location.y);
  ctx.restore()
}

function link(ctx, curLoc, nextLoc) {
    ctx.beginPath();
    ctx.moveTo(curLoc.x, curLoc.y);
    ctx.lineTo(nextLoc.x, nextLoc.y);
    ctx.stroke();

}

function usePersistentState(init) {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('draw-app')) || init
  )

  React.useEffect(() => {
    localStorage.setItem('draw-app', JSON.stringify(value))
  })

  return [value, setValue]
}

function usePersistentCanvas() {
  const [locations, setLocations] = usePersistentState([]);
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
   //console.log(locations);

    for (var i=0; i<locations.length; i++) {
      const curLoc = locations[i]
        const nextLoc = locations[(i+1)%locations.length]
        link(ctx, curLoc, nextLoc);
    }

    locations.forEach(location => draw(ctx, location))

  })
  return [locations, setLocations, canvasRef]
}

function move(locations){

    //console.log(locations);

    for (var i=0; i<locations.length; i++) {
        for (var j=0; j<(locations.length-1); j++) {

            const curLoc = locations[i]
            const damper = 10;
            const accelerator = 1;
            const speedLimit = 1;
            const originator = 0.001;
            //console.log(curLoc.x);
            const nextLoc = locations[(i + j + 1) % locations.length]

            // console.log("starting location");
            // console.log(curLoc.x)
            // console.log(nextLoc.x)

            const dist = Math.sqrt(Math.pow(nextLoc.x - curLoc.x, 2) + Math.pow(nextLoc.y - curLoc.y, 2))
            //const origDist = Math.sqrt(Math.pow(window.innerWidth/2 - curLoc.x, 2) + Math.pow(window.innerHeight/2 - curLoc.y, 2))
            const attraction = Math.pow(accelerator*dist, 1/2)
            const buffer = Math.pow(damper * dist, 1/3)
            //const originDrag = Math.pow(origDist*originator,2)
            const buildForce = attraction - buffer
            const force = Math.max(Math.min(buildForce, speedLimit), -speedLimit);

            const xfactor = Math.sqrt(Math.pow(dist, 2) - Math.pow(nextLoc.y - curLoc.y, 2)) / dist
            const yfactor = Math.sqrt(Math.pow(dist, 2) - Math.pow(nextLoc.x - curLoc.x, 2)) / dist

            // const xfactororig = Math.sqrt(Math.pow(dist, 2) - Math.pow(window.innerHeight/2 - curLoc.y, 2)) / origDist
            // const yfactororig = Math.sqrt(Math.pow(dist, 2) - Math.pow(window.innerWidth/2 - curLoc.x, 2)) / origDist

            curLoc.x +=
                force * xfactor * Math.sign(nextLoc.x - curLoc.x)
                //+ originDrag * xfactororig * Math.sign(window.innerWidth/2 - curLoc.x)
                + (Math.random()-0.5)/5
            curLoc.y +=
                force * yfactor * Math.sign(nextLoc.y - curLoc.y)
                //+ originDrag * yfactororig * Math.sign(window.innerHeight/2 - curLoc.y)
                + (Math.random()-0.5)/5

            // console.log("location");
            // console.log(curLoc.x)
            // console.log(nextLoc.x)
            // console.log("dist");
            // console.log(dist)
            // console.log("forces")
            // console.log(force)
            // console.log(attraction)
            // console.log(buffer)
            // // console.log("factor")
            // // console.log(xfactor)
            // console.log("-----------------------------------------------------")
        }

        //console.log(curLoc.x);
    }

    //console.log(locations);

    return locations;
}


function Main() {
  const [locations, setLocations, canvasRef] = usePersistentCanvas();
  // console.log("starting locations:");
  // console.log(locations);

  //requestAnimationFrame(Main);


        const [date, setDate] = React.useState(new Date());

        //Replaces componentDidMount and componentWillUnmount
        React.useEffect(() => {
            var timerID = setInterval(() => tick(), 10
    )
        ;
        return function cleanup() {
            clearInterval(timerID);
        };
    })
        ;

        function tick() {
            //console.log('tick');
            setLocations([...move(locations)]);
            //console.log('tock')
        }

  function handleCanvasClick(e) {
    const newLocation = { x: window.innerWidth/2, y: window.innerHeight/2}
    setLocations([...locations, newLocation])
  }

  function handleClear() {
    setLocations([])
  }

  function handleUndo() {

  }

  function handleSeqChange(e, newLocations) {
    newLocations = processSeq(e.target.value);
    setLocations(newLocations);
  }

  return (
    <>
      <div id="controls">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleUndo}>Undo</button>
        <input onChange={handleSeqChange}></input>
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleCanvasClick}
      />
    </>
  )
}

function processSeq(seqString) {
  const origin = { x: window.innerWidth/2, y: window.innerHeight/2};
  const radius = window.innerWidth/4
    const update = []
  for (var i = 0; i < seqString.length; i++) {
    const thisX = Math.cos((2*Math.PI / seqString.length)*i-0.5*Math.PI)*radius + origin.x
      const thisY = Math.sin((2*Math.PI/ seqString.length)*i-0.5*Math.PI)*radius + origin.y
      update.push({
          base: seqString.charAt(i),
          x: thisX,
          y: thisY,
          vx: 0,
          vy: 0
      })
  }
  //console.log(update);
  return update;
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
