// The Parse object represents your connection to outside world!
// Or... just the Parse API. Populate this object with methods
// which send requests to the RESTful Parse API.

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

const processResponse = function(success) {
  if (!Array.isArray(success)) {
    throw Error(`success must be array but got ${success}`);
  }
  const messages = success;
  MessageStore.receive(success);
  console.log(success);
};

const processError = function(error) {
  console.log(error);
};

var Parse = {

  server: 'https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/rfp',

  create: function(message, success, error = null) {
    // TODO: send a request to the Parse API to save the message
    $.ajax({
      // This is the url you should use to communicate with the API server.
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: success || function (data) { console.log('chatterbox: Message sent'); },
      error: error || function(data) { console.error('chatterbox: Failed to send message', data); }
    });
  },

  /**
   * async web call
   */
  readAll: function(success, error = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: success,
      error: error
      ,
    });
  }

};