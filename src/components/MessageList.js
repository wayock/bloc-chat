import React, { Component } from 'react';
import * as firebase from 'firebase';



class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value: "",
    };
  this.messagesRef = this.props.firebase.database().ref('messages');
}

componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({  messages: this.state.messages.concat( message ) })
       console.log(snapshot.val());
     });
   }


createMessage(e) {
  this.messageRef.push ({
  username: "<USERNAME HERE>",
  content: this.state.value,
  sentAt: firebase.database.ServerValue.TIMESTAMP,
  roomId: this.props.activeRoom.key,
  })
}


filteredMessages(){
  return this.state.messages.filter((message) => {
    return message.roomId === this.props.activeRoom.key;
  })
}

render() {
  return (
    <div>
      <div>
        {this.filteredMessages().map((message, roomId) => (
          <li key={roomId}>{message.content} </li>
        ))}
      </div>
      <p>Messages will go here</p>
    </div>
  )
 }
}
   export default MessageList;
