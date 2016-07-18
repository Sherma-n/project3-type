// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
//= require action_cable
//= require_self
//= require_tree .

(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);

App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    return $('#messages').append(data['message']);
  },
  speak: function(message) {
    return this.perform('speak', {
      message: message
    });
  }
});
$(document).on('keypress', '[data-behavior~=room_speaker]', function(event) {
  if (event.keyCode === 13) {
    App.room.speak(event.target.value);
    event.target.value = '';
    return event.preventDefault();
  }
});