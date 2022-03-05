// MessagesView is an object which controls the DOM elements
// responsible for displaying messages.

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
