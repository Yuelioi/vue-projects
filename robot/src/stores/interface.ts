interface Item {
  id: number;
  isEditting: boolean;
  isModified: boolean;
}

export interface Reply extends Item {
  username: string;
  keyword: string;
  reply: string;
  groups: string[] | null;
}

export interface Plan extends Item {
  type: "plan" | "todo";
  create_date: "";
  finish_date: ",";
  status: ""; //已完成 正在进行 计划中
  tag: ""; //日常 学习...
}
