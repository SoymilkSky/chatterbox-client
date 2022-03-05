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
    let msgText = $('message').val();

    Parse.create(MessageStore, (data) => {

    });

    console.log('click!');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }
};

// -----------------------------------------------------------------------------
// Messages

var App = {

  $spinner: $('.spinner img'),

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);


    // TODO: Make sure the app loads data from the API
    // continually, instead of just once at the start.
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(`Parse readAll: ${data}`);
      MessageStore.receive(data); // msgs state has been mutated

      // TODO: Use the data to update Messages and Rooms
      // and re-render the corresponding views.
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};

// -----------------------------------------------------------------------------
// Messages

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
// MessagesView

var MessagesView = {

  $chats: $('#chats'),

  initialize() {
    this.render();
  },

  // update all messages?
  render() {
    clearChildren(this.$chats);
    MessageStore.data
      .map(Element)
      .forEach(msg => $chats.append(msg));
  },

  // update by adding only 1 message?
  // determine this by looking at their test

  renderMessage(msg) { this.$chats.append(Element(msg)); },

  handleClick(event) {
  // TODO: handle a user clicking on a message
  // (this should add the sender to the user's friend list).
  }

};

const clearChildren = function clearChildren(node) {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
};

const Element = function({ user, text }) {
  return Object.assign(document.createElement('article'), {
    className: 'message',
    innerHTML: `${user}: ${text}`,
  });
};


// -----------------------------------------------------------------------------
// Rooms

class Rooms {
  constructor() {
    this.data = [];
  }

  getRooms() {
    return MessageStore.data.map(({ roomname }) => ({ roomname, }));
  }
}

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
  },

  render: function() {
    // TODO: Render out the list of rooms.
  },

  renderRoom: function(roomname) {
    // TODO: Render out a single room.
  },

  handleChange: function(event) {
    // TODO: Handle a user selecting a different room.
  },

  handleClick: function(event) {
    // TODO: Handle the user clicking the "Add Room" button.
  }

};

// -----------------------------------------------------------------------------
// Instantiation

var RoomStore = new Rooms();
var MessageStore = new Messages();
App.initialize();

// campus, message_id, roomname, text, username, github_handle
// created_at, updated_at,

// username: text    (created_at)
