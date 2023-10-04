import { TheUser } from "src/app/Model/data-type";

export interface UserStateInterface
{
  isLoading: boolean;
  users: TheUser[];
  error: string | null;
}
