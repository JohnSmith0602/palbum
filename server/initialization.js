if (Palbums.find().count() === 0) {
  Palbums.insert({
    id: '1',
    title: '天堂十字路口',
    author: 'John Smith',
    authorLink: 'http://www.douban.com/people/dj20100602/',
    type: 'book',
    color: 'blue',
    // TODO：之後內容肯定是通過 textarea 輸入，即是說 summary 會是單個字符串，各段間有特殊的劃分符，可以在 template 層做處理。
    summary: [
      '张国荣对我来说，是怎样的一种存在呢？每年今天，我都会集中思考这个问题。去年的四月一日，我在朋友圈写过这样一段话。',
      '「早已过了偶像的界限，像是隔世的知己，或者远方的神佛。也许是个性或者价值观的某种认同，也许阴阳两隔让我忽略了你是巨星我是凡众的差异。最初的热爱在时光的幻化里，沉淀成一种情怀。在无限的想象中，赋予你太多意味。这样的交融，是我最好的独家记忆。」',
      '这就是张国荣之于我的意义，如果说喜欢黄家驹是我少年时理想主义的寄托，那么钟爱张国荣，就是我从男孩成长为男人始终没有幻灭的一场美梦。他弥漫在我的生命里，如影随形。',
      '数不清的日子里，看他的电影，听他的歌，做自己的事。感悟许多人事的意味，许多歌里融入了我的记忆与感觉，不可名状，仅挑出十首，与君分享。'
    ],
    sectionIndex: [
      {
        title: '长大的日子里',
        songCount: 5,
        songs: [
          {
            name: 'I\'ll Walk Beside You'
          },
          {
            name: 'Memphis Tennessee'
          },
          {
            name: 'You Keep On Dogging Me'
          },
          {
            name: 'Hound Dog'
          },
          {
            name: 'That\'ll Be The Day'
          }
        ]
      },
      {
        title: '新兵',
        songCount: 4,
        songs: [
          {
            name: 'Hey Hey'
          },
          {
            name: 'Kindhearted Woman'
          },
          {
            name: 'I Love the Woman'
          },
          {
            name: 'I\'m a Man'
          }
        ]
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
        details: [
          '（外祖母）Lucy 也爱唱歌，唱的大多是流行歌曲，比如老牌女歌手 Gracie Fields 的热门金曲 <Now Is the Hour>，爱尔兰男高音歌手 Josef Locke 的 <I Walk Beside You>，<Bless This House> 等等。',
          'Josef Locke 的歌在我家非常受欢迎，他也是第一个用嗓音征服了我的歌手。'
        ],
        pageNumberInBook: 20,
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
        details: [
          '有意思的是，他会把 <The Runaway Train>，<The Big Rock Candy Mountain> 这些大人听的民谣歌曲，混杂在 <Teddy Bears\' Picnic>，<Nellie the Elephant> 这些儿歌里放给我们听。',
          '麦克叔叔偶尔还会放 Chuck Berry 演唱的 <Memphis Tennessee>，这种歌曲对那时的我来说不啻为一声炸雷。'
        ],
        pageNumberInBook: 24,
        fontSize: 1.2
      },
      {
        song: {
          name: 'You Keep On Dogging Me',
          artist: {
            name: 'Sonny Terry'
          },
          album: {
            name: 'On the Road',
            link: 'http://www.amazon.com/Burris-Sticks-McGhee-Sonny-Terry/dp/B000V9Y556'
          }
        },
        details: [
          '记得有一个星期六，麦克叔叔播放了 Sonny Terry & Brownie McGhee 组合演唱的 <Whooping and Hollering>。Sonny Terry 在这首歌里吹口琴，间或会高喊几声高音假嗓。他演奏得如此快速，节奏却又拿捏得毫厘不差；Brownie McGhee 的吉他弹奏不仅飞快，还如行云流水般流畅。这种风格在那时还是新生事物，它像电流一样击中了我。',
          '注：经过搜索比对，文中提到的歌曲 <Whooping and Hollering> 全称应该是 <You Keep On Dogging Me (Whooping and Hollering)>，网上只能找到 Sonny Terry 演唱的另外一个版本。'
        ],
        pageNumberInBook: 24
      },
      {
        song: {
          name: 'Hound Dog',
          artist: {
            name: 'Elvis Presley'
          },
          album: {
            name: 'Elvis 75',
            link: 'http://www.xiami.com/album/368376'
          }
        },
        details: [
          '约翰有张猫王的 <Hound Dog>，我们听了一遍又一遍。他的音乐里有种让我们无法抗拒的东西，而他大不了我们几岁。这个和我们差不多大的年轻人掌控着自己的命运，可我们连想都不敢想。'
        ],
        pageNumberInBook: 29,
        fontSize: 1.5
      },
      {
        song: {
          name: 'That\'ll Be The Day',
          artist: {
            name: 'Buddy Holly & the Crickets'
          },
          album: {
            name: 'The Chirping Crickets',
            link: 'http://www.xiami.com/album/53680'
          }
        },
        details: [
          '不久后我买了人生的第一张专辑唱片，是 Buddy Holly 和他领导的蟋蟀乐队出的 <The "Chirping" Crickets>。他的音乐是如此动人，让我如痴如醉。',
          '在当时所有的音乐英雄中，Buddy Holly 是最平易近人的一位，而且满身真功夫。他其貌不扬，从不做作，但无疑是个货真价实的吉他手，而更靠谱的是，他还戴眼镜。他就是我们中的一员。他的突然离世给我们造成了极大的影响，之后有人说音乐死了。'
        ],
        pageNumberInBook: 29,
        fontSize: 1.1,
        searchType: 'album'
      },
      {
        song: {
          name: 'Hey Hey',
          artist: {
            name: 'Big Bill Broonzy'
          },
          album: {
            name: 'Big Bill Broonzy: Big Bill Blues',
            link: 'http://www.xiami.com/album/568442'
          }
        },
        details: [
          '我在电视上看到了一个 Big Bill 在夜店表演的片段，当他演奏时，一盏挂在天花板上的效果灯在他身上晃来晃去地照射着，形成一种诡异的氛围。他演奏的那首曲子叫 <Hey Hey>，它彻底震住了我。这是一首结构复杂的吉他曲，里面洋溢着布鲁斯音符。',
          '在第一次听到 Big Bill，以及后来的 Robert Johnson 后，我就确信，布鲁斯音乐中的推、放弦技巧是摇滚乐和流行音乐的根基之一。'
        ],
        pageNumberInBook: 41,
        fontSize: 1.2
      },
      {
        song: {
          name: 'Kindhearted Woman',
          artist: {
            name: 'Robert Johnson'
          },
          album: {
            name: 'King of the Delta Blues Singers',
            link: 'http://www.xiami.com/album/333535'
          }
        },
        details: [
          '克利夫有天给我听了张名叫 <King of the Delta Blues Singers> 的唱片，里面收录有 Robert Johnson 1930 年代录制的 17 首歌。',
          '起初，这过于强烈的音乐几乎让我感到排斥，这个男人毫不粉饰地唱着他想表达的，肆无忌惮地弹着他想弹的。他的演奏是那么极端，和我以前听过的东西大相径庭。几次倾听他的歌曲后，我意识到，在某种层面上来说，我找到了一位大师，他将是我一生的楷模。',
          '<Kindhearted Woman> 中的美丽动人和意味深长让我深深着了迷，而 <Hell Hound on My Trail> 表达的切肤之痛更让我感同身受。'
        ],
        pageNumberInBook: 47,
        fontSize: 1.1,
        searchType: 'album'
      },
      {
        song: {
          name: 'I Love the Woman',
          artist: {
            name: 'Freddie King'
          },
          album: {
            name: 'Hide Away',
            link: 'http://music.163.com/#/album?id=2551119'
          }
        },
        details: [
          '有一天，汤姆给大家放了一张 Freddie King 的唱片，这是一张 45 转唱片，名为 <Hideaway>，汤姆为之癫狂。这是我第一次听 Freddie King 的音乐，而他的音乐听得我是六神无主。如果你正在外太空，马上要见到外星人，会是什么样的心情？对，我当时就是那种心情。',
          '<Hideaway> 的 B 面有一首 <I Love the Woman>，这首歌的间奏是段让我喘不过气来的电吉他 Solo。这段独奏极富表现力，旋律动听，一如现代爵士乐，而那独一无二的推弦和音色，更让我激动得发抖。',
          '此前，我一直觉得吉他不过是为演唱做伴奏的配角，只有很少的一两次觉得吉他是主角。一次是听 Connie Francis 那首 <Lipstick on Your Collar>，George Barnes 在其中演奏了一段令人叫绝的吉他独奏；还有一次是 Ricky Nelson 的吉他手 James Burton 的乡村布鲁斯风格的电吉他独奏。在听到 Freddie King 后我才明白，他的歌曲的间奏就是众多吉他独奏的源头。'
        ],
        pageNumberInBook: 51
      },
      {
        song: {
          name: 'I\'m a Man',
          artist: {
            name: 'The Yardbirds'
          },
          album: {
            name: 'Five Live Yardbirds',
            link: 'http://www.xiami.com/album/170654'
          }
        },
        details: [
          '我们的现场收音同样也比录音棚录音的效果要好很多，在我们的第一张现场黑胶唱片 <Five Live Yardbirds> 发行以后，这个事实就显露无疑了。在同时期的乐队还很少出现场唱片的情况下，我们的 <Five Live Yardbirds> 成为了现场唱片的奠基之作。',
          '这张专辑里的声音原始而自然，让我非常满意。而让我们从一大堆乐队中脱颖而出的是我们对音乐力度强弱变化的即兴实验，这归功于贝斯手 Paul Samwell-Smith的贡献。',
          '例如在 Bo Diddley 的布鲁斯歌曲 <I\'m a Man> 的框架里，他会通过即兴断奏贝斯旋律线来修饰歌曲的间奏部分——贝斯旋律线音量会越来越强，直到高潮，再逐渐回落到下一段主歌之前结束。'
        ],
        pageNumberInBook: 60,
        fontSize: 1.1,
        searchType: 'album'
      }
    ]
  });
}