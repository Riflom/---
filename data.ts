import { Exercise, Difficulty } from './types';

export const EXERCISES: Exercise[] = [
  // Beginner
  {
    id: 'b1',
    difficulty: Difficulty.Beginner,
    category: 'TongueTwister',
    text: 'От топота копыт пыль по полю летит.'
  },
  {
    id: 'b2',
    difficulty: Difficulty.Beginner,
    category: 'TongueTwister',
    text: 'Шла Саша по шоссе и сосала сушку.'
  },
  {
    id: 'b3',
    difficulty: Difficulty.Beginner,
    category: 'Articulation',
    text: 'Ма-мэ-ми-мо-му. Да-дэ-ди-до-ду.'
  },
  {
    id: 'b4',
    difficulty: Difficulty.Beginner,
    category: 'Text',
    text: 'Чёткая речь — залог успеха. Говорите медленно, но уверенно.'
  },

  // Intermediate
  {
    id: 'i1',
    difficulty: Difficulty.Intermediate,
    category: 'TongueTwister',
    text: 'Карл у Клары украл кораллы, а Клара у Карла украла кларнет.'
  },
  {
    id: 'i2',
    difficulty: Difficulty.Intermediate,
    category: 'TongueTwister',
    text: 'Корабли лавировали, лавировали, да не вылавировали.'
  },
  {
    id: 'i3',
    difficulty: Difficulty.Intermediate,
    category: 'Articulation',
    text: 'Птка-птко-птку-пткэ-пткы. Бдга-бдго-бдгу-бдгэ-бдгы.'
  },
  {
    id: 'i4',
    difficulty: Difficulty.Intermediate,
    category: 'Text',
    text: 'На дворе трава, на траве дрова, не руби дрова на траве двора.'
  },

  // Advanced
  {
    id: 'a1',
    difficulty: Difficulty.Advanced,
    category: 'TongueTwister',
    text: 'В недрах тундры выдры в гетрах тырят в вёдра ядра кедров.'
  },
  {
    id: 'a2',
    difficulty: Difficulty.Advanced,
    category: 'TongueTwister',
    text: 'Сшит колпак, да не по-колпаковски, вылит колокол, да не по-колоколовски.'
  },
  {
    id: 'a3',
    difficulty: Difficulty.Advanced,
    category: 'TongueTwister',
    text: 'Четверг, четвертого числа, в четыре с четвертью часа, лигурийский регулировщик регулировал в Лигурии.'
  },
  {
    id: 'a4',
    difficulty: Difficulty.Advanced,
    category: 'Articulation',
    text: 'Рлра-рлро-рлру-рлрэ-рлры. Лилре-лилро-лилру-лилрэ.'
  },
];