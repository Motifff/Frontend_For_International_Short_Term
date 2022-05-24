import React from 'react';
import InsertBox from '../components/InsertBox'
import AudioAnimation from '../components/AudioAnimation';
import Lines from "../components/Lines";
import { animated, Spring } from '@react-spring/web'
import axios from 'axios';

let server = '121.40.159.180:3000';
let name = "";
let ID = "";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: '',
            content: 'NULL',
            newPos:false,
        }
    }

    async getFromServer(name, ID) {
        let data = new URLSearchParams()
        data.append('name', '琪露诺');
        data.append('cid', '3200602049');
        axios.post("http://" + server + "/api/voice/getStudent", data)
            .then(
                res => {
                    this.setState({
                        ...this.state,
                        state: res.data.state,
                        content: res.data.state === 9 ? 'NULL' : res.data.content,
                    }, () => console.log(res))
                })
            .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    async test(){
        let a = this.state.newPos;
        a = !a;
        this.setState({
            ...this.state,
            newPos : a,
        })
    }

    getName(){

    }

    render() {
        return (
            <div style={{ width: window.innerWidth, height: window.innerHeight }}>
                <div style={{
                    position: "absolute",
                    left: window.innerWidth * 0.5 - (window.innerWidth > window.innerHeight * 9 / 16 ? window.innerHeight * 9 / 16 : window.innerWidth) * 0.5,
                    width: window.innerWidth > window.innerHeight * 9 / 16 ? window.innerHeight * 9 / 16 : window.innerWidth,
                    height: window.innerHeight,
                    background: "rgba(20,20,20,0.0)",
                }}>
                    <Lines m={this.state.newPos} w1="48.2vh" w2="37vh" h1="1px" h2="1px" l1="4.3vh" l2="12vh" t1="30vh" t2="18vh" />
                    <Lines m={this.state.newPos} w1="21.1vh" w2="21.1vh" h1="1px" h2="1px" l1="4.3vh" l2="15vh" t1="42.7vh" t2="29vh" />
                    <Lines m={this.state.newPos} w1="48vh" w2="24.1vh" h1="1px" h2="1px" l1="4.3vh" l2="12vh" t1="59.8vh" t2="46vh" />
                    <Lines m={this.state.newPos} w1="0vh" w2="35vh" h1="1px" h2="1px" l1="15vh" l2="15vh" t1="75vh" t2="75vh" />

                    <Lines m={this.state.newPos} w1="1px" w2="1px" h1="26.4vh" h2="33vh" l1="7.3vh" l2="16vh" t1="15.5vh" t2="33.5vh" />
                    <Lines m={this.state.newPos} w1="1px" w2="1px" h1="72.2vh" h2="24.2vh" l1="25.2vh" l2="22vh" t1="11.2vh" t2="7vh" />
                    <Lines m={this.state.newPos} w1="1px" w2="1px" h1="19.3vh" h2="65.6vh" l1="50.6vh" l2="36.1vh" t1="53.6vh" t2="18vh" />
                    <Spring
                        from={{
                            top:"21vh",
                            left:"0vh",
                        }}
                        to={{
                            top:this.state.newPos?"34.8vh":"21vh",
                            left:this.state.newPos?"5.2vh":"16vh",
                        }}
                    >
                        {styles => (
                            <animated.div style={{ position: "absolute", ...styles }}>
                                <InsertBox w="20.1vh" h="5vh" A="姓名" B="NAME" />
                            </animated.div>
                        )}
                    </Spring>

                    <Spring
                        from={{
                            top:"38vh",
                            left:"0vh",
                        }}
                        to={{
                            top:this.state.newPos?"51.9vh":"38vh",
                            left:this.state.newPos?"5.2vh":"16vh",
                        }}
                    >
                        {styles => (
                            <animated.div style={{ position: "absolute", ...styles }}>
                                <InsertBox w="20.1vh" h="5vh" A="学号" B="STUDENT ID" />
                            </animated.div>
                        )}
                    </Spring>
                    <div style={{ position: 'absolute', top: "38.5vh", left: "33vh" }}>
                        {<AudioAnimation display={this.state.newPos} r={window.innerHeight*0.13}/>}
                    </div>

                    <div 
                        style={{position:"absolute", top:"69.7vh", left:'36.2vh',width:"9.5vh", height:"5.3vh", background:"rgba(60,255,65,1)"}}
                        onClick={()=>this.test()}
                    >
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;