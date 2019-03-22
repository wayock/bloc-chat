import React, { Component } from 'react';


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


/*createnewmessage
  username: "<USERNAME HERE>",
  content: "<CONTENT OF THE MESSAGE HERE>",
  sentAt: firebase.database.ServerValue.TIMESTAMP,
  roomId: "<ROOM UID HERE>"
*/

render() {
  return (
    <div>
      <h1>Active Room Name</h1>
      <p>Messages will go here</p>
    </div>
  )
 }
}
   export default MessageList;
