export type IUsers = {
  id: number | undefined;
  image: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  age: string | undefined;
};

export const users: IUsers[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    firstName: "Pitch",
    lastName: "Siriwat",
    age: "28",
  },
  {
    id: 2,
    image:
      "https://media.istockphoto.com/id/1327765575/photo/portrait-of-gorgeous-asian-woman-with-long-dark-hair-laughing-at-camera-with-beautiful-smile.jpg?s=612x612&w=0&k=20&c=zAbJf7Z6GHMn9IUdodt3ZW96WikU7dy6kuLWVqbw_FA=",
    firstName: "Sureeporn",
    lastName: "Wongkanjana",
    age: "34",
  },
  {
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg",
    firstName: "Thanapon",
    lastName: "Kasemsak",
    age: "41",
  },
  {
    id: 4,
    image: "https://c.stocksy.com/a/ynfA00/z9/2543982.jpg",
    firstName: "Kanyarat",
    lastName: "Bawonkiat",
    age: "25",
  },
  {
    id: 5,
    image:
      "https://cdn.pixabay.com/photo/2022/08/20/11/59/african-man-7398921_1280.jpg",
    firstName: "Akkaradet",
    lastName: "Prechanon",
    age: "31",
  },
  {
    id: 6,
    image:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-young-asian-260nw-2586102397.jpg",
    firstName: "Natcha",
    lastName: "Posuwan",
    age: "22",
  },
];
