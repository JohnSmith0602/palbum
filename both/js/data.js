define('data', [], function() {
  var data = {};

  data.palbumSidebarTabs = [
    {
      type: 'back',
      title: '返回乐辑列表'
    },
    {
      type: 'guide',
      title: '使用指南'
    },
    {
      type: 'settings',
      title: '私人设置'
    },
    {
      type: 'feedback',
      title: '我有话要说'
    }
  ];

  data.palbumSettings = {
    sections: [
      {
        title: '主题色',
        name: 'theme',
        currentValue: 'none',
        options: [
          {
            title: '随乐辑内容变化',
            value: 'none',
            default: true
          },
          {
            title: '蓝',
            value: 'blue'
          },
          {
            title: '绿',
            value: 'green'
          },
          {
            title: '红',
            value: 'red'
          },
          {
            title: '橙',
            value: 'orange'
          }
        ]
      },
      {
        title: '偏好内容',
        name: 'preference',
        currentValue: 'none',
        options: [
          {
            title: '无',
            value: 'none',
            default: true
          },
          {
            title: '歌词',
            value: 'lyrics'
          },
          {
            title: '乐评',
            value: 'review'
          },
          {
            title: '下载',
            value: 'download'
          },
          {
            title: '购买',
            value: 'buy'
          }
        ]
      }
    ]
  };

  return data;
});