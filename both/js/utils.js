define('utils', ['data'], function(data) {
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

  // 拼接歌曲頁「瞭解更多」鏈接的 url
  utils.getSearchMoreHref = function(searchType, searchPreference, artistName, albumName, songName) {
    searchPreference = searchPreference || 'default';
    var href = 'https://www.baidu.com/s?rn=20&wd=' + encodeURIComponent(artistName) + '%20';
    if (searchType === 'album') {
      href += encodeURIComponent(albumName);
    } else {
      href += encodeURIComponent(songName);
    }

    var searchPreferenceDict = utils._getSearchPreferenceDict(data.palbumSettings.sections);
    if (searchPreferenceDict[searchPreference]) {
      href = href + '%20' + encodeURIComponent(searchPreferenceDict[searchPreference]);
    }

    return href;
  };
  utils._getSearchPreferenceDict = function(sections) {
    var dict = {};
    _.each(sections, function(section) {
      if (section.name === 'searchPreference') {
        var options = section.options;
        _.each(options, function(option) {
          if (option.value === 'default') {
            option.title = '';
          }
          dict[option.value] = option.title;
        });
      }
    });

    return dict;
  };

  return utils;
});