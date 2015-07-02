Meteor.publish('palbums', function() {
  return Palbums.find();
});