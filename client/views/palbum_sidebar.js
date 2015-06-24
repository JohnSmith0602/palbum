define('palbum_sidebar', ['data', 'utils'], function(data, utils) {
  var palbumSidebarFunctions = {
    back: function() {
      console.log('back');
    },
    guide: function() {
      utils.showModal(function($modal) {
        UI.render(Template.PalbumGuide, $modal.get(0));
      });
    },
    settings: function() {
      utils.showModal(function($modal) {
        var palbumSettingsData = utils.getCurrentPalbumSettings(data.palbumSettings);
        UI.renderWithData(Template.PalbumSettings, palbumSettingsData, $modal.get(0));
      });
    },
    feedback: function() {
      console.log('feedback');
    }
  };

  Template.PalbumSidebarList.helpers({
    tabs: function() {
      return data.palbumSidebarTabs;
    }
  });

  Template.PalbumSidebarList.events({
    'click li.tab': function(e) {
      var $el = $(e.currentTarget);
      $el.addClass('selected').siblings().removeClass('selected');

      palbumSidebarFunctions[$el.data('type')]();
    }
  });

  Template.PalbumSettings.events({
    'click input[type="radio"]': function(e) {
      var $el = $(e.currentTarget);
      localStorage.setItem($el.attr('name'), $el.attr('value'));
    }
  });
});