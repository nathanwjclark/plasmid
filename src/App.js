
Nathan Clark <nathan.clark@affirm.com>
10:11 PM (0 minutes ago)
to me

import ReactDOM from 'react-dom';
import React, { useState, createContext, useMemo, useCallback, useEffect } from 'react';
//import { SeqViz } from "seqviz";
//import { usePersistentCanvas } from './hooks'
import * as d3 from 'd3';
import './App.css'

// DECLARATION SECTION ===============================================

function mod(n, m) {
  return ((n % m) + m) % m;
}

function usePersistentState(init) {
    localStorage.clear();
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('draw-app')) || init
  )

  React.useEffect(() => {
    localStorage.setItem('draw-app', JSON.stringify(value))
  })

  return [value, setValue]
}

function usePersistentCanvas() {
  const [locations, setLocations] = usePersistentState({
        circle:
                {radius: window.innerWidth/4, origin:
                        {x:window.innerWidth/3, y:window.innerHeight/2}
                },
        bases:[]
        });
  //console.log(locations)
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current

    canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    drawMaster(ctx,locations)

  })
  return [locations, setLocations, canvasRef]
}

// DRAWING SECTION ===============================================

function drawMaster(ctx,locations) {

    drawCircleGuide(ctx,locations)
    drawPlasmid(ctx,locations)
    // drawRNAPol(ctx,locations)
    // drawMRNA(ctx,locations)
    // drawRibosome(ctx,locations)
    // drawAminos(ctx,locations)
    // drawProtein(ctx,locations)
}

function drawCircleGuide(ctx,locations){

    var radius = locations.circle.radius
    var origX = locations.circle.origin.x
    var origY = locations.circle.origin.y

    ctx.beginPath();
    ctx.arc(origX, origY, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

}

function drawPlasmid(ctx,locations) {

    locations.bases.forEach(base => drawPlasmidBase(ctx, base))
    for(var i=0;i<locations.bases.length;i++) {
        drawPlasmidLink(ctx,locations.bases[i],locations.bases[(i+1)%locations.bases.length])
    }
}

function drawPlasmidBase(ctx,base) {

    const base_diameter = 20

    ctx.save();

    ctx.beginPath();
    ctx.arc(base.x, base.y, base_diameter/2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white'
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.restore();

}

function drawPlasmidLink(ctx,startBase,endBase) {

}

// FORCES SECTION ===============================================
function baseForceFromCircle(base,circle){


    var distance = Math.sqrt( Math.pow((base.x - circle.origin.x),2) + Math.pow((base.y - circle.origin.y),2) )

    var scaler = 0.02
    var force = Math.pow(((distance-circle.radius)*scaler),2)

    var forceX = force * (base.x - circle.origin.x)/(distance) * Math.sign(circle.radius - distance)
    var forceY = force * (base.y - circle.origin.y)/(distance) * Math.sign(circle.radius - distance)

    return {x: forceX, y: forceY}

}

function baseForceFromEachOther(base,otherBase,circle,baseCount,letter) {

    var distance = Math.sqrt( Math.pow((base.x - otherBase.x),2) + Math.pow((base.y - otherBase.y),2) )

    var distanceToCircle = Math.sqrt( Math.pow((base.x - circle.origin.x),2) + Math.pow((base.y - circle.origin.y),2) )

    var theta = Math.asin(((distance/2)/distanceToCircle)/circle.radius)
    var circumference = Math.PI * circle.radius * 2
    var circularDist = circumference * (theta/(2*Math.PI))
    var idealCircularDist = circumference * (1/baseCount)

    var scaler = 0.01
    var resolution = 100
    var force = ((idealCircularDist-circularDist)*scaler);

    var forceX = force * (base.x - otherBase.x)/(distance)
    var forceY = force * (base.y - otherBase.y)/(distance)

    return {x: forceX, y: forceY}
}


// TICKING SECTION ===============================================

function tickPlasmid(locations) {
    var temp = [];
    for (var i=0;i<locations.bases.length;i++) {


        var forces = [
            baseForceFromCircle(locations.bases[i],locations.circle),

            baseForceFromEachOther(locations.bases[i],
                locations.bases[mod((i+1),locations.bases.length)],
                locations.circle,
                locations.bases.length,
                locations.bases[i].base),

            baseForceFromEachOther(locations.bases[i],
                locations.bases[mod((i-1),locations.bases.length)],
                locations.circle,
                locations.bases.length,
                locations.bases[i].base)
        ]

        var force = {x:0,y:0}

        for (var j=0;j<forces.length;j++) {
            force = {x:force.x+forces[j].x,y:force.y+forces[j].y}
        }
        //console.log(temp)

        var damper = 0.9
        var resolution = 100
        var speedLimit = 3

        if (force.x > speedLimit) {force.x = speedLimit}
        if (force.y > speedLimit) {force.y = speedLimit}

        //console.log(locations.bases[i].vx)

        var tempvx = Math.round((locations.bases[i].vx+force.x/locations.bases[i].weight)*damper*resolution)/resolution;
        var tempvy = Math.round((locations.bases[i].vy+force.y/locations.bases[i].weight)*damper*resolution)/resolution;

        temp = [...temp, {base: locations.bases[i].base,
            x:locations.bases[i].x+locations.bases[i].vx,
            y:locations.bases[i].y+locations.bases[i].vy,
            vx: tempvx,
            vy: tempvy,
            weight: 1}]
    }
    return (temp);
}

// HANDLER SECTION ===============================================

function Main() {

    // INIT ----------------------------------------------
    const [locations, setLocations, canvasRef] = usePersistentCanvas();
    //console.log(locations)

    // TIMER ---------------------------------------------
    React.useEffect(() => {
        var timerID = setInterval(() => tickMaster(), 10);

        return function cleanup() {

        clearInterval(timerID);
        };
    })

    function tickMaster() {

    //console.log(temp)

    var temp = tickPlasmid(locations);
    // tickRNAPol(locations)
    // tickMRNA(locations)
    // tickRibosome(locations)
    // tickAminos(locations)
    // tickProtein(locations)

    setLocations({...locations,bases:temp});
    }

    // HANDLERS ---------------------------------------------

      function handleCanvasClick(e) {

      }

      function handleClear() {
        setLocations({...locations,bases:[]})
      }

      function handleUndo() {
        console.log(locations);
        tickMaster();
      }

      function handleSeqChange(e) {
            var temp = [];

            var seq = e.target.value
            for (var i=0;i<seq.length;i++) {
                var newLocation = {base: seq[i], x: Math.random()*200, y: Math.random()*200, vx: 0, vy: 0, weight: 1}
                temp = [...temp, newLocation]
            }

            setLocations({...locations,bases:temp})
            // const newLocation = { base: e.target.value, x: Math.random()*200, y: Math.random()*200}
            // setLocations([...locations, newLocation])
      }

      // RENDER JSX ---------------------------------------------

      return (
          <div>

        <canvas
            ref={canvasRef}
            style = {{
                width: '100vw',
                height: '100vh',
                border: '1px solid black'
            }}
            onClick={handleCanvasClick}
            display= 'inline-block'
          />

          <div className="controls">
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleUndo}>Undo</button>
            <input onChange={handleSeqChange}
            ></input></div>
        </div>
    )
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);