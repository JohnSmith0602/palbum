if (Palbums.find().count() === 0) {
  Palbums.insert({
    id: '1',
    title: '天堂十字路口',
    author: 'John Smith',
    authorLink: 'http://www.douban.com/people/dj20100602/',
    type: 'book',
    color: 'blue',
    intros: [
      '张国荣对我来说，是怎样的一种存在呢？每年今天，我都会集中思考这个问题。去年的四月一日，我在朋友圈写过这样一段话。',
      '「早已过了偶像的界限，像是隔世的知己，或者远方的神佛。也许是个性或者价值观的某种认同，也许阴阳两隔让我忽略了你是巨星我是凡众的差异。最初的热爱在时光的幻化里，沉淀成一种情怀。在无限的想象中，赋予你太多意味。这样的交融，是我最好的独家记忆。」',
      '这就是张国荣之于我的意义，如果说喜欢黄家驹是我少年时理想主义的寄托，那么钟爱张国荣，就是我从男孩成长为男人始终没有幻灭的一场美梦。他弥漫在我的生命里，如影随形。',
      '数不清的日子里，看他的电影，听他的歌，做自己的事。感悟许多人事的意味，许多歌里融入了我的记忆与感觉，不可名状，仅挑出十首，与君分享。'
    ],
    sectionIndex: [
      {
        title: '长大的日子里',
        songCount: 5
      },
      {
        title: '新兵',
        songCount: 4
      }
    ],
    songs: [
      {
        song: {
          name: 'I\'ll Walk Beside You',
          artist: {
            name: 'Josef Locke'
          },
          album: {
            name: 'The EMI Recordings 1947-1955',
            link: 'http://music.163.com/#/album?id=2065182'
          }
        },
        paragraphs: [
          '（外祖母）Lucy 也爱唱歌，唱的大多是流行歌曲，比如老牌女歌手 Gracie Fields 的热门金曲 <Now Is the Hour>，爱尔兰男高音歌手 Josef Locke 的 <I Walk Beside You>，<Bless This House> 等等。',
          'Josef Locke 的歌在我家非常受欢迎，他也是第一个用嗓音征服了我的歌手。'
        ],
        pageNumber: 20,
        fontSize: 1.3
      },
      {
        song: {
          name: 'Memphis Tennessee',
          artist: {
            name: 'Chuck Berry'
          },
          album: {
            name: 'Reelin\' And Rockin\' - The Very Best Of Chuck Berry',
            link: 'http://www.xiami.com/album/2095199545'
          }
        },
        paragraphs: [
          '有意思的是，他会把 <The Runaway Train>，<The Big Rock Candy Mountain> 这些大人听的民谣歌曲，混杂在 <Teddy Bears\' Picnic>，<Nellie the Elephant> 这些儿歌里放给我们听。',
          '麦克叔叔偶尔还会放 Chuck Berry 演唱的 <Memphis Tennessee>，这种歌曲对那时的我来说不啻为一声炸雷。'
        ],
        pageNumber: 24,
        fontSize: 1.2
      }
    ]
  });
}