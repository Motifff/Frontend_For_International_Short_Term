import React, { useRef } from "react";
import Sketch from "react-p5";

let x = 50;
let cnv = null;
let y = 50
let amp = 0;
let analyser;
let data;
let radialArcs = [];
let width = 0;
let height = 0;

class RadialArcs { // -------------------------   RadialArcs Class -------------------------------
    constructor(p5, arcCount, minR, maxR, baseR, maxStr, minH, maxH) {
        this.radialArcCount = arcCount;
        this.minRadius = minR;
        this.maxRadius = maxR;
        this.radialArcs = [];
        this.baselineR = baseR;
        this.maxStroke = maxStr;
        this.minHue = minH;
        this.maxHue = maxH;
        this.initArcs();
        this.p5 = p5
    }

    initArcs() {
        for (let a = 0; a < this.radialArcCount; a++) { // create a new radialArc object x radialArcCount
            // pass vals into constructor (id,arcs,minRadius,maxRadius,cX, cY, baseline angle)
            this.radialArcs[a] = new RadialArc(this.p5, a, this.radialArcCount, this.minRadius, this.maxRadius, this.baselineR, this.maxStroke, this.minHue, this.maxHue);
        }
    }

    updateArcs(d) {
        for (let a = this.radialArcs.length - 1; a >= 0; a--) { // work backwards down array of arcs, 
            if (a > 0) {
                this.radialArcs[a].setValue(this.radialArcs[a - 1].getValue()); // taking value from arc in position ahead in array, so shifting values up the array of arcs by one.
            } else {
                this.radialArcs[a].setValue(d); // until last arc, update with new value from data
            }
        }
    }

    drawArcs() {
        for (let a = 0; a < this.radialArcs.length; a++) {  // loop through array of arcs calling "draw"
            this.radialArcs[a].redrawFromData();
        }
    }
}

class RadialArc { // -------------------------   RadialArc Class -------------------------------
    constructor(p5, id, arcs, minR, maxR, baseR, maxStr, minH, maxH) {
        this.arcID = id;
        this.totalArcs = arcs;
        this.minRadius = minR; // min size of arc
        this.maxRadius = maxR; // max size of arc
        this.arcRadius = this.minRadius + (((this.maxRadius - this.minRadius) / this.totalArcs) * this.arcID + 1); // size of THIS arc based on position in arcs
        this.maxStroke = maxStr;
        this.minHue = minH;
        this.maxHue = maxH;
        this.dataVal = 0;
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.arcMaxRadian = 3.1415926 / 4.00; // max length of arc around circumference
        this.arcBaseline = baseR;
        this.arcStartRadian = 0; // starting radian of arc
        this.arcEndRadian = 0; // end radian of this arc (based on data)
        this.p5 = p5
    }

    setValue(d) {
        this.dataVal = d;
    }

    getValue() {
        return this.dataVal;
    }

    redrawFromData() {
        this.updateArc();
        this.drawArc();
    }

    updateArc() {
        this.arcEndRadian = this.arcBaseline + (this.arcMaxRadian * this.dataVal); // start of arc (radians) based on data
        this.arcStartRadian = this.arcBaseline - (this.arcMaxRadian * this.dataVal); // end of arc (radians) based on data
    }

    drawArc() {
        // this.dataColor = this.getDataHSBColor(this.dataVal); // get data scaled colour
        this.p5.stroke('black'); // set stroke colour
        // strokeWeight(map(this.dataVal,0,1,0,this.maxStroke)); // set stroke weight based on data
        this.p5.noFill(); // no fill in arc shape
        //arc(this.centerX,this.centerY,this.arcRadius,this.arcRadius,0,TWO_PI); // draw arc 
        this.p5.ellipse(this.getXPos(this.dataVal), height / 2, this.arcRadius, this.arcRadius);
        //arc(this.centerX,this.centerY,this.arcRadius,this.arcRadius,this.arcStartRadian-PI,this.arcEndRadian-PI); // draw reflected arc
    }

    getDataHSBColor(d) {
        this.dataHue = this.p5.map(d, 0, 1, this.minHue, this.maxHue); // value moves across inout hue range
        this.dataSaturation = this.p5.map(d, 0, 1, 100, 80); // higher value = lower saturation (more white, when combined with brightness)
        this.dataBrightness = this.p5.map(d, 0, 1, 10, 100); // higher value = higher brightness (more white, when combined with saturation)
        return this.p5.color(this.dataHue, this.dataSaturation, this.dataBrightness);
    }

    getXPos(d) {
        this.dataPos = this.p5.map(d, 0, 1, 0, width); // value moves across inout hue range
        //this.dataSaturation = map(d,0,1,100,80); // higher value = lower saturation (more white, when combined with brightness)
        //this.dataBrightness = map(d,0,1,10,100); // higher value = higher brightness (more white, when combined with saturation)
        return this.dataPos;
    }
}


function SoundAmplify(props) {
    const analyserCanvas = useRef(null);
    const setup = (p5, canvasParentRef) => {
        width = props.r;
        height = props.r;
        cnv = p5.createCanvas(width, height).parent(canvasParentRef);
        initRadialArcs(p5);
    }

    const initRadialArcs = (p5) => {
        // pass settings into constructor (arcs,minRadius,maxRadius,baseline angle,maxStrokeWidth,minHue,maxHue)
        // radialArcs[0] = new RadialArcs(1, height/8, width, 0, 3, 0, 360); // bass
        radialArcs[1] = new RadialArcs(p5, 1, height / 12, height, -p5.HALF_PI, 6, 100, 240); // treb
    }

    const drawShape = (p5, bass = 0.6, treble = 0.1) => {
        const radius = props.r;
        const grd = [];
        const x = width / 2;
        const y = height / 2;

        grd[0] = cnv.drawingContext.createRadialGradient(x - radius / 3, y - radius / 3, 0, x, y, radius / 2); // (x0, y0, r0, x1, y1, r1)

        grd[0].addColorStop(0, 'rgba(60, 255, 65,1)'); // #FF4B63
        grd[0].addColorStop(treble, 'rgba(60, 255, 65,1)');
        grd[0].addColorStop(1, 'rgba(60, 255, 65,0)');

        grd[1] = cnv.drawingContext.createRadialGradient(x + radius / 3, y + radius / 3, 0, x, y, radius / 2); // (x0, y0, r0, x1, y1, r1)

        grd[1].addColorStop(0, 'rgba(184, 138, 230, 1)');
        grd[1].addColorStop(bass, 'rgba(184, 138, 230, 1)');
        grd[1].addColorStop(1, 'rgba(184, 138, 230, 0)');

        p5.noStroke();
        for (let i = 0; i < grd.length; i++) {
            cnv.drawingContext.fillStyle = grd[i];
            p5.ellipse(width / 2, height / 2, radius, radius);
        }
    }

    const draw = (p5) => {
        p5.fill(200);
        let level = 10;
        p5.ellipse(x, y, amp / 2, amp / 2);
        if (analyser != null) {
            analyser.getFloatTimeDomainData(data);
            let sumSquares = 0.0;
            for (let i = 0; i < data.length; i++) {
                sumSquares += data[i] * data[i];
            }
            amp = Math.sqrt(sumSquares / data.length);
            console.log(amp);
        }
        drawShape(p5, amp, 0.1);
    }

    const audioTest = async () => {
        if (navigator.mediaDevices.getUserMedia !== null) {
            const options = {
                video: false,
                audio: true,
            };
            try {
                const stream = await navigator.mediaDevices.getUserMedia(options);
                const audioCtx = new AudioContext();
                const audioSrc = audioCtx.createMediaStreamSource(stream);
                analyser = audioCtx.createAnalyser();
                audioSrc.connect(analyser);
                data = new Float32Array(analyser.fftSize);
            } catch (err) {
                // error handling
            }
        }
    }
    if (props.display) {
        return (
            <div>
                <div
                    style={{
                        width: props.r,
                        height: props.r,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        background: "gray",
                        opacity: 0.0,
                    }}
                    onClick={() => audioTest()}
                ></div>
                <Sketch setup={setup} draw={draw} />
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}
export default SoundAmplify;