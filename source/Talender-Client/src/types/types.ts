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
export interface Skill {
  categories: string[];
  id: string;
  name: string;
  slug: string;
  _id: string;
}
export const response = [
  {
    categories: "language-communication",
    _id: "68358578075b7ec20c6d96df",
    id: "68358578075b7ec20c6d96df",
    name: "language-communication",
    slug: [
      { id: "68358578075b7ec20c6d96df", name: "french" },
      { id: "68358578075b7ec20c6d96df", name: "spanish" },
    ],
  },
];
