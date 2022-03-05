// This object houses all the message _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

class Messages {
  constructor() {
    this.data = null;
  }

  receive(msgArr) {
    console.log(`received: ${msgArr}`);
    this.data = msgArr;
  }

  getAll() {
    let result = [];
    return this.data.map(({ username, text, roomname }) => ({ username, text, roomname, }));
  }
}

// -----------------------------------------------------------------------------
// Instantiation

var MessageStore = new Messages();

// campus, message_id, roomname, text, username, github_handle
// created_at, updated_at,

// username: text    (created_at)
