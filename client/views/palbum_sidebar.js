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
    // TODO：在什麼時機給 body 加樣式，甚至是否通過這種方式復用結構，之後需要考量。
    // 因為 palbum 類是在 router action 裡加上的，意味著存在執行到此 body.palbum 尚不存在的可能性
    // var $ul = $('body.palbum .sidebar ul');
    var $ul = $('body .sidebar ul');
    var height = $ul.height();
    $ul.css('marginTop', -height / 2);
  });

  // TODO：radio 選擇框目前樣式有瑕疵，選中時有一條莫名其妙的左邊線。
  // TODO：現在的設置值無法做到即時更新效果，需要刷新。例如搜索設置修改後，當前頁面的「瞭解更多」鏈接並不會變。
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