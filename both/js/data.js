define('data', [], function() {
  var data = {};

  data.palbumSidebarTabs = [
    {
      type: 'back',
      title: '返回乐辑列表'
    },
    {
      type: 'guide',
      title: '新手指南'
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

  data.palbumGuide = {
    sections: [
      {
        title: '这是什么？',
        content: 'Juy.fm 目前是一个优质乐辑（歌单）的聚合站点，提供精致、纯粹、沉浸的听歌体验。'
      },
      {
        title: '如何操作？',
        content: '戴上耳机，或者打开音响，听就好了：）每个乐辑以歌词本的形式呈现，封底提供所有歌曲的索引。把鼠标移至页面的最左/右端，页面有抬起效果，点击即可翻页。也可使用快捷键进行翻页。'
      },
      {
        title: '文字内容偏少？',
        content: '现阶段，你可以点击专辑封面图片，跳转到主流音乐平台获取更多信息和功能；也可以点击文本末尾的「了解更多」链接搜索相关信息，搜索偏好可以在「私人设置」中自定义。'
      }
    ],
    cheatsheet: [
      {
        key: '（方向键）左',
        action: '上一页'
      },
      {
        key: '（方向键）右',
        action: '下一页'
      },
      {
        key: '（方向键）上',
        action: '上一章'
      },
      {
        key: '（方向键）下',
        action: '下一章'
      },
      {
        key: 's/S',
        action: '切换播放状态'
      },
      {
        key: 'm/M',
        action: '显示或收起目录'
      }
    ]
  };

  data.palbumSettings = {
    sections: [
      {
        title: '主题色',
        name: 'themeColor',
        currentValue: 'default',
        options: [
          {
            title: '默认',
            value: 'default',
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
        name: 'searchPreference',
        currentValue: 'default',
        options: [
          {
            title: '默认',
            value: 'default',
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