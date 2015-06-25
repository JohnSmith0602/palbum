define('palbum_sidebar', ['data', 'utils'], function(data, utils) {
  var palbumSidebarFunctions = {
    back: function() {
      console.log('back');
    },
    guide: function() {
      utils.showModal(function($modalContent) {
        UI.render(Template.PalbumGuide, $modalContent.get(0));
      });
    },
    settings: function() {
      utils.showModal(function($modalContent) {
        var palbumSettingsData = utils.getCurrentPalbumSettings(data.palbumSettings);
        UI.renderWithData(Template.PalbumSettings, palbumSettingsData, $modalContent.get(0));
      });
    },
    feedback: function() {
      utils.showModal(function($modalContent) {
        UI.render(Template.PalbumFeedback, $modalContent.get(0));
      });
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

  Template.PalbumFeedback.events({
    'click .submit': function(e) {
      var $form = $('.modal form');
      var data = $form.serializeJSON();

      Feedbacks.insert(data, function(error) {
        if (error) {
          submitFeedbackFailureHandler();
        } else {
          submitFeedbackSuccessHandler();
        }
      });


    }
  });

  function submitFeedbackSuccessHandler() {
    utils.showModal(function($modalContent) {
      UI.render(Template.SubmitFeedbackSuccess, $modalContent.get(0));
    });
  }
  function submitFeedbackFailureHandler() {
    $('.modal .modal-content .form').addClass('error');
  }
});