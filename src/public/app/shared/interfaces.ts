import { ModuleWithProviders } from '@angular/core';

export interface ICustomer {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    gender: string;
    orderCount?: number;
    orders?: IOrder[];
    orderTotal?: number;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface ICustomerResponse {
    customer: ICustomer;
    status: boolean;
    error: string;
}

export interface IItem {
    name: string;
    zinc: number;
    waste: number;
    rate: number;
}

export interface IItemResponse {
    item: IItem;
    status: boolean;
    error: string;
}


export interface IIngotItem {
    item: IItem;
    weight?: number;
}

export interface IIngot {
  ingotName: string;
  formulaName: string;
  profit?: number;
  itemCost?: number;
  wasteCost?: number;
  ingotCost?: number;
  rodi?: number;
  lm?: number;
  sisa?: number;
  loha?: number;
  zinc? : number;
  netIngotWeight?: number;
  totalItemWeight?: number;
  totalItemWeightMinusZinc?: number;  
  items?: IIngotItem[],

  waste: number,
  ingotRate:number
}

