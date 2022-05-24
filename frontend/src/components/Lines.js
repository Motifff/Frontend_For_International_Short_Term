import React from "react";
import { animated, useSpring } from '@react-spring/web'

function Line(props) {
    const styles = useSpring({
        from:{
            width:props.w2==="1px"?props.w2:"1vh",
            height:props.h2==="1px"?props.h2:"1vh",
            left:!props.m?props.l2:props.l2,
            top:!props.m?props.t2:props.t2,
        },
        to:{
            width:props.m?props.w1:props.w2,
            height:props.m?props.h1:props.h2,
            left:props.m?props.l1:props.l2,
            top:props.m?props.t1:props.t2,
        }

    })

    return (
        < animated.div
            style={{
                position: 'absolute',
                background:"rgba(147,105,217,1)",
                ...styles
            }}
        >
        </animated.div >
    )
}
export default Line;