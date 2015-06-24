define('utils', [], function() {
  var utils = {};
  utils.showModal = function(callbackFn) {
    var $modal = $('.main-content .modal');
    $modal.empty();
    callbackFn($modal);
    $modal.show();
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

  return utils;
});