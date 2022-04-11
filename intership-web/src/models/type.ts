export type Organization = {
  id: number;
  name: string;
  address: string;
  INN: number;
};

export type Division = {
  id: number;
  id_organization: number;
  name: string;
  phone: number;
};

export type Employee = {
  id: number;
  id_division: number;
  FIO: string;
  address: string;
  position: string;
};
