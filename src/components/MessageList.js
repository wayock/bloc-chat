import React, { Component } from 'react';
import * as firebase from 'firebase';



class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      roomMesages: [],
      value: "",
      username: "",
    };
  this.messagesRef = this.props.firebase.database().ref('messages');
  this.activeRoom = this.props.activeRoom;
  this.handleChange = this.handleChange.bind(this);
  this.sessionRef = this.props.firebase.database().ref('sessions');

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

  console.log("DEBUG: MessageList#createMessage");
  console.log(this.props.activeRoom);
  console.log("---------\n\n");

  e.preventDefault();
  this.messagesRef.push ({
  username: this.state.username,
  content: this.state.value,
  sentAt: firebase.database.ServerValue.TIMESTAMP,
  roomId: this.props.activeRoom,
  });
    this.setState({
     content: "",
   });
}


filteredMessages(message){
  return this.state.messages.filter((message) => {
    return message.roomId === this.props.activeRoom;
  })
}

handleChange(e) {
   this.setState({ value: e.target.value });
   e.preventDefault();

 }

 onSubmit(e) {
     this.messageRef.push({
       message: this.state.value
     });
     this.setState({value: ""}, {messageRef: ''} );
     e.preventDefault();
   }

render() {
  return (
    <div>
      <div>
        {this.filteredMessages().map((message, roomId) => (
          <li key={roomId}>
            <div> {message.username}  {message.content} </div>
          </li>
        ))}
      </div>
      <form onSubmit={(e) => this.createMessage(e)}>
        <input type="text" value={this.state.value} onChange={ (e) => this.handleChange(e) } />
        <input type="submit" value="Send" />
      </form>
    </div>
  )
 }
}
   export default MessageList;
