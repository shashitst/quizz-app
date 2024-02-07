

export function shuffleArray(array) {
  // Copy the original array to avoid modifying the original array
  const shuffledArray = [...array];

  // Fisher-Yates (Knuth) shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}


export const categories = [
  { id: 9, name: "General Knowledge" },
  { name: "Entertainment: Books", id: 10 },
  { name: "Entertainment: Film", id: 11 },
  { name: "Entertainment: Music  ", id: 12 },
  { name: "Entertainment: Musicals & Theatres  ", id: 13 },
  { name: "Entertainment: Television  ", id: 14 },
  { name: "Entertainment: Video Games ", id: 15 },
  { name: "Entertainment: Board Games ", id: 16 },
  { name: "EScience & Nature ", id: 17 },
  { name: "Science: Computers  ", id: 18 },
  { name: "Science: Mathematics  ", id: 19 },
  { name: "Mythology  ", id: 20 },
  { name: "Sports ", id: 21 },
  { name: "Geography  ", id: 22 },
  { name: "History ", id: 23 },
  { name: "Politics  ", id: 24 },
  { name: "Art ", id: 25 },
  { name: "Celebrities  ", id: 26 },
  { name: "Animals  ", id: 27 },
  { name: "Vehicles  ", id: 28 },
  { name: "Entertainment: Comics ", id: 29 },
  { name: "Science: Gadgets  ", id: 30 },
  { name: "Entertainment: Japanese Anime & Manga ", id: 31 },
  { name: "Entertainment: Cartoon & Animations ", id: 32 }
]


export const leve = [
  {level:"easy"},
  {level: "medium"},
  {level: "hard"}
]



