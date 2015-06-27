define('layout', ['utils'], function(utils) {
  Template.ApplicationLayout.events({
    'click .main-content .modal .close': function(e) {
      utils.hideModal();
    }
  });
});