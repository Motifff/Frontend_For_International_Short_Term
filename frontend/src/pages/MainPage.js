import React from 'react';
import InsertBox from '../components/InsertBox'
import axios from 'axios';

let server = '121.40.159.180:3000';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: '',
            content: 'NULL',
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
                        state: res.data.state,
                        content: res.data.state === 9 ? 'NULL' : res.data.content
                    }
                        , () => console.log(res))
                })
            .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    render() {
        return (
            <div>
                <div style={{zIndex:1}}>
                    <div style={{ position: "absolute", top: "20vh" ,left:"10vw"}}>
                        <InsertBox w="20vw" h="10vh" A="姓名" B="NAME" />
                    </div>
                    <div style={{ position: "absolute", top: "40vh" ,left:"10vw"}}>
                        <InsertBox w="20vw" h="10vh" A="学号" B="STUDENT ID" />
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;