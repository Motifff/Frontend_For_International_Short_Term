import React, { useState } from 'react';
import { useSpring, animated, config } from "@react-spring/web";
import Charactor from "./Charactor"

function Insert(props) {
    const [data, setData] = useState("");
    const [focus,setFocus] = useState(false);

    const inp = (e) => {
        setData(e.target.value)
    }

    const renderInp = (a) =>{
        if(a === true){
            return(
                <div>
                    <input
                        autoFocus
                        value={data}
                        style = {{
                            position:"absolute",
                            top: 0,
                            width: props.w,
                            height: "10vh",
                            background:"blue",
                            opacity:0
                        }}
                        onChange = {(e)=>inp(e)}
                    >
                    </input>
                </div>
            )
        }
        return(null);
    }

    const listRender = (a) => {
        let pa = a.split("");
        let max = props.w.replace("vw","");
        max = parseInt(max)/pa.length;
        max = max+"vw";
        let rdr = pa.map((item, key) => {return(<Charactor w={item} max={max}/>)})
        return(rdr);
    }

    return (
        <div
            style={{
                position:"absolute"
            }}
        >
            <div
                style={{
                    width: props.w,
                    height: "10vh"
                }}
            >
                <div
                    style={{
                        display:'flex',
                        flexDirection:"row",
                        alignItems:"end",
                        top: 0,
                        width: props.w,
                        height: "10vh",
                        background: "gray",
                        opacity:0.3,
                        fontSize:10,
                    }}
                    onClick = {()=>setFocus(true)}
                >
                {listRender(data)}
                </div>
                {renderInp(focus)}
            </div>
            <div
                style={{
                    width: props.w,
                    height: "5vh"
                }}
            >
                <div style={{ position: "absolute", left: "0px" }}>{props.A}</div>
                <div style={{ position: "absolute", right: "0px" }}>{props.B}</div>
            </div>
        </div>
    )
}
export default Insert;