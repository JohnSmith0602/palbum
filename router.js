Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', {
  template: 'IndexContent',
  yieldRegions: {
    'IndexSidebarList': { to: 'sidebarList'}
  },
  action: function() {
    // 因為相同框架的樣式會有區別，需要通過給 body 元素加樣式做區分
    $('body').addClass('index');

    this.render();
  }
});

Router.route('/palbum/:palbumId', {
  template: 'PalbumContent',
  yieldRegions: {
    'PalbumSidebarList': { to: 'sidebarList'}
  },
  action: function() {
    $('body').addClass('palbum');

    this.render();
  }
});

Router.route('/(.*)', function() {
  this.redirect('/');
});