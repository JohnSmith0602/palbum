define('palbum_content', ['audio', 'utils'], function(audio, utils) {
  Template.PalbumContent.onRendered(function() {
    function PlayerLoadingState(audioPlayer) {
      this.audioPlayer = audioPlayer;
    }
    PlayerLoadingState.prototype.clickPlay = function() {
      this.audioPlayer.audio.pause();
      this.audioPlayer.$el.find(this.audioPlayer.playBtnSelector).removeClass('pause').addClass('play');
      this.audioPlayer.setState(this.audioPlayer.pauseState);
    };

    function PlayerPlayState(audioPlayer) {
      this.audioPlayer = audioPlayer;
    }
    PlayerPlayState.prototype.clickPlay = function() {
      this.audioPlayer.audio.pause();
      this.audioPlayer.$el.find(this.audioPlayer.playBtnSelector).removeClass('pause').addClass('play');
      this.audioPlayer.setState(this.audioPlayer.pauseState);
    };

    function PlayerPauseState(audioPlayer) {
      this.audioPlayer = audioPlayer;
    }
    PlayerPauseState.prototype.clickPlay = function() {
      this.audioPlayer.audio.play();
      this.audioPlayer.$el.find(this.audioPlayer.playBtnSelector).removeClass('play').addClass('pause');
      if (this.audioPlayer.audio.readyState === 4) {
        this.audioPlayer.setState(this.audioPlayer.playState);
      } else {
        this.audioPlayer.setState(this.audioPlayer.loadingState);
      }
    };

    var AudioPlayer = function() {
      this.audio = audio;
      this.$el = $('.palbum-wrapper');
      this.playBtnSelector = '.player-controls .main span.icon';

      this.loadingState = new PlayerLoadingState(this);
      this.playState = new PlayerPlayState(this);
      this.pauseState = new PlayerPauseState(this);

      this.currentState = this.loadingState;

      var self = this;
      this.$el.on('click', this.playBtnSelector, function (e) {
        self.currentState.clickPlay();
      });
    };
    AudioPlayer.prototype.setState = function(newState) {
      this.currentState = newState;
    };

    var audioPlayer = new AudioPlayer();

    // 添加 audio 對象到 DOM 結構中
    $('body audio.main').remove();
    $('body').append(audio);


    var data = this.data;
    var $palbum = $('.palbum-wrapper');
    var palbumPageNumber = utils.getPalbumPageNumber(data.songs.length);

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
      //  turned: function(e, page) {
      //    current_audio_src = getAudioSrcByPage(page, data);
      //    cache_audio_src = getAudioSrcByPage(page + 2, data);
      //
      //    // current_audio_src 存在的時候，播放器 UI 才存在
      //    // 但是一開始就做好 volumeSlider 的初始化對體驗更重要
      //    // 目前無法獲得翻動到的頁面的 DOM，只好對當前的所有的 controls 進行操作。
      //    // 播放/暫停
      //    var $playerControlsMain = $('.palbum-wrapper .page-wrapper .player-controls .main');
      //    $playerControlsMain.find('.icon').removeClass('play').addClass('pause');
      //    // 播放模式
      //    var $playerControlsMode = $('.palbum-wrapper .page-wrapper .player-controls .mode');
      //    if (localStorage.playMode === 'normal') {
      //      $playerControlsMode.find('.icon').removeClass('repeat').addClass('normal');
      //    } else {
      //      $playerControlsMode.find('.icon').removeClass('normal').addClass('repeat');
      //    }
      //    // 音量條
      //    $('.palbum-wrapper .page-wrapper .player-controls .volume').each(function() {
      //      var $element = $(this);
      //      $element.html('<span class="icon min"></span><input id="slider" /><span class="icon max">');
      //      initSlider($element.find('input'));
      //    });
      //
      //
      //    // 翻頁之後首先給歌曲封面加上 loading 的動畫（如果播放器的狀態還不能播放下一幀的話）
      //    if ($player.get(0).readyState < 3) {
      //      var $contentCovers = $('.palbum-wrapper .page.content .cover');
      //      $contentCovers.each(function() {
      //        var $element = $(this);
      //        if (!$element.find('span.loading').length) {
      //          $element.append('<span class="loading"></span>');
      //        }
      //      });
      //    }
      //
      //
      //    if (current_audio_src) {
      //      if (current_audio_src === $player.attr('src')) {
      //        // 同一首歌，繼續播放
      //        $player.trigger('play');
      //      } else {
      //        $player.attr('src', current_audio_src);
      //        $cachePlayer.attr('src', cache_audio_src);
      //        $player.trigger('play');
      //      }
      //    }
      //  }
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

        //initializePlayerControls($element);
      }
    }

    return $element;
  }
});