export type UserResponse = {
  token: string;
  user: {
    full_name: string;
    email: string;
    role: string;
    run: string;
  };
};
