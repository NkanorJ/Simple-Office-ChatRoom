// // things we need the chatroom to do
// // adding new chat document
// // setting up a real time listener to get new chats
// // updating the username
// // updating the room

// //we will create chatroom with a constructor
class Chatroom {
    constructor(room, username){
      this.room = room;
      this.username = username;
      this.chats = db.collection('chats');
      this.unsub;
    }
//     //using the async function to returned a promise that will be created later, also we will need to connect to an API to avoid delay
//     // the async function if to addChat
async addChat(message){
    // format a chat object
    const now = new Date();  //this is created to use later in the created_at field
    const chat = {
        //this is where all the requirement are that matches the database requirement
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };

// //save to the database
const response = await this.chats.add(chat); //this is the promise that will save the information to the database
      return response;
    }
    getChats(callback){
      this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type === 'added'){
              callback(change.doc.data());
            }
          });
      });
    }

    //save the chat document
    updateName(username){
      this.username = username;
      localStorage.setItem('username', username)
    }
    updateRoom(room){
      this.room = room;
      console.log('room updated');
      if(this.unsub){
        this.unsub();
      }
    }
  }    

      
