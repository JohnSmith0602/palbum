define('utils', [], function() {
  var utils = {};
  utils.showModal = function(callbackFn) {
    var $modal = $('.main-content .modal');
    var $modalContent = $modal.find('.modal-content');
    $modalContent.empty();
    callbackFn($modalContent);
    $modal.show();
  };
  utils.hideModal = function() {
    var $modal = $('.main-content .modal');
    var $modalContent = $modal.find('.modal-content');
    $modal.hide();
    $modalContent.empty();

    var $tabs = $('body>.sidebar .tab');
    $tabs.removeClass('selected');
  };

  utils.getCurrentPalbumSettings = function(settings) {
    var result = settings;

    _.each(result.sections, function(section) {
      if (localStorage.getItem(section.name)) {
        section.currentValue = localStorage.getItem(section.name);
      } else {
        localStorage.setItem(section.name, section.currentValue);
      }
    });

    return settings;
  };

  utils.getPalbumPageNumber = function(songNumber) {
    var palbumPageNumber = songNumber * 2 + 1 + 2 + 1;

    return palbumPageNumber;
  };

  return utils;
});