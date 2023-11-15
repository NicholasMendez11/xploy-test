export type Todo = {
  id: string;
  content: string;
};


export type MovePayload = {
  oldIndex: number;
  newIndex: number;
};

export type Id = string | number;

export type Column = {
id:Id;
title :string;
color:string;
}

export type Task ={
  id: Id,
  columnId:Id,
  content:string
}

export type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type MapForm = {
  from: string;
  to: string;
};
