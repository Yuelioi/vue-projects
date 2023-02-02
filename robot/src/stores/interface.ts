export interface UserData {
  username: string;
  keyword: string;
  reply: string;
  id: number;
  groups: string[] | null;
  isEditting: boolean;
  isModified: boolean;
}
