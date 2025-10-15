interface User {
  id: number;
  name: string;
  avatarLink: string;
  lastetNews: string;
}
interface Message {
  id: string;
  context: string;
  timestamp: string;
  time: string;
  sender: string;
  senderID: number;
  receiver: string;
  receiverID: number;
  avatar: string;
}

export const userList: User[] = [
  {
    id: 1,
    name: "Luca",
    avatarLink: "/static/images/avatar/1.jpg",
    lastetNews: "I'll be in your neighborhood doing errands this…",
  },
  {
    id: 2,
    name: "Simone",
    avatarLink: "/static/images/avatar/2.jpg",
    lastetNews: "Wish I could come, but I'm out of town this…",
  },
  {
    id: 3,
    name: "Wei 2",
    avatarLink: "/static/images/avatar/3.jpg",
    lastetNews: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 4,
    name: "Remy Sharp",
    avatarLink: "/static/images/avatar/1.jpg",
    lastetNews: "I'll be in your neighborhood doing errands this…",
  },
  {
    id: 5,
    name: "Travis Howard",
    avatarLink: "/static/images/avatar/2.jpg",
    lastetNews: "Wish I could come, but I'm out of town this…",
  },
  {
    id: 6,
    name: "Cindy Baker",
    avatarLink: "/static/images/avatar/3.jpg",
    lastetNews: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 7,
    name: "Remy Sharp",
    avatarLink: "/static/images/avatar/1.jpg",
    lastetNews: "I'll be in your neighborhood doing errands this…",
  },
  {
    id: 8,
    name: "Travis Howard",
    avatarLink: "/static/images/avatar/2.jpg",
    lastetNews: "Wish I could come, but I'm out of town this…",
  },
  {
    id: 9,
    name: "Cindy Baker",
    avatarLink: "/static/images/avatar/3.jpg",
    lastetNews: "Do you have Paris recommendations? Have you ever…",
  },
];

export const messageData: Message[] = [
  {
    id: "1",
    context: "Hey Bob! How are you?",
    timestamp: "2025-10-13T09:00:00Z",
    time: "09:00 AM",
    sender: "Alice",
    senderID: 1,
    receiver: "Bob",
    receiverID: 2,
    avatar: "",
  },
  {
    id: "2",
    context: "Hi Alice! I'm doing great, how about you?",
    timestamp: "2025-10-13T09:01:15Z",
    time: "09:01 AM",
    sender: "Bob",
    senderID: 2,
    receiver: "Alice",
    receiverID: 1,
    avatar: "",
  },
  {
    id: "3",
    context: "I'm fine too! Working on the new project.",
    timestamp: "2025-10-13T09:02:10Z",
    time: "09:02 AM",
    sender: "Alice",
    senderID: 1,
    receiver: "Bob",
    receiverID: 2,
    avatar: "",
  },
  {
    id: "4",
    context: "Nice! Is it the chat app you mentioned before?",
    timestamp: "2025-10-13T09:03:30Z",
    time: "09:03 AM",
    sender: "Bob",
    senderID: 2,
    receiver: "Alice",
    receiverID: 1,
    avatar: "",
  },
  {
    id: "5",
    context: "Exactly 😄 I'm using React and MUI this time.",
    timestamp: "2025-10-13T09:04:20Z",
    time: "09:04 AM",
    sender: "Alice",
    senderID: 1,
    receiver: "Bob",
    receiverID: 2,
    avatar: "",
  },
  {
    id: "6",
    context: "That’s awesome! I’ve been learning TypeScript lately.",
    timestamp: "2025-10-13T09:05:50Z",
    time: "09:05 AM",
    sender: "Bob",
    senderID: 2,
    receiver: "Alice",
    receiverID: 1,
    avatar: "",
  },
  {
    id: "7",
    context: "Oh nice! TypeScript really helps with large projects.",
    timestamp: "2025-10-13T09:06:30Z",
    time: "09:06 AM",
    sender: "Alice",
    senderID: 1,
    receiver: "Bob",
    receiverID: 1,
    avatar: "",
  },
  {
    id: "8",
    context: "Agreed! By the way, are you free this weekend?",
    timestamp: "2025-10-13T09:07:40Z",
    time: "09:07 AM",
    sender: "Bob",
    senderID: 2,
    receiver: "Alice",
    receiverID: 1,
    avatar: "",
  },
  {
    id: "9",
    context: "Maybe! What do you have in mind?",
    timestamp: "2025-10-13T09:08:10Z",
    time: "09:08 AM",
    sender: "Alice",
    senderID: 1,
    receiver: "Bob",
    receiverID: 2,
    avatar: "",
  },
  {
    id: "10",
    context: "How about a coffee meetup? ☕",
    timestamp: "2025-10-13T09:09:05Z",
    time: "09:09 AM",
    sender: "Bob",
    senderID: 2,
    receiver: "Alice",
    receiverID: 1,
    avatar: "",
  },
  {
    id: "11",
    context: "Sounds perfect! Let’s do it!",
    timestamp: "2025-10-13T09:09:45Z",
    time: "09:09 AM",
    sender: "Alice",
    senderID: 1,
    receiver: "Bob",
    receiverID: 2,
    avatar: "",
  },
  {
    id: "12",
    context: "Awesome! I’ll text you the place later.",
    timestamp: "2025-10-13T09:10:30Z",
    time: "09:10 AM",
    sender: "Bob",
    senderID: 2,
    receiver: "Alice",
    receiverID: 1,
    avatar: "",
  },
  {
    id: "13",
    context: "Sure, see you then 😎",
    timestamp: "2025-10-13T09:11:15Z",
    time: "09:11 AM",
    sender: "Alice",
    senderID: 1,
    receiver: "Bob",
    receiverID: 2,
    avatar: "",
  },
  {
    id: "14",
    context: "See ya!",
    timestamp: "2025-10-13T09:11:50Z",
    time: "09:11 AM",
    sender: "Bob",
    senderID: 2,
    receiver: "Alice",
    receiverID: 1,
    avatar: "",
  },
];
