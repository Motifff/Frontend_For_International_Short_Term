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
                            height: "6vh",
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
        //let max = props.w.replace("vh","");
        let max = window.innerHeight*0.201/pa.length;
        //max = max+"vh";
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
                    height: "6vh"
                }}
            >
                <div
                    style={{
                        display:'flex',
                        flexDirection:"row",
                        alignItems:"end",
                        top: 0,
                        width: props.w,
                        height: "6vh",
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
                    height: "2vh"
                }}
            >
                <div style={{ position: "absolute", left: "0px" ,bottom:"0px",fontSize:"1vh"}}>{props.A}</div>
                <div style={{ position: "absolute", right: "0px" ,bottom:"0px",fontSize:"1vh"}}>{props.B}</div>
            </div>
        </div>
    )
}
export default Insert;