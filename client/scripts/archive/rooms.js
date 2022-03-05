// This object houses all the room _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

class Rooms {
  constructor() {
    this.data = [];
  }

  getRooms() {
    return MessageStore.data.map(({ roomname }) => ({ roomname, }));
  }
}

var RoomStore = new Rooms();
