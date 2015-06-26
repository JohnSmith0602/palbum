Meteor.methods({
  sendFeedback: function(feedback) {
    Feedbacks.insert(feedback);
  }
});