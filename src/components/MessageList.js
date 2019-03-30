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

  e.preventDefault();
  console.log(this.props.user);
  this.messagesRef.push ({
  username: this.props.user.displayName,
  content: this.state.value,
  sentAt: firebase.database.ServerValue.TIMESTAMP,
  roomId: this.props.activeRoom.key,
  })
    this.setState({
     value: "",
   });
}


filteredMessages(message){
  return this.state.messages.filter((message) => {
    return message.roomId === this.props.activeRoom.key;
  })
}

handleChange(e) {
   this.setState({ value: e.target.value });
   e.preventDefault();

 }

 onSubmit(e) {
     this.messageRef.push({
       message: this.state.value,
     });

   }

render() {

  return (
    <div>
      <h2>{this.props.activeRoom.name}</h2>
      <div>
        {this.filteredMessages().map((message, roomId) => (
          <li key={roomId}>
            <div> {message.username} : {message.content} {new Date(message.sentAt).toLocaleString('en-US', { timeZone: 'America/New_York' })} </div>
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
