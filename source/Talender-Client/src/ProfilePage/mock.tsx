export interface User {
  id: number;
  username: string;
  avatarLink: string;
  age: string;
  location: string;
  isPublic: boolean;
  skills: Array<string>;
  interests: Array<string>;
}
