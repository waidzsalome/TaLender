interface User {
  id: number;
  name: string;
  avatarLink: string;
  age: number;
  location: string;
  showLocation: boolean;
  interestList: Array<string>;
  talantsList: Array<string>;
}

export const userWei: User = {
  id: 1,
  name: "Wei Han",
  avatarLink: "blank",
  age: 26,
  location: "Roma,Italy",
  showLocation: true,
  interestList: [
    "Eating",
    "Day Dreaming",
    "Badminton",
    "Cooking",
    "Skiing",
    "Football",
  ],
  talantsList: [
    "Eating",
    "Day Dreaming",
    "Badminton",
    "Cooking",
    "Skiing",
    "Football",
  ],
};
