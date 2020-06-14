import ReactDOM from 'react-dom';
import React, { useState, createContext, useMemo, useCallback, useEffect } from 'react';
//import { SeqViz } from "seqviz";
//import { usePersistentCanvas } from './hooks'
import * as d3 from 'd3';
import './App.css'
import * as genbankParser from 'genbank-parser'

// DECLARATION SECTION ======================================================================

function mod(n, m) {
  return ((n % m) + m) % m;
}

function usePersistentState(init) {
  const [value, setValue] = React.useState(
    //JSON.parse(localStorage.getItem('draw-app')) || init
  )

  React.useEffect(() => {
    localStorage.setItem('draw-app', JSON.stringify(value))
  })

  return [value, setValue]
}

function usePersistentCanvas() {
  const [locations, setLocations] = useState(init());

  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    drawMaster(ctx, locations)
  })

  return [locations, setLocations, canvasRef]
}

function init(){

    var base_image = '';
    //base_image.src = "https://upload.wikimedia.org/wikipedia/commons/7/7d/Eukaryotic_RNA-polymerase_II_structure_1WCM.png";
    return {
        scenario: 'fullPlasmid',
        //scenario: fullPlasmid, arc, poly, zoom

        circle:
            {radius: radiusSizer(), origin:
                {x:window.innerWidth*0.4, y:window.innerHeight/2}
            },
        //arc,
        seqName: '',
        link:'',
        purpose: '',
        bases:[],
        baseString: '',
        annotations:[],
        features:[],
        selection: {
            pointer: null,
            start: 0,
            end: 0,
            endmax: 0,
            activated: false,
            mousex: null,
            mousey: null
        },
        zoom: {
            zoomLevel: 1,
            isZooming: 0,
            zoomDirection: -1,
            zoomCenter: 0
        },
        poly: {
            x: 100,
            y: 100,
            target: -1
        },
        image: base_image
    }
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function prng(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function random_rgb(seed, lightener) {
    var color = prng(seed)
    var hslbaseashex = hslToHex(360 * color,
             75,
             (85 + 10 * color) * lightener)
    return hslbaseashex;
}

function radiusSizer(){
    return Math.min(window.innerWidth/4,window.innerHeight/2.75)
}

// LOGICAL HELPERS ===============================================================================

function loadFullChange(){

}

function loadPartialBaseChange(){

}

function stringToBases(baseString){

    var temp = []

    for (var i =0; i < baseString.length; i++) {
        var base = {
            base: baseString[i],
            x: 100,
            y: 100,
            vx: 0,
            vy: 0,
            weight: 1
        }
        temp = [...temp,base]
    }

    return temp
}

function getDefaultBases() {
    return 'ACCTGCGGGCCGTCTAAAAATTAAGGAAAAGCAGCAAAGGTGCATTTTTAAAATATGAAA\n' +
    'TGAAGATACCGCAGTACCAATTATTTTCGCAGTACAAATAATGCGCGGCCGGTGCATTTT\n' +
    'TCGAAAGAACGCGAGACAAACAGGACAATTAAAGTTAGTTTTTCGAGTTAGCGTGTTTGA\n' +
    'ATACTGCAAGATACAAGATAAATAGAGTAGTTGAAACTAGATATCAATTGCACACAAGAT\n' +
    'CGGCGCTAAGCATGCCACAATTTGGTATATTATGTAAAACACCACCTAAGGTGCTTGTTC\n' +
    'GTCAGTTTGTGGAAAGGTTTGAAAGACCTTCAGGTGAGAAAATAGCATTATGTGCTGCTG\n' +
    'AACTAACCTATTTATGTTGGATGATTACACATAACGGAACAGCAATCAAGAGAGCCACAT\n' +
    'TCATGAGCTATAATACTATCATAAGCAATTCGCTGAGTTTCGATATTGTCAATAAATCAC\n' +
    'TCCAGTTTAAATACAAGACGCAAAAAGCAACAATTCTGGAAGCCTCATTAAAGAAATTGA\n' +
    'TTCCTGCTTGGGAATTTACAATTATTCCTTACTATGGACAAAAACATCAATCTGATATCA\n' +
    'CTGATATTGTAAGTAGTTTGCAATTACAGTTCGAATCATCGGAAGAAGCAGATAAGGGAA\n' +
    'ATAGCCACAGTAAAAAAATGCTTAAAGCACTTCTAAGTGAGGGTGAAAGCATCTGGGAGA\n' +
    'TCACTGAGAAAATACTAAATTCGTTTGAGTATACTTCGAGATTTACAAAAACAAAAACTT\n' +
    'TATACCAATTCCTCTTCCTAGCTACTTTCATCAATTGTGGAAGATTCAGCGATATTAAGA\n' +
    'ACGTTGATCCGAAATCATTTAAATTAGTCCAAAATAAGTATCTGGGAGTAATAATCCAGT\n' +
    'GTTTAGTGACAGAGACAAAGACAAGCGTTAGTAGGCACATATACTTCTTTAGCGCAAGGG\n' +
    'GTAGGATCGATCCACTTGTATATTTGGATGAATTTTTGAGGAATTCTGAACCAGTCCTAA\n' +
    'AACGAGTAAATAGGACCGGCAATTCTTCAAGCAATAAACAGGAATACCAATTATTAAAAG\n' +
    'ATAACTTAGTCAGATCGTACAATAAAGCTTTGAAGAAAAATGCGCCTTATTCAATCTTTG\n' +
    'CTATAAAAAATGGCCCAAAATCTCACATTGGAAGACATTTGATGACCTCATTTCTTTCAA\n' +
    'TGAAGGGCCTAACGGAGTTGACTAATGTTGTGGGAAATTGGAGCGATAAGCGTGCTTCTG\n' +
    'CCGTGGCCAGGACAACGTATACTCATCAGATAACAGCAATACCTGATCACTACTTCGCAC\n' +
    'TAGTTTCTCGGTACTATGCATATGATCCAATATCAAAGGAAATGATAGCATTGAAGGATG\n' +
    'AGACTAATCCAATTGAGGAGTGGCAGCATATAGAACAGCTAAAGGGTAGTGCTGAAGGAA\n' +
    'GCATACGATACCCCGCATGGAATGGGATAATATCACAGGAGGTACTAGACTACCTTTCAT\n' +
    'CCTACATAAATAGACGCATATAAGTACGCATTTAAGCATAAACACGCACTATGCCGTTCT\n' +
    'TCTCATGTATATATATATACAGGCAACACGCAGATATAGGTGCGACGTGAACAGTGAGCT\n' +
    'GTATGTGCGCAGCTCGCGTTGCATTTTCGGAAGCGCTCGTTTTCGGAAACGCTTTGAAGT\n' +
    'TCCTATTCCGAAGTTCCTATTCTCTAGAAAGTATAGGAACTTCAGAGCGCTTTTGAAAAC\n' +
    'CAAAAGCGCTCTGAAGACGCACTTTCAAAAAACCAAAAACGCACCGGACTGTAACGAGCT\n' +
    'ACTAAAATATTGCGAATACCGCTTCCACAAACATTGCTCAAAAGTATCTCTTTGCTATAT\n' +
    'ATCTCTGTGCTATATCCCTATATAACCTACCCATCCACCTTTCGCTCCTTGAACTTGCAT\n' +
    'CTAAACTCGACCTCTACATCAACAGGCTTCCAATGCTCTTCAAATTTTACTGTCAAGTAG\n' +
    'ACCCATACGGCTGTAATATGCTGCTCTTCATAATGTAAGCTTATCTTTATCGAATCGTGT\n' +
    'GAAAAACTACTACCGCGATAAACCTTTACGGTTCCCTGAGATTGAATTAGTTCCTTTAGT\n' +
    'ATATGATACAAGACACTTTTGAACTTTGTACGACGAATTTTGAGGTTCGCCATCCTCTGG\n' +
    'CTATTTCCAATTATCCTGTCGGCTATTATCTCCGCCTCAGTTTGATCTTCCGCTTCAGAC\n' +
    'TGCCATTTTTCACATAATGAATCTATTTCACCCCACAATCCTTCATCCGCCTCCGCATCT\n' +
    'TGTTCCGTTAAACTATTGACTTCATGTTGTACATTGTTTAGTTCACGAGAAGGGTCCTCT\n' +
    'TCAGGCGGTAGCTCCTGATCTCCTATATGACCTTTATCCTGTTCTCTTTCCACAAACTTA\n' +
    'GAAATGTATTCATGAATTATGGAGCACCTAATAACATTCTTCAAGGCGGAGAAGTTTGGG\n' +
    'CCAGATGCCCAATATGCTTGACATGAAAACGTGAGAATGAATTTAGTATTATTGTGATAT\n' +
    'TCTGAGGCAATTTTATTATAATCTCGAAGATAAGAGAAGAATGCAGTGACCTTTGTATTG\n' +
    'ACAAATGGAGATTCCATGTATCTAAAAAATACGCCTTTAGGCCTTCTGATACCCTTTCCC\n' +
    'CTGCGGTTTAGCGTGCCTTTTACATTAATATCTAAACCCTCTCCGATGGTGGCCTTTAAC\n' +
    'TGACTAATAAATGCAACCGATATAAACTGTGATAATTCTGGGTGATTTATGATTCGATCG\n' +
    'ACAATTGTATTGTACACTAGTGCAGGATCAGGCCAATCCAGTTCTTTTTCAATTACCGGT\n' +
    'GTGTCGTCTGTATTCAGTACATGTCCAACAAATGCAAATGCTAACGTTTTGTATTTCTTA\n' +
    'TAATTGTCAGGAACTGGAAAAGTCCCCCTTGTCGTCTCGATTACACACCTACTTTCATCG\n' +
    'TACACCATAGGTTGGAAGTGCTGCATAATACATTGCTTAATACAAGCAAGCAGTCTCTCG\n' +
    'CCATTCATATTTCAGTTATTTTCCATTACAGCTGATGTCATTGTATATCAGCGCTGTAAA\n' +
    'AATCTATCTGTTACAGAAGGTTTTCGCGGTTTTTATAAACAAAACTTTCGTTACGAAATC\n' +
    'GAGCAATCACCCCAGCTGCGTATTTGGAAATTCGGGAAAAAGTAGAGCAACGCGAGTTGC\n' +
    'ATTTTTTACACCATAATGCATGATTAACTTCGAGAAGGGATTAAGGCTAATTTCACTAGT\n' +
    'ATGTTTCAAAAACCTCAATCTGTCCATTGAATGCCTTATAAAACAGCTATAGATTGCATA\n' +
    'GAAGAGTTAGCTACTCAATGCTTTTTGTCAAAGCTTACTGATGATGATGTGTCTACTTTC\n' +
    'AGGCGGGTCTGTAGTAAGGAGAATGACATTATAAAGCTGGCACTTAGAATTCCACGGACT\n' +
    'ATAGACTATACTAGTATACTCCGTCTACTGTACGATACACTTCCGCTCAGGTCCTTGTCC\n' +
    'TTTAACGAGGCCTTACCACTCTTTTGTTACTCTATTGATCCAGCTCAGCAAAGGCAGTGT\n' +
    'GATCTAAGATTCTATCTTCGCGATGTAGTAAAACTAGCTAGACCGAGAAAGAGACTAGAA\n' +
    'ATGCAAAAGGCACTTCTACAATGGCTGCCATCATTATTATCCGATGTGACGCTGCAGCTT\n' +
    'CTCAATGATATTCGAATACGCTTTGAGGAGATACAGCCTAATATCCGACAAACTGTTTTA\n' +
    'CAGATTTACGATCGTACTTGTTACCCATCATTGAATTTTGAACATCCGAACCTGGGAGTT\n' +
    'TTCCCTGAAACAGATAGTATATTTGAACCTGTATAATAATATATAGTCTAGCGCTTTACG\n' +
    'GAAGACAATGTATGTATTTCGGTTCCTGGAGAAACTATTGCATCTATTGCATAGGTAATC\n' +
    'TTGCACGTCGCATCCCCGGTTCATTTTCTGCGTTTCCATCTTGCACTTCAATAGCATATC\n' +
    'TTTGTTAACGAAGCATCTGTGCTTCATTTTGTAGAACAAAAATGCAACGCGAGAGCGCTA\n' +
    'ATTTTTCAAACAAAGAATCTGAGCTGCATTTTTACAGAACAGAAATGCAACGCGAAAGCG\n' +
    'CTATTTTACCAACGAAGAATCTGTGCTTCATTTTTGTAAAACAAAAATGCAACGCGAGAG\n' +
    'CGCTAATTTTTCAAACAAAGAATCTGAGCTGCATTTTTACAGAACAGAAATGCAACGCGA\n' +
    'GAGCGCTATTTTACCAACAAAGAATCTATACTTCTTTTTTGTTCTACAAAAATGCATCCC\n' +
    'GAGAGCGCTATTTTTCTAACAAAGCATCTTAGATTACTTTTTTTCTCCTTTGTGCGCTCT\n' +
    'ATAATGCAGTCTCTTGATAACTTTTTGCACTGTAGGTCCGTTAAGGTTAGAAGAAGGCTA\n' +
    'CTTTGGTGTCTATTTTCTCTTCCATAAAAAAAGCCTGACTCCACTTCCCGCGTTTACTGA\n' +
    'TTACTAGCGAAGCTGCGGGTGCATTTTTTCAAGATAAAGGCATCCCCGATTATATTCTAT\n' +
    'ACCGATGTGGATTGCGCATACTTTGTGAACAGAAAGTGATAGCGTTGATGATTCTTCATT\n' +
    'GGTCAGAAAATTATGAACGGTTTCTTCTATTTTGTCTCTATATACTACGTATAGGAAATG\n' +
    'TTTACATTTTCGTATTGTTTTCGATTCACTCTATGAATAGTTCTTACTACAATTTTTTTG\n' +
    'TCTAAAGAGTAATACTAGAGATAAACATAAAAAATGTAGAGGTCGAGTTTAGATGCAAGT\n' +
    'TCAAGGAGCGAAAGGTGGATGGGTAGGTTATATAGGGATATAGCACAGAGATATATAGCA\n' +
    'AAGAGATACTTTTGAGCAATGTTTGTGGAAGCGGTATTCGCAATATTTTAGTAGCTCGTT\n' +
    'ACAGTCCGGTGCGTTTTTGGTTTTTTGAAAGTGCGTCTTCAGAGCGCTTTTGGTTTTCAA\n' +
    'AAGCGCTCTGAAGTTCCTATACTTTCTAGAGAATAGGAACTTCGGAATAGGAACTTCAAA\n' +
    'GCGTTTCCGAAAACGAGCGCTTCCGAAAATGCAACGCGAGCTGCGCACATACAGCTCACT\n' +
    'GTTCACGTCGCACCTATATCTGCGTGTTGCCTGTATATATATATACATGAGAAGAACGGC\n' +
    'ATAGTGCGTGTTTATGCTTAAATGCGTACTTATATGCGTCTATTTATGTAGGATGAAAGG\n' +
    'TAGTCTAGTACCTCCTGTGATATTATCCCATTCCATGCGGGGTATCGTATGCTTCCTTCA\n' +
    'GCACTACCCTTTAGCTGTTCTATATGCTGCCACTCCTCAATTGGATTAGTCTCATCCTTC\n' +
    'AATGCTATCATTTCCTTTGATATTGGATCATACCCTAGAAGTATTACGTGATTTTCTGCC\n' +
    'CCTTACCCTCGTTGCTACTCTCCTTTTTTTCGTGGGAACCGCTTTAGGGCCCTCAGTGAT\n' +
    'GGTGTTTTGTAATTTATATGCTCCTCTTGCATTTGTGTCTCTACTTCTTGTTCGCCTGGA\n' +
    'GGGAACTTCTTCATTTGTATTAGCATGGTTCACTTCAGTCCTTCCTTCCAACTCACTCTT\n' +
    'TTTTTGCTGTAAACGATTCTCTGCCGCCAGTTCATTGAAACTATTGAATATATCCTTTAG\n' +
    'AGATTCCGGGATGAATAAATCACCTATTAAAGCAGCTTGACGATCTGGTGGAACTAAAGT\n' +
    'AAGCAATTGGGTAACGACGCTTACGAGCTTCATAACATCTTCTTCCGTTGGAGCTGGTGG\n' +
    'GACTAATAACTGTGTACAATCCATTTTTCTCATGAGCATTTCGGTAGCTCTCTTCTTGTC\n' +
    'TTTCTCGGGCAATCTTCCTATTATTATAGCAATAGATTTGTATAGTTGCTTTCTATTGTC\n' +
    'TAACAGCTTGTTATTCTGTAGCATCAAATCTATGGCAGCCTGACTTGCTTCTTGTGAAGA\n' +
    'GAGCATACCATTTCCAATCGAATCAAACCTTTCCTTAACCATCTTCGCAGCAGGCAAAAT\n' +
    'TACCTCAGCACTGGAGTCAGAAGATACGCTGGAATCTTCTGCGCTAGAATCAAGACCATA\n' +
    'CGGCCTACCGGTTGTGAGAGATTCCATGGGCCTTATGACATATCCTGGAAAGAGTAGCTC\n' +
    'ATCAGACTTACGTTTACTCTCTATATCAATATCTACATCAGGAGCAATCATTTCAATAAA\n' +
    'CAGCCGACATACATCCCAGACGCTATAAGCTGTACGTGCTTTTACCGTCAGATTCTTGGC\n' +
    'TGTTTCAATGTCGTCCATTTTGGTTTTCTTTTACCAGTATTGTTCGTTTGATAATGTATT\n' +
    'CTTGCTTATTACATTATAAAATCTGTGCAGATCACATGTCAAAACAACTTTTTATCACAA\n' +
    'GATAGTACCGCAAAACGA'
}

function parseTextFile(file){
    var parsedFile = genbankParser(file)
    return parsedFile
}

function getFullDefault() {

    var reader = new FileReader();
    var genbank = ''
    var result = ''
    var file = parseTextFile(readTextFile('https://media.addgene.org/snapgene-media/v1.6.2-0-g4b4ed87/sequences/75/11/267511/addgene-plasmid-18916-sequence-267511.gbk'))
    var root = file[0]

    var newCircle = {radius: radiusSizer(), origin:
                {x:window.innerWidth*0.4, y:window.innerHeight/2}
        }

    var newString = root.sequence.toUpperCase()
    var newBases = []
    for (var i=0; i < newString.length; i++) {
        var number = i
        var loc = getCircleLocation(number, newString.length, newCircle)
        var addedBase = {
            number: number,
            letter: newString[i],
            x: loc.x + (Math.random() - 0.5) * 100,
            y: loc.y + (Math.random() - 0.5) * 100,
            vx: 0,
            vy: 0,
            weight: 1
        }
        newBases = [...newBases, addedBase]
    }

    var base_image = new Image();
    base_image.src = "https://upload.wikimedia.org/wikipedia/commons/7/7d/Eukaryotic_RNA-polymerase_II_structure_1WCM.png";

    var newLocations = {
        scenario: 'fullPlasmid',
        circle: newCircle,
        seqName:root.keywords,
        link: 'https://www.addgene.org/60957/',
        purpose: root.definition,
        bases:newBases,
        baseString: newString,
        annotations:getDefaultAnnotations(),
        features:root.features,
        selection: {
            start: Math.PI * (-0.4),
            end: Math.PI * (-0.6),
            endmax: Math.PI * (-0.6),
            activated: false,
            mousex: null,
            mousey: null
        },
        zoom: {
            pointer: null,
            zoomLevel: 1,
            isZooming: 0,
            zoomDirection: -1,
            zoomCenter: 0
        },
        poly: {
            x: 100,
            y: 100,
            target: -1
        },
        image: base_image
    }

    return newLocations
}

function getDefaultFeatures(){
    var features = [
        {
            name: 'Cas9',
            start: 0,
            end: 2735,
            color: '#e39bbf'
        },
        {
            name: 'EcoR1',
            start: 2736,
            end: 4023,
            color: '#87bbdc'
        },
        {
            name: 'TANF',
            start: 4324,
            end: 4978,
            color: '#f5c1a0'
        }
    ]
    return features
}

function getDefaultAnnotations(){
    var anns = [
        {
            name: 'Waldo',
            locus: 1232
        },
        {
            name: 'Wanda',
            locus: 23
        },
        {
            name: 'Aries',
            locus: 24
        }
    ]
    return anns
}

function updateBases(newString, oldString, oldBases, circle) {
    // need to handle base insertion or deletion later on
    var newBases = oldBases

    for (var i=0; i < (newString.length - oldString.length); i++) {
        var number = oldBases.length + i
        var loc = getCircleLocation(number, newString.length, circle)
        var addedBase = {
            number: number,
            letter: newString[oldBases.length + i],
            x: loc.x + (Math.random() - 0.5) * 100,
            y: loc.y + (Math.random() - 0.5) * 100,
            vx: 0,
            vy: 0,
            weight: 1
        }
        newBases = [...newBases, addedBase]
    }

    return newBases
}

// DRAWING SECTION ======================================================================

function drawMaster(ctx,locations) {

    drawCircleGuide(ctx, locations)
    drawFeatures(ctx, locations)
    drawCenter(ctx, locations)
    drawAnnotations(ctx, locations)

    if (locations.scenario === 'fullPlasmid') {

        drawPointer(ctx, locations)
        if(locations.selection.activated == true){
            drawSelector(ctx, locations)
        }
    } else if (locations.scenario === 'poly') {
        drawPoly(ctx, locations)
        drawPlasmid(ctx, locations)
        // drawRNAPol(ctx,locations)
        // drawMRNA(ctx,locations)
        // drawRibosome(ctx,locations)
        // drawAminos(ctx,locations)
        // drawProtein(ctx,locations)
    } else if (locations.scenario === 'arc') {
        drawPlasmid(ctx, locations)
        // drawArc(ctx,locations)
        // drawArcBases(ctx,locations)
    } else if (locations.scenario === 'zoom') {
        drawPlasmid(ctx, locations)
        // drawCircleGuide(ctx,locations)
        // drawPlasmid(ctx,locations)
        // drawArc(ctx,locations)
        // drawArcBases(ctx,locations)
    }
}

function drawSelector(ctx, locations) {
    var start = locations.selection.start
    var pointer = locations.selection.pointer

    var baseMax = 1000
    var max = Math.PI * 2 * baseMax / locations.bases.length

    ctx.strokeStyle = 'rgba(95,154,220,0.75)'
    //draw start
    var upper = 1.2
    var lower = 0.8

    ctx.beginPath();
    ctx.moveTo(Math.cos(start) * locations.circle.radius * lower + locations.circle.origin.x,
        Math.sin(start) * locations.circle.radius * lower + locations.circle.origin.y)
    ctx.lineTo(Math.cos(start) * locations.circle.radius * upper + locations.circle.origin.x,
        Math.sin(start) * locations.circle.radius * upper + locations.circle.origin.y)
    ctx.stroke();

    //draw max

    //draw selection highlight

    var radius = locations.circle.radius
    var origin = locations.circle.origin

    var upperLeft = {x: Math.cos(start) * locations.circle.radius * upper + locations.circle.origin.x,
        y: Math.sin(start) * locations.circle.radius * upper + locations.circle.origin.y}
    var lowerLeft = {x: Math.cos(start) * locations.circle.radius * lower + locations.circle.origin.x,
        y: Math.sin(start) * locations.circle.radius * lower + locations.circle.origin.y}
    var upperRight = {x: Math.cos(pointer) * locations.circle.radius * upper + locations.circle.origin.x,
        y: Math.sin(pointer) * locations.circle.radius * upper + locations.circle.origin.y}
    var lowerRight = {x: Math.cos(pointer) * locations.circle.radius * lower + locations.circle.origin.x,
        y: Math.sin(pointer) * locations.circle.radius * lower + locations.circle.origin.y}

    ctx.fillStyle = 'rgba(95,154,220,0.5)'
    ctx.beginPath()
    ctx.moveTo(upperLeft.x, upperLeft.y)
    ctx.lineTo(lowerLeft.x, lowerLeft.y)
    if (((pointer - start > 0) && (pointer - start < Math.PI)) ||
        ((Math.abs(pointer - start) > Math.PI) && (pointer - start < 0))
    ){
        ctx.arc(origin.x, origin.y, radius * upper, start, pointer, false)
        ctx.lineTo(upperRight.x, upperRight.y)
        ctx.lineTo(lowerRight.x, lowerRight.y)
        ctx.arc(origin.x, origin.y, radius * lower, pointer, start, true)
    } else {
        ctx.arc(origin.x, origin.y, radius * upper, pointer, start, false)
        ctx.lineTo(lowerRight.x, lowerRight.y)
        ctx.lineTo(upperRight.x, upperRight.y)
        ctx.arc(origin.x, origin.y, radius * lower, start, pointer, true)
    }

    ctx.fill()

    //draw excess highlight

}

function drawPointer(ctx, locations){
    var pointer = locations.selection.pointer
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(68,68,68)'
    ctx.moveTo(Math.cos(pointer) * locations.circle.radius * 0.8 + locations.circle.origin.x,
        Math.sin(pointer) * locations.circle.radius * 0.8 + locations.circle.origin.y)
    ctx.lineTo(Math.cos(pointer) * locations.circle.radius * 1.2 + locations.circle.origin.x,
        Math.sin(pointer) * locations.circle.radius * 1.2 + locations.circle.origin.y)
    ctx.stroke();
}

function drawPoly(ctx, locations){
    ctx.drawImage(locations.image, locations.poly.x-50,locations.poly.y-125,window.innerWidth/6,window.innerWidth/6)

}

function drawCenter(ctx, locations) {
    ctx.font = '24px Arial'
    ctx.textAlign = 'center'
    var locx = locations.circle.origin.x
    var locy = locations.circle.origin.y
    ctx.fillStyle = "black";
    ctx.fillText(locations.seqName, locx, locy - 40)
    ctx.font = '18px Arial'
    var para = locations.purpose.split(' ')
    var inc = 50
    var yadjust = 0;
    var text = '';
    for (var i = 0; i < para.length; i++){
        var text = text.concat(para[i], ' ')
        if ((text.length > inc) || (i == para.length -1)) {
            ctx.fillText(text, locx, locy + yadjust)
            yadjust += 25;
            text = '';
        }
    }
}

function drawFeatures(ctx, locations){
    var radius = locations.circle.radius - 50;
    var origin = locations.circle.origin
    var length = locations.bases.length
    if (length === 0){
        length = 1
    }

    var lastend = 0;
    var toggle = 0;
    var radchange = 0.85;

    for (var i = 0; i<locations.features.length; i++) {
        var feat = locations.features[i]
        if ((!['promoter','enhancer','misc_RNA','CDS','polyA_signal','rep_origin', 'repeat_region'].includes(feat.type))) {
            continue
        }
        if (feat.start < lastend){
            radius *= radchange
            toggle = 1
        }
        var startRotation = Math.PI*2*feat.start/length
        var lower = Math.pow(0.95, (1/locations.zoom.zoomLevel))
        var upper = Math.pow(1.05, (1/locations.zoom.zoomLevel))
        var leftCos = Math.cos(startRotation)
        var leftSin = Math.sin(startRotation)
        var lowerLeft = {
            x: leftCos * radius * lower + origin.x,
            y: leftSin * radius * lower + origin.y
        }
        var upperLeft = {
            x: leftCos * radius * upper + origin.x,
            y: leftSin * radius * upper + origin.y
        }

        var endRotation = Math.PI*2*feat.end/locations.baseString.length
        var arrowFrac = 2*Math.PI * (1/150)/locations.zoom.zoomLevel
        if (Math.abs(startRotation - endRotation) < 0.25) {
            arrowFrac = Math.abs(startRotation - endRotation) * 0.2
        }

        var rightCos = Math.cos(endRotation - arrowFrac)
        var rightSin = Math.sin(endRotation - arrowFrac)
        var lowerRight = {
            x: rightCos * radius * lower + origin.x,
            y: rightSin * radius * lower + origin.y
        }

        var midRight = {
            x: Math.cos(endRotation) * radius + origin.x,
            y: Math.sin(endRotation) * radius + origin.y
        }

        var upperRight = {
            x: rightCos * radius * upper + origin.x,
            y: rightSin * radius * upper + origin.y
        }

        ctx.fillStyle = random_rgb(feat.end / feat.start, 0.9)
        ctx.beginPath()
        ctx.moveTo(upperLeft.x, upperLeft.y)
        ctx.lineTo(lowerLeft.x, lowerLeft.y)
        ctx.arc(origin.x, origin.y, radius * upper, startRotation, endRotation - arrowFrac, false)
        ctx.lineTo(upperRight.x, upperRight.y)
        ctx.lineTo(midRight.x, midRight.y)
        ctx.lineTo(lowerRight.x, lowerRight.y)
        ctx.arc(origin.x, origin.y, radius * lower, endRotation - arrowFrac, startRotation, true)
        ctx.fill()

        ctx.strokeStyle = random_rgb(feat.end / feat.start, 0.8)
        //ctx.strokeStyle = random_rgb(feat.end / feat.start)
        ctx.stroke()

        drawFeatureLabels(ctx, feat.name, radius, origin , startRotation, endRotation, lower, upper, feat.end, feat.start)

        if((toggle == 1) && (locations.features[mod(i+1,locations.features.length)].start > lastend)){
            radius *= (1/radchange)
            toggle = 0
        } else if (toggle == 0) {
            lastend = feat.end
        }
    }
}

function drawFeatureLabels(ctx, name, radius, origin, start, end, lower, upper, endBase, startBase){
    var fontheight = Math.max(Math.min((upper - lower)*radius/2,18),10)
    var namelen = name.length * fontheight * 3.5
    var textwidth = radius * (end - start) * 2 * Math.PI
    if (namelen >= textwidth){
        return;
    }
    ctx.fillStyle = 'black'
    ctx.textAlign = "center"
    var circumference = Math.PI * 2 * radius
    var center = (end + start)/2
    var textcolor = 'rgb(64,64,64)'
    for (var i = 0; i < name.length; i++){
        var spacing = (lower + (upper - lower)/3)
        var startAngle = center - fontheight * 3.5 * (name.length/2 - i) / (2 * Math.PI * radius)
        var rotation = startAngle + 0.5 * Math.PI
        var letter = name[i]
        var spacer2 = 0;
        if (rotation > 0.5*Math.PI && rotation < 1.5 * Math.PI){
            rotation += Math.PI
            letter = name[name.length - i - 1]
            spacing = (lower + (upper - lower)*2/3)
        }
        var x = origin.x + radius * Math.cos(startAngle) * spacing
        var y = origin.y + radius * Math.sin(startAngle) * spacing
        ctx.translate(x,y)
        ctx.rotate(rotation)
        ctx.fillStyle = textcolor
        ctx.font = fontheight + 'px Andale Mono'
        ctx.fillText(letter, 0, 0)
        ctx.resetTransform();
    }
}

function drawAnnotations(ctx, locations){
    var circle = locations.circle
    var origin = circle.origin
    var textHeightMargin = 20
    var maxAnnots = Math.floor(circle.radius * 4/textHeightMargin)
    var circumferenceBases = locations.bases.length
    var inflectRadius = circle.radius + 25
    var endRadius = circle.radius + 75
    var triedLocs = []
    for (var i = 0; i<locations.features.length; i++) {
        var feat = locations.features[i]
        var startLoc = (feat.start/circumferenceBases) * Math.PI * 2
        var circleSeq = (Math.floor((feat.start/circumferenceBases)*maxAnnots))
        var idealSeq = circleSeq
        if ((['promoter', 'enhancer', 'misc_RNA', 'CDS', 'polyA_signal', 'rep_origin', 'repeat_region'].includes(feat.type))) {
            continue
        }
        // var asinArg = circleSeq * textHeightMargin/circle.radius
        // var adder = 0
        //
        ctx.textAlign = 'left'
        // if ((asinArg > 1) && (asinArg < 3)){
        //     asinArg = asinArg - 2
        //     adder += Math.PI
        //     ctx.textAlign = 'right'
        // } else if (asinArg > 3) {
        //     asinArg = asinArg -4
        //     adder -= 0
        //     ctx.textAlign = 'left'
        // }
        var closeLoc = Math.PI * 2 * circleSeq / maxAnnots
        var circleLoc = startLoc


        for (var j = 0; j < triedLocs.length; j++){
            var triedLoc = triedLocs[j]
            var dist = Math.abs(Math.sin(circleLoc) - Math.sin(triedLoc)) * maxAnnots /2
            if (dist < 1){
                circleLoc += Math.PI * 2 / maxAnnots
            }
        }

        if ((circleLoc > 0.5*Math.PI) && (circleLoc < 1.5 * Math.PI)){
            ctx.textAlign = 'right'
        }
        ctx.beginPath()
        ctx.strokeStyle = 'rgb(139,139,139)'

        var startX = Math.cos(startLoc) * circle.radius + origin.x
        var startY = Math.sin(startLoc) * circle.radius + origin.y
        ctx.moveTo(startX, startY)

        var inflectX = Math.cos(startLoc) * inflectRadius + origin.x
        var inflectY = Math.sin(startLoc) * inflectRadius + origin.y
        ctx.lineTo(inflectX, inflectY)

        var endX = Math.cos(circleLoc) * endRadius + origin.x
        var endY = Math.sin(circleLoc) * endRadius + origin.y
        ctx.lineTo(endX, endY)
        ctx.stroke()

        var textX = Math.cos(circleLoc) * (endRadius + textHeightMargin/2) + origin.x
        var textY = Math.sin(circleLoc) * (endRadius + textHeightMargin/2) + origin.y + textHeightMargin / 4

        ctx.font = '12px Arial'
        var rendertext = feat.name
        if (rendertext.includes('Kozak') || rendertext.includes('kozak')) {
            rendertext = 'Kozak sequence'
        } else if (rendertext.length > 30) {
            rendertext = rendertext.slice(0,30) + '...'
        }
        ctx.fillText(rendertext, textX, textY)

        triedLocs = [...triedLocs, circleLoc]
        if (triedLocs.length === maxAnnots){
            break
        }
    }
}

function drawCircleGuide(ctx,locations){

    var radius = locations.circle.radius
    var origX = locations.circle.origin.x
    var origY = locations.circle.origin.y

    var transparency = 1 //Math.pow(1/locations.zoom.zoomLevel,0.5)

    var strokeColor = `rgba(64,64,64,${transparency})`

    ctx.beginPath();
    ctx.arc(origX, origY, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();

}

function drawPlasmid(ctx,locations) {
    var start = Math.floor(((locations.selection.start)/(Math.PI*2))*locations.bases.length)
    var end = Math.floor(((locations.selection.end)/(Math.PI*2))*locations.bases.length)

    var transparency = 1-Math.pow(1/locations.zoom.zoomLevel,0.5)
    var strokeColor = `rgba(160,160,160,${transparency})`
    //a = 'rgb(201,161,92)'
    var inversion = false
    if (((locations.selection.start - locations.selection.end > Math.PI) && (locations.selection.start > 1.5*Math.PI)) ||
            ((locations.selection.start - locations.selection.end < -Math.PI) && (locations.selection.start < 0.5*Math.PI))){
        var inversion = true
    }
    if(inversion === false) {
        for (var i = start; i < end; i++) {

            var base = locations.bases[i]
            var base2 = locations.bases[mod(i + 1, locations.bases.length)]

            ctx.beginPath()
            ctx.arc(base.x, base.y, base.weight * locations.zoom.zoomLevel / 10, 0, 2 * Math.PI, false);
            ctx.lineWidth = 2;
            ctx.strokeStyle = strokeColor;
            var fillColor = ''
            if (base.letter === 'A') {
                fillColor = `rgba(91,183,248,${transparency})`
            } else if (base.letter === 'C') {
                fillColor = `rgba(201,161,92,${transparency})`
            } else if (base.letter === 'G') {
                fillColor = `rgba(19,153,23,${transparency})`
            } else if (base.letter === 'T') {
                fillColor = `rgba(227,111,111,${transparency})`
            } else {
                fillColor = `rgba(255,255,255,${transparency})`
            }
            ctx.fillStyle = fillColor
            ctx.stroke();
            ctx.font = '24px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(base.letter, base.x, base.y + 8)
        }
    } else if (start > end) {
        for (var i = start; i < locations.bases.length + end; i++) {

            var base = locations.bases[mod(i, locations.bases.length)]
            var base2 = locations.bases[mod(i + 1, locations.bases.length)]

            ctx.beginPath()
            ctx.arc(base.x, base.y, base.weight * locations.zoom.zoomLevel / 10, 0, 2 * Math.PI, false);
            ctx.lineWidth = 2;
            ctx.strokeStyle = strokeColor;
            var fillColor = ''
            if (base.letter === 'A') {
                fillColor = `rgba(91,183,248,${transparency})`
            } else if (base.letter === 'C') {
                fillColor = `rgba(201,161,92,${transparency})`
            } else if (base.letter === 'G') {
                fillColor = `rgba(19,153,23,${transparency})`
            } else if (base.letter === 'T') {
                fillColor = `rgba(227,111,111,${transparency})`
            } else {
                fillColor = `rgba(255,255,255,${transparency})`
            }
            ctx.fillStyle = fillColor
            ctx.stroke();
            ctx.font = '24px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(base.letter, base.x, base.y + 8)
        }
    } else {
        for (var i = start + locations.bases.length; i > end; i--) {
            var base = locations.bases[mod(i, locations.bases.length)]
            var base2 = locations.bases[mod(i + 1, locations.bases.length)]

            ctx.beginPath()
            ctx.arc(base.x, base.y, base.weight * locations.zoom.zoomLevel / 10, 0, 2 * Math.PI, false);
            ctx.lineWidth = 2;
            ctx.strokeStyle = strokeColor;
            var fillColor = ''
            if (base.letter === 'A') {
                fillColor = `rgba(91,183,248,${transparency})`
            } else if (base.letter === 'C') {
                fillColor = `rgba(201,161,92,${transparency})`
            } else if (base.letter === 'G') {
                fillColor = `rgba(19,153,23,${transparency})`
            } else if (base.letter === 'T') {
                fillColor = `rgba(227,111,111,${transparency})`
            } else {
                fillColor = `rgba(255,255,255,${transparency})`
            }
            ctx.fillStyle = fillColor
            ctx.stroke();
            ctx.font = '24px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(base.letter, base.x, base.y + 8)
        }
    }
}

// LOCATIONS AND FORCES SECTION ======================================================================
function baseForceFromCircle(base, circle, length){
    var center = getCircleLocation(base.number, length, circle)
    var newBase = base

    var damper = 3
    if (Math.abs((center.x - newBase.x)) > 0) {
        newBase.vx += (Math.pow(Math.abs((center.x - newBase.x)),0.5)*Math.sign(center.x - newBase.x)
            + (Math.random()-0.5) * 10);
    }

    if (Math.abs((center.y - newBase.y)) > 0) {
        newBase.vy += (Math.pow(Math.abs((center.y - newBase.y)),0.5)*Math.sign(center.y - newBase.y)
            + (Math.random()-0.5) * 10);
    }

    newBase.vx *= 1/damper;
    newBase.vy *= 1/damper;
    newBase.x += newBase.vx
    newBase.y += newBase.vy

    return newBase
}

function getCircleLocation(baseNumber, basesLength, circle){
    var increment = Math.PI * 2 / basesLength

    var xval = Math.cos(increment * baseNumber) * (circle.radius + 25) + circle.origin.x
    var yval = Math.sin(increment * baseNumber) * (circle.radius + 25) + circle.origin.y
    return {x: xval, y: yval}
}

function zoomBroker(root, trigger, zoomedMax){
    if ((root.zoom.isZooming === 0) && (trigger === true)){
        //start zooming
        root.zoom.zoomDirection *= -1
        root.zoom.isZooming = 1
        if (root.scenario === 'fullPlasmid'){
            if(((root.selection.start - root.selection.end > Math.PI) && (root.selection.start > 1.5*Math.PI)) ||
                ((root.selection.start - root.selection.end < -Math.PI) && (root.selection.start < 0.5*Math.PI))){
            root.zoom.zoomCenter = (root.selection.start + root.selection.end)/2 + Math.PI} else {
            root.zoom.zoomCenter = (root.selection.start + root.selection.end)/2
            }
        }
    } else if ((root.zoom.isZooming === 1) && (
        ((root.zoom.zoomLevel >= zoomedMax) && (root.zoom.zoomDirection === 1))
    )){
        //stop zooming
        root.zoom.isZooming = 0
        root.scenario = 'arc'
    } else if ((root.zoom.isZooming === 1) && (
        ((root.zoom.zoomLevel <= 1) && (root.zoom.zoomDirection === -1))

    )){
        root.zoom.isZooming = 0
        root.scenario = 'fullPlasmid'
    } else {
        root.scenario = 'zoom'
    }
    return root
}

function zoomCircle(locations, trigger){

    var startenddiff = (locations.selection.end) - (locations.selection.start)
    if (startenddiff < -Math.PI){
        startenddiff += Math.PI * 2
    }
    else if(((locations.selection.start - locations.selection.end > Math.PI) && (locations.selection.start > 1.5*Math.PI)) ||
                ((locations.selection.start - locations.selection.end < -Math.PI) && (locations.selection.start < 0.5*Math.PI))){
        startenddiff = -startenddiff + Math.PI * 2
    }
    var maxBasesOnZoom = Math.floor((((startenddiff)/(Math.PI*2))*locations.bases.length))
    if(maxBasesOnZoom < 10){
        maxBasesOnZoom = 10
    }
    var max = (locations.baseString.length/maxBasesOnZoom)/2
    var root = zoomBroker(locations, trigger, max)
    var startZoom = root.zoom.zoomLevel
    var zoomSpeed = 1.05
    var factor = Math.pow(zoomSpeed,root.zoom.zoomDirection)
    var startRadius = root.circle.radius
    root.circle.radius *= factor
    root.zoom.zoomLevel *= factor
    var windowContext = radiusSizer()
    if (root.circle.radius < windowContext){
        root.circle.radius = windowContext
        root.zoom.zoomLevel = 1
    } else if (root.circle.radius > (windowContext)*max) {
        root.circle.radius = windowContext*max
        root.zoom.zoomLevel = max
    }
    var adder = 0
    var adderspeed = 5
    if(true){
        adder = root.zoom.zoomDirection * adderspeed
    }
    var radiff = root.circle.radius - startRadius + adder
    var grow = factor
    var center = root.zoom.zoomCenter + Math.PI
    root.circle.origin.x += radiff * Math.cos(center)
    root.circle.origin.y += radiff * Math.sin(center)
    return root
}

function runPoly(locations, start, end){
    var root = locations
    var poly = root.poly
    var scenario = root.scenario
    if (poly.target < start){
        poly.target = start
        poly.x = -250
        poly.y = -250
        scenario = 'poly'
    }
    var target = root.bases[poly.target]
    var diffx = target.x - poly.x
    var diffy = target.y - poly.y
    if (Math.abs(diffx+diffy) < 10){
        root.poly.target += 1
    } else {
        poly.x += (diffx)/10
        poly.y += (diffy)/10
        if (poly.target > start) {
            root.bases[poly.target].x -= 10
            root.bases[poly.target].y -= 10
            root.bases[poly.target + 1].x -= 7
            root.bases[poly.target + 1].y -= 7
            root.bases[poly.target + 2].x -= 4
            root.bases[poly.target + 2].y -= 4
        }
    }
    if (poly.target > end){
        poly.target = -1
        scenario = 'arc'
    }
    root = {...root, poly: poly, scenario: scenario}
    return root
}

function runPointer (locations, mouse){
    var root = locations
    var origin = locations.circle.origin
    var x = mouse.clientX
    var y = mouse.clientY
    var ydiff = y - origin.y
    var xdiff = x - origin.x
    var r = Math.sqrt(Math.pow(x - origin.x,2) + Math.pow(ydiff,2))
    var angle = Math.atan2(ydiff,xdiff)
    if (angle < 0){
        angle += Math.PI * 2
    }
    var endmaxlength = 2*Math.PI/40
    root.selection.pointer = angle
    root.selection.mousex = x
    root.selection.mousey = y
    return root
}

function brokerMouseDrag(locations, event, direction){
    var root = locations
    if(direction == 'down'){
        root.selection.activated = true
        root.selection.start = root.selection.pointer
    } else if (direction == 'up') {
        root.selection.activated = false
        root.selection.end = root.selection.pointer
        if((root.selection.start > root.selection.end) && (root.selection.start - root.selection.end < Math.PI)) {
            var temp = root.selection.start
            root.selection.start = root.selection.end
            root.selection.end = temp
        }
        root = zoomCircle(root, true)
    }
    if (locations.scenario == 'fullPlasmid'){

    } else {
        root = dragBases(root)
    }
    return root
}

function dragBases(locations){
    var root = locations
    return root
}

// TICKING SECTION ======================================================================

function tickPlasmid(locations) {
    var root = locations

    if (root.zoom.isZooming === 1 ) {
        root = zoomCircle(root, false)
    }
    var newBases = root.bases
    var inversion = false
    var radialstart = locations.selection.start
    var radialend = locations.selection.end
    if (((radialstart - radialend > Math.PI) && (radialstart > 1.5*Math.PI)) ||
                ((radialstart - radialend < -Math.PI) && (radialstart < 0.5*Math.PI))){
        var temp = radialstart
        radialstart = radialend
        radialend = temp
        var inversion = true
    }

    var start = Math.floor((radialstart/(Math.PI * 2)) * locations.bases.length)
    var end = Math.floor((radialend/(Math.PI * 2)) * locations.bases.length)
    // if (start > end) {
    //     var temp = start
    //     start = end
    //     end = temp
    // }
    // ((pointer - start > 0) && (pointer - start < Math.PI)) ||
    //     ((Math.abs(pointer - start) > Math.PI) && (pointer - start < 0))

    if ((root.scenario === 'arc') || (root.scenario === 'zoom') || (root.scenario === 'poly')) {
        var lowerlimit, upperlimit
        if (inversion === false){
            lowerlimit = start
            upperlimit = end
        } else {
            lowerlimit = end
            upperlimit = start
        }
        if(inversion === false) {
            for (var i = 0; i < root.bases.length; i++) {
                var forcedBase = {}
                if ((i >= lowerlimit) && (i <= upperlimit)) {
                    newBases[i] = baseForceFromCircle(newBases[i], root.circle, root.bases.length)
                }
            }
        } else {
            for (var i = 0; i < root.bases.length; i++) {
                var forcedBase = {}
                if ((i <= lowerlimit) || (i >= upperlimit)) {
                    newBases[i] = baseForceFromCircle(newBases[i], root.circle, root.bases.length)
                }
            }
        }
    }

    root = {...root, bases: newBases}
    var ticker = start

    if (root.scenario === 'poly'){
        root = runPoly(root, start, end)
    }

    return root
}


// HANDLER SECTION ======================================================================

function Main() {
    const [locations, setLocations, canvasRef] = usePersistentCanvas();

    // TIMER ---------------------------------------------
    React.useEffect(() => {
        var timerID = setInterval(() => tickMaster(), 10);

        return function cleanup() {

        clearInterval(timerID);
        };
    })

    function tickMaster() {
        setLocations(tickPlasmid(locations))
    }

    // HANDLERS ---------------------------------------------

      function handleCanvasClick(e) {

      }

      function handleDefault() {
        setLocations(getFullDefault())
      }

      function handlePoly() {
        if(locations.scenario === 'arc'){
            setLocations({...locations, scenario:'poly'})
        }
      }

      function handleZoom() {
        setLocations(zoomCircle(locations, true))
      }

      function debug() {
        console.log(locations)
      }

      function handleSeqChange(e) {
        var clone = locations
        clone.bases = updateBases(e.target.value, locations.baseString, locations.bases, locations.circle)
        setLocations(clone)
        setLocations({...locations, baseString: e.target.value})

      }

      function handleMouseMove(e) {
        setLocations(runPointer(locations, e))
      }

      function handleMouseDown(e){
        setLocations(brokerMouseDrag(locations, e, 'down'))
      }

      function handleMouseUp(e){
        setLocations(brokerMouseDrag(locations, e, 'up'))
      }

      window.onresize = function() {
        setLocations({...locations,

          circle: {radius: radiusSizer(), origin:
              {x:window.innerWidth*0.4, y:window.innerHeight/2}
            }
        })
      }
      ;

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
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp = {handleMouseUp}
            display= 'inline-block'
          />

          <div className="controls">
            <button onClick={handleDefault}>Default</button>
            <button onClick={handleZoom}>Zoom</button>
            <button onClick={handlePoly}>Poly</button>
            <button onClick={debug}>Debug</button>
            <input onChange={handleSeqChange}
            ></input></div>
        </div>
    )
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);