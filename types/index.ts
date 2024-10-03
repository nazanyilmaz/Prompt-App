export type UserType = {
  _id: string;
  email: string;
  username: string;
  image: string;
  __v: number;
};

export type PromptType = {
  _id: string;
  creator: UserType;
  prompt: string;
  tag: string;
  __v: number;
};
