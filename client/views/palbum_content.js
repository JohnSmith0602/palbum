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
        }
      }
    });
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
          $element.find('.main-body p').css('fontSize', current_data.fontSize + 'em');
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
});