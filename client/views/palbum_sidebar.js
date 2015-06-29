define('palbum_sidebar', ['data', 'utils'], function(data, utils) {
  var palbumSidebarFunctions = {
    back: function() {
      //var $sidebar = $('body .sidebar');
      //var width = $sidebar.css('width');
      //$sidebar.animate({
      //  left: '-=' + width
      //}, 600, 'swing', function() {
      //  window.location.href = '/';
      //});
      window.location.href = '/';
    },
    guide: function() {
      utils.showModal(function($modalContent) {
        UI.renderWithData(Template.PalbumGuide, data.palbumGuide, $modalContent.get(0));
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
        UI.renderWithData(Template.PalbumFeedback, { email: localStorage.userEmail }, $modalContent.get(0));
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
      if ($el.hasClass('selected')) {
        $el.removeClass('selected');
        utils.hideModal();
      } else {
        $el.addClass('selected').siblings().removeClass('selected');

        palbumSidebarFunctions[$el.data('type')]();
      }
    }
  });

  Template.PalbumSidebarList.onRendered(function() {
    var $ul = $('body.palbum .sidebar ul');
    var height = $ul.height();
    $ul.css('marginTop', -height / 2);
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

      // 把使用者的郵箱存入 localStorage
      localStorage.userEmail = data.email;

      Meteor.call('sendFeedback', data);

      // 因為 feedback 信息是否成功提交對使用者來說並不是很要緊的事情，統一告知「收到反饋」
      submitFeedbackSuccessHandler();
    }
  });

  function submitFeedbackSuccessHandler() {
    utils.showModal(function($modalContent) {
      UI.render(Template.SubmitFeedbackSuccess, $modalContent.get(0));
    });
  }
  //function submitFeedbackFailureHandler() {
  //  $('.modal .modal-content .form').addClass('error');
  //}

  //Template.SubmitFeedbackSuccess.onRendered(function() {
  //  setTimeout(function() {
  //    $('.modal').animate({
  //      opacity: 0
  //    }, 1000, 'swing', function() {
  //      utils.hideModal();
  //    });
  //  }, 1000);
  //});
});