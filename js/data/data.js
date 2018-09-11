export const INITIAL_STATE = Object.freeze({
  question: 0,
  answers: [],
  points: 0,
  restAttempts: 3,
  restTime: 300
});

export const statistics = [1, 4, 5, 8];

// Music from https://www.youtube.com/audiolibrary/music?feature=blog
export const melodies = [
  {// 0
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {// 1
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {// 2
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {// 3
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {// 4
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {// 5
    artist: `Quincas Moreira`,
    name: `Firefly`,
    image: `http://www.atribuna.com.br/fileadmin/_processed_/csm_Quincas-Moreira-Foto-Divulgacao_76d1a8b00e.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    genre: `Electronic`
  }
];

// Начальная структура того, как будут выглядеть вопросы
export const questions = [
  {
    type: `artist`,
    options: new Set([3, 4, 5]),
    answer: 3
  },
  {
    type: `genre`,
    options: new Set([1, 2, 3, 4]),
    answer: `Jazz`
  },
  {
    type: `artist`,
    options: new Set([4, 5, 3]),
    answer: 4
  },
  {
    type: `genre`,
    options: new Set([4, 5, 1, 3]),
    answer: `R&B`
  },
  {
    type: `artist`,
    options: new Set([3, 5, 4]),
    answer: 5
  },
  {
    type: `genre`,
    options: new Set([3, 4, 5, 1]),
    answer: `Electronic`
  }
];
