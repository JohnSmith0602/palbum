define('palbum_content', ['audio'], function(audio) {
  Template.PalbumContent.onRendered(function() {
    // 添加 audio 對象到 DOM 結構中
    $('body audio.main').remove();
    $('body').append(audio);


  });
});