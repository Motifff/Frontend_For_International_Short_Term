import React, { useState } from 'react';
import { useSpring, animated ,config} from "@react-spring/web";

function Cha(props){
    const TextSize = useSpring({
        from:{
            fontSize:props.s===true?props.max:"3vw"
        },
        to:{
            fontSize:props.s===false?"3vw":props.max
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