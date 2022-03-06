// -----------------------------------------------------------------------------
// FormView

var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    // TODO: Currently, this is all handleSubmit does.
    // Make this function actually send a message to the Parse API.
    var msg = {};
    msg.username = AppMaker.username;
    msg.text = $('#message').val();
    msg.roomname = $('#room select').val();

    Parse.create(msg);

    console.log('click!');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }
};

// -----------------------------------------------------------------------------
// App

class AppMaker {
  constructor() {
    this.$spinner = $('.spinner img');
    this.username = window.location.search.substr(10);
    this.startSpinner();
    this.fetch(this.stopSpinner);

    // setInterval(this.fetch, 3000);
  }

  initialize() {}

  fetch(callback) {
    Parse.readAll((data) => {
      console.log(`Parse received: ${data}`);
      MessageStore.receive(data);
      RoomStore.receive(data);
    });
    this.stopSpinner();
  }

  startSpinner() {
    this.$spinner.show();
    FormView.setStatus(true);
  }

  stopSpinner() {
    this.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
}

// -----------------------------------------------------------------------------
// Messages

class Messages {
  constructor() {
    this.data = null;
  }

  receive(msgArr) {
    console.log(`received: ${msgArr}`);
    this.data = msgArr;
    console.log('inside of messages.receive' + this.data);
    MessagesView.render();
  }

  getAll() {
    let result = [];
    return this.data.map(
      ({ username, text, roomname }) => ({ username, text, roomname, })
    );
  }
}

// -----------------------------------------------------------------------------
// MessagesView

class MessagesViewMaker {
  constructor() {
    this.$chats = $('#chats');
  }

  initialize() {}

  render() {
    clearChildren(this.$chats);
    MessageStore.getAll()
      .map(Element)
      .forEach(msg => this.$chats.append(msg));
  }

  /** injects 1 message into the DOM */
  renderMessage(msg) { this.$chats.append(Element(msg)); }

  // TODO: handle a user clicking on a message
  // (this should add the sender to the user's friend list).
  handleClick(event) {
  }
}

/** Clears all children of HTMLElement `node`. */
const clearChildren = function clearChildren(node) {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
};

/** Creates an HTMLElement */
const Element = function({ username, text }) {
  return Object.assign(document.createElement('article'), {
    className: 'message',
    innerHTML: `${username}: ${text}`,
  });
};

// -----------------------------------------------------------------------------
// Rooms

class RoomsViewMaker {
  constructor() {
    this.$button = $('#rooms button');
    this.$select = $('#rooms select');
  }

  initialize() {

  }

  render() {
    clearChildren(this.$select);
    RoomStore.getRooms()
      .forEach(elem => this.renderRoom(elem));
    //this.$select.append(`<div>${elem}</div>`
  }

  // TODO: Render out a single room.
  renderRoom(roomname) {
    console.log('renderRoom saw:', roomname);
    this.$select.append(`<option>${roomname}</option>`);
  }

  // TODO: Handle a user selecting a different room.
  handleChange(event) {
  }

  // TODO: Handle the user clicking the "Add Room" button.
  handleClick(event) {

  }
}

class Rooms {
  constructor() {
    this.data = [];
  }

  receive(data) {
    this.data = Array.from(new Set(data.map(({ roomname }) => roomname )));
    console.log('we are in rooms.receive' + this.data);
    RoomsView.render();
  }

  getRooms() { return this.data; }
}


// -----------------------------------------------------------------------------
// Initialize

const App = new AppMaker();
const MessageStore = new Messages();
const RoomStore = new Rooms();
const MessagesView = new MessagesViewMaker();
const RoomsView = new RoomsViewMaker();

// campus, message_id, roomname, text, username, github_handle
// created_at, updated_at,

// username: text    (created_at)