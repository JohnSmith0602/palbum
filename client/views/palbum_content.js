define('palbum_content', ['audio', 'utils'], function(audio, utils) {
  Template.PalbumContent.onRendered(function() {
    var AudioPlayerStates = {
      loading: {
        clickPlay: function() {
          this.audio.pause();
          this.$el.find(this.playBtnSelector).removeClass('pause').addClass('play');

          this.currentState = AudioPlayerStates.pause;
        }
      },
      play: {
        clickPlay: function() {
          this.audio.pause();
          this.$el.find(this.playBtnSelector).removeClass('pause').addClass('play');

          this.currentState = AudioPlayerStates.pause;
        }
      },
      pause: {
        clickPlay: function() {
          this.audio.play();
          this.$el.find(this.playBtnSelector).removeClass('play').addClass('pause');
          if (this.audio.readyState === 4) {
            this.currentState = AudioPlayerStates.play;
          } else {
            this.currentState = AudioPlayerStates.loading;
          }
        }
      }
    };

    var AudioPlayer = function() {
      this.currentState = AudioPlayerStates.loading;
      this.audio = null;
      this.$el = null;
      this.playBtnSelector = null;
    };
    AudioPlayer.prototype.init = function() {
      this.audio = audio;
      this.$el = $('.palbum-wrapper');
      this.playBtnSelector = '.player-controls .main span.icon';

      var self = this;
      this.$el.on('click', this.playBtnSelector, function (e) {
        self.currentState.clickPlay.call(self);
      });
    };

    var audioPlayer = new AudioPlayer();
    audioPlayer.init();


    // pAlbum 設置初始化
    utils.palbumInitialization();

    // 添加 audio 對象到 DOM 結構中
    $('body audio.main').remove();
    $('body').append(audio);

    var data = this.data;
    var $windowModal = $('.window-modal');
    var $menuModal = $('.main-content .menu-modal');
    var $palbum = $('.palbum-wrapper');
    var palbumPageNumber = utils.getPalbumPageNumber(data.songs.length);


    // 順序/單曲循環
    $palbum.on('click', '.player-controls .mode span.icon', function (e) {
      var $element = $(e.currentTarget);
      var $icons = $('.palbum-wrapper .player-controls .mode .icon');
      if ($element.hasClass('normal')) {
        localStorage.playMode = 'repeat';
        $icons.removeClass('normal').addClass('repeat');
      } else if ($element.hasClass('repeat')) {
        localStorage.playMode = 'normal';
        $icons.removeClass('repeat').addClass('normal');
      }
    });

    // 查看、關閉目錄
    $palbum.on('click', '.footer .menu', function(e) {
      $windowModal.show();
      $menuModal.show();
    });
    $menuModal.find('.icon.close').on('click', closeMenuModal);
    $windowModal.on('click', closeMenuModal);

    function closeMenuModal(e) {
      e.preventDefault();

      $windowModal.hide();
      $menuModal.hide();
    }


    /*
     ** turnjs 相關
     */
    $palbum.turn({
      pages: palbumPageNumber,
      when: {
        missing: function(e, pages) {
          // this 指向的是 $palbum 對應的 DOM 節點
          for (var i = 0; i < pages.length; i++) {
            addPage(pages[i], $(this), data);
          }
        },
        turned: function(e, page) {
          var current_audio_src = utils.getAudioSrcByPageNumber(page, data);
          //cache_audio_src = getAudioSrcByPage(page + 2, data);

          // current_audio_src 存在的時候，播放器 UI 才存在
          // 但是一開始就做好 volumeSlider 的初始化對體驗更重要
          // 目前無法獲得翻動到的頁面的 DOM，只好對當前的所有的 controls 進行操作。
          // 播放/暫停
          var $playerControlsMain = $('.palbum-wrapper .page-wrapper .player-controls .main');
          $playerControlsMain.find('.icon').removeClass('play').addClass('pause');
          // 播放模式
          var $playerControlsMode = $('.palbum-wrapper .page-wrapper .player-controls .mode');
          if (localStorage.playMode === 'normal') {
            $playerControlsMode.find('.icon').removeClass('repeat').addClass('normal');
          } else {
            $playerControlsMode.find('.icon').removeClass('normal').addClass('repeat');
          }
          // 音量條
          $('.palbum-wrapper .page-wrapper .player-controls .volume').each(function() {
            var $element = $(this);
            $element.html('<span class="icon min"></span><input id="slider" /><span class="icon max">');
            initSlider($element.find('input'));
          });


          // 翻頁之後首先給歌曲封面加上 loading 的動畫（如果播放器的狀態還不能播放下一幀的話）
          //if ($player.get(0).readyState < 3) {
          //  var $contentCovers = $('.palbum-wrapper .page.content .cover');
          //  $contentCovers.each(function() {
          //    var $element = $(this);
          //    if (!$element.find('span.loading').length) {
          //      $element.append('<span class="loading"></span>');
          //    }
          //  });
          //}

          if (current_audio_src) {
            if (audio.src.indexOf(current_audio_src) &&
              (audio.src.indexOf(current_audio_src) + current_audio_src.length === audio.src.length)) {
              // 同一首歌，不改變 audio src
              //audio.play();
            } else {
              audio.src = current_audio_src;
              //$cachePlayer.attr('src', cache_audio_src);
              audio.play();
            }
          }

          // 更新樂輯目錄
          updateMenu(page, data.sectionIndex);
        }
      }
    });

    /*
     ** 定義快捷鍵
     */
    var shortcuts = {
      37: KeyLeftCallback,
      39: KeyRightCallback,
      38: KeyUpCallback,
      40: KeyDownCallback,
      77: KeyMCallback,
      83: KeySCallback
    };

    $(document).on('keydown', function(e) {
      var keyCode = e.keyCode ? e.keyCode : e.which;

      if (!$(e.target).parents('.modal-content').length && shortcuts[keyCode]) {
        // Modal 時快捷鍵無效，因為可能存在用戶的輸入
        // TODO：目前採用排除法，之後可能會改成只有 e.target 是 body.palbum 時才允許用快捷鍵。
        shortcuts[keyCode]();
      }
    });
    function KeyLeftCallback() {
      // 翻到上一頁
      var newPage;
      var currentPage = $palbum.turn('page');
      if (currentPage > 1) {
        if (currentPage % 2) {
          newPage = currentPage - 2;
        } else {
          newPage = currentPage - 1;
        }
      }
      $palbum.turn('page', newPage);
    }
    function KeyRightCallback() {
      // 翻到下一頁
      var newPage;
      var currentPage = $palbum.turn('page');
      if (currentPage < palbumPageNumber) {
        if (currentPage % 2) {
          newPage = currentPage + 1;
        } else {
          newPage = currentPage + 2;
        }
      }
      $palbum.turn('page', newPage);
    }
    function KeyUpCallback() {
      // 翻到上一章
      if (data.sectionIndex.length) {
        var sectionData = data.sectionIndex;
        var currentPage = $palbum.turn('page');
        var currentPos = utils.getCurrentPosByPageNum(currentPage, sectionData);
        if (currentPos.sectionIndex > 0) {
          var newSectionIndex = currentPos.sectionIndex - 1;
          var newSongIndex = utils.getSongIndexBySectionIndex(newSectionIndex, sectionData);
          var newPageNum = utils.getPageNumBySongIndex(newSongIndex);
          $palbum.turn('page', newPageNum);
        }
      } else {
        // 沒有 section，翻到上一頁
        KeyLeftCallback();
      }
    }
    function KeyDownCallback() {
      // 翻到下一章
      if (data.sectionIndex.length) {
        var sectionData = data.sectionIndex;
        var currentPage = $palbum.turn('page');
        var currentPos = utils.getCurrentPosByPageNum(currentPage, sectionData);
        if (currentPos.sectionIndex < data.sectionIndex.length - 1) {
          var newSectionIndex = currentPos.sectionIndex + 1;
          var newSongIndex = utils.getSongIndexBySectionIndex(newSectionIndex, sectionData);
          var newPageNum = utils.getPageNumBySongIndex(newSongIndex);
          $palbum.turn('page', newPageNum);
        }
      } else {
        // 沒有 section，翻到下一頁
        KeyRightCallback();
      }
    }

    function KeyMCallback() {
      // 展開/收起目錄
      if (($windowModal.css('display') === 'none') && ($menuModal.css('display') === 'none')) {
        $windowModal.show();
        $menuModal.show();
      } else if (($windowModal.css('display') === 'block') && ($menuModal.css('display') === 'block')) {
        $windowModal.hide();
        $menuModal.hide();
      }
    }


    function KeySCallback() {}
  });

  function addPage(page, $palbum, data) {
    var $element = getElementByPage(page, data);

    $palbum.turn('addPage', $element, page);
  }

  function getElementByPage(page, data) {
    if (page % 2) {
      // 文字
      var index = (page - 5) / 2;
      if (data.songs.length > index) {
        var current_data = data.songs[index];
        var $element = $('<div class="hard content text"></div>');
        UI.renderWithData(Template.PalbumPageText, current_data, $element[0]);

        // js 動態設置頁面的文字尺寸
        if (current_data.fontSize) {
          $element.find('.main-body p')
            .css('fontSize', current_data.fontSize + 'em')
            .css('lineHeight', '1.3em');
        }

        // 設置搜索鏈接的 href
        var $link = $element.find('a.search-more');
        var href = utils.getSearchMoreHref(current_data.searchType, localStorage.getItem('searchPreference'),
          current_data.song.artist.name, current_data.song.album.name, current_data.song.name);
        $link.attr('href', href);
      }
    } else {
      // 封面、播放器
      var index = (page - 4) / 2;
      if (data.songs.length > index) {
        var current_data = data.songs[index];
        current_data.palbumId = data.id;
        current_data.songIndex = index + 1;

        var $element = $('<div class="hard content image"></div>');
        UI.renderWithData(Template.PalbumPageImage, current_data, $element[0]);
      }
    }

    return $element;
  }

  function updateMenu(currentPage, indexData) {
    var $menuModal = $('.main-content .menu-modal');
    if (indexData.length) {
      var currentPos = utils.getCurrentPosByPageNum(currentPage, indexData);
      var $currentSection = $menuModal.find('.section').eq(currentPos.sectionIndex);
      var $currentSong = $currentSection.find('li').eq(currentPos.songIndex);
    } else {
      var currentIndex = utils.getSongIndexByPageNumber(currentPage);
      var $currentSong = $menuModal.find('.non-section li').eq(currentIndex);
    }

    $menuModal.find('li').removeClass('current');
    $currentSong.addClass('current');
  }

  function initializePlayerControls($element) {
    var $controls = $element.find('.player-controls');

    // 根據 localStorage 設置初始值
    if (!localStorage.playMode) {
      localStorage.playMode = 'normal';
    }
    $controls.find('.mode .icon').addClass(localStorage.playMode);

    // 初始化音量及 slider
    var $slider = $controls.find('input#slider');
    if (!localStorage.volume) {
      localStorage.volume = 0.6;
    }
    audio.volume = localStorage.volume;

    return;
  }

  function initSlider($slider) {
    $slider.slider({
      min: 0,
      max: 1,
      step: 0.1,
      value: parseFloat(localStorage.volume),
      tooltip: 'hide'
    })
      .on('slide', function() {
        localStorage.volume = $slider.slider('getValue');
        audio.volume = localStorage.volume;
      })
      .on('slideStop', function() {
        localStorage.volume = $slider.slider('getValue');
        audio.volume = localStorage.volume;

        $('.palbum-wrapper .page-wrapper .player-controls input#slider').each(function() {
          $(this).slider('setValue', parseFloat(localStorage.volume));
        });
      });
  }


  Template.PalbumMenu.helpers({
    getSongIndexForSectionBySectionIndex: function(index, data) {
      var href = '';
      var songIndex = utils.getSongIndexBySectionIndex(index, data);

      return songIndex;
    }
  });
  Template.PalbumMenu.onRendered(function() {
    var $palbum = $('.palbum-wrapper');
    var $windowModal = $('.window-modal');
    var $menuModal = $('.main-content .menu-modal');

    $menuModal.on('click', '.section .title', function(e) {
      e.preventDefault();
      var songIndex = $(e.currentTarget).data('index');
      var pageNum = utils.getPageNumBySongIndex(songIndex);

      $windowModal.hide();
      $menuModal.hide();

      $palbum.turn('page', pageNum);
    });
  });
});