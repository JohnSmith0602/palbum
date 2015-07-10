Template.registerHelper('log', function() {
  console.log(this);
});

Template.registerHelper('addIndex', function(all) {
  return _.map(all, function(val, index) {
    return {
      index: index,
      value: val,
      isFirst: index === 0,
      isLast: index === all.length - 1
    };
  });
});

Template.registerHelper('getBackCoverIndex', function(songsCount) {
  var backCoverIndex = songsCount * 2 + 2 + 1 + 1;

  return backCoverIndex;
});

Template.registerHelper('getPalbumCoverSrc', function(palbumId) {
  var palbumCoverSrc = '/images/palbums/' + palbumId + '/cover.jpg';

  return palbumCoverSrc;
});

Template.registerHelper('palbumCoverDiv', function(palbumId) {
  var palbumCoverSrc = '/images/palbums/' + palbumId + '/cover.jpg';
  var palbumCoverDiv = '<div class="cover" style="background-image: url(\'' + palbumCoverSrc + '\')"></div>';

  return palbumCoverDiv;
});