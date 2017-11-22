import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomersGridComponent } from './customers/customers-grid.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerEditReactiveComponent } from './customers/customer-edit-reactive.component';
import { ItemEditComponent } from './items/item-edit.component';
import { IngotEditComponent } from './items/ingot-edit.component';

import { IRouting } from './shared/interfaces';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/:id', component: CustomerEditComponent},
  { path: 'items/:id', component: ItemEditComponent},
  { path: 'ingots', component: IngotEditComponent},
  
  //{ path: 'customers/:id', component: CustomerEditReactiveComponent },
  { path: '**', pathMatch:'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];

export const appRouting: IRouting = { 
    routes: RouterModule.forRoot(routes),
    components: [ CustomersComponent, CustomerEditComponent,
     CustomerEditReactiveComponent, CustomersGridComponent,ItemEditComponent,IngotEditComponent ]
};
