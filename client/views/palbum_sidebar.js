define('palbum_sidebar', ['data'], function(data) {
  var palbumSidebarFunctions = {
    back: function() {
      console.log('back');
    },
    guide: function() {
      console.log('guide');
    },
    settings: function() {
      console.log('settings');
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
});