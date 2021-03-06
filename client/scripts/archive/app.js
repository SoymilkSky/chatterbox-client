// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),

  initialize: function() {
    App.username = window.location.search.substr(10);

    App.startSpinner();
    AppMaker.fetch(AppMaker.stopSpinner);


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
    AppMaker.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    AppMaker.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
