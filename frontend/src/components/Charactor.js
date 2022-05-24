import React, { useState } from 'react';
import { useSpring, animated ,config} from "@react-spring/web";

function Cha(props){
    const TextSize = useSpring({
        from:{
            fontSize:props.s===true?props.max:window.innerHeight*0.03
        },
        to:{
            fontSize:props.s===false?window.innerHeight*0.03:props.max
        }
    })



    return(
        <div>
            <animated.div
                style = {{
                    width:props.max,
                    ...TextSize
                }}
            >
            {props.w}
            </animated.div>
        </div>
    )
}
export default Cha;