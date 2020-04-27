import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { runInThisContext } from 'vm';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props)
    this.localVideo = React.createRef();
    this.remoteVideo = React.createRef();
    this.pc = null;
    this.socket = null;
    this.candidate = [];
    this.answer=false;

    //this.textref = React.createRef();
  }
  componentDidMount() {
    this.socket = io('/my-namespace')
    this.socket.on('connected-success', success => {
      console.log(success);
    })
    this.socket.on('offerOrAnswer', (sdp) => {
      this.textref.value = JSON.stringify(sdp);
      this.pc.setRemoteDescription(new RTCSessionDescription(sdp));
      this.answer = true;
    })
    this.socket.on('candidate', (candidate) => {
      //this.candidate = [...this.candidate, candidate];
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    })

    const pc_config = {
      iceServers: [
        { url: "stun:stun.l.google.com:19302" }

      ]
    };
    this.pc = new RTCPeerConnection(pc_config);
    console.log("asd", this.pc);
    this.pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate));
        this.sendToPeer('candidate', e.candidate);
      }
    }
    this.pc.onconnectionstatechange = (e) => {
      console.log(e);

    }
    this.pc.onaddstream = (e) => {
      this.remoteVideo.current.srcObject = e.stream;

    }

    const constraints = { audio: true, video: true };
    const success = (stream) => {
      this.localVideo.current.srcObject = stream;
      this.pc.addStream(stream);
    }
    const failure = (e) => {
      console.log("error", e);


    }
    navigator.mediaDevices.getUserMedia(constraints).then(success).then(failure)


  }
  sendToPeer = (messagetype,payload)=>{
    this.socket.emit(messagetype,{socketID:this.socket.id,payload})

  }
  createOffer = () => {
    console.log("create offer");
    this.answer = true;
    this.pc.createOffer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 }).then(sdp => {
      console.log(JSON.stringify(sdp));
      this.pc.setLocalDescription(sdp);
      this.sendToPeer('offerOrAnswer',sdp);

    }, e => {
      console.log(e);
    })

  }
  createAnswer = () => {
    console.log("create offer");
    this.pc.createAnswer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 }).then(sdp => {
      //console.log(JSON.stringify(sdp));
      this.pc.setLocalDescription(sdp);
      this.sendToPeer('offerOrAnswer',sdp);

    }, e => {
      console.log(e);
    })

  }
  addCandidate = () => {
    //const candidate = JSON.parse(this.textref.value);
    //console.log(candidate);
    //this.pc.addIceCandidate(new RTCIceCandidate(candidate))
    this.candidate.forEach(candidate=>{
      console.log(JSON.stringify(candidate));
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    })

  }
  remoteDescription = () => {
    const description = JSON.parse(this.textref.value);
    this.pc.setRemoteDescription(new RTCSessionDescription(description))

  }
  render() {

    return (
      <React.Fragment>
        <div>

          <video style={{ width: 240, height: 240, margin: 5, background: "white" }} ref={this.localVideo} autoPlay>

          </video>
          <video style={{ width: 240, height: 240, margin: 5, background: "white" }} ref={this.remoteVideo} autoPlay>

          </video>


        </div>
        <div>
          <button onClick={this.createOffer} >{this.props.answer}Call</button>
          <button onClick={this.createAnswer} >Answer</button>
          <br />
          <textarea ref={ref => { this.textref = ref }} style={{ margin: 20 ,visibility:"hidden"}} />
         {/*<br />
          <button onClick={this.remoteDescription}>setRemote</button>
         <button onClick={this.addCandidate}>addCandidate</button>*/}
        </div>
      </React.Fragment>

    );
  }

}
export default App;
