export interface User {
  id: string; // uuid or numeric string
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  moderator: boolean;
  location: string;
  age: number;
  sharedLocation: boolean;
  avatarLink: string;
  skills: string[]; // array of skill slugs or ids
  interests: string[]; // array of string interests
  createdAt?: string; // from timestamps
  updatedAt?: string; // from timestamps
  isPublic: boolean;
}
interface Skill1 {
  id: string;
  name: string;
  slug: string;
  _id: string;
  categories: string[];
}
export interface Skill {
  id: string;
  name: string;
  slug: string;
  _id: string;
  skills: Skill1[];
}

export interface Categories {
  id: string;
  name: string;
  slug: string;
  _id: string;
}

export interface Chat {
  chatId: string;
  createdAt: string;
  lastMessage: {
    text: string;
    senderId: string;
    createdAt: string;
  };
  participants: string[];
  chatPartner: {
    avatarLink: string;
    id: string;
    username: string;
    _id: string;
  };
  curUser: {
    avatarLink: string;
    id: string;
    username: string;
    _id: string;
  };
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface Message {
  chatId: string;
  createdAt: string;
  senderId: string;
  text: string;
  _id: string;
}
