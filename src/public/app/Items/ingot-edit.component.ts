import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IItem, IIngot, IIngotItem } from '../shared/interfaces';

import { TrackByService } from '../core/trackby.service';

@Component({
  selector: 'ingot-edit',
  templateUrl: './ingot-edit.component.html'
})
export class IngotEditComponent implements OnInit {

  ingot: IIngot = {
    ingotName: '',
    formulaName: '',
    profit: 0,
    itemCost: 0,
    wasteCost: 0,
    ingotCost: 0,
    rodi: 0,
    lm: 0,
    sisa: 0,
    loha: 0,
    zinc: 0,
    netIngotWeight: 0,
    totalItemWeight: 0,
    totalItemWeightMinusZinc: 0,
    items: []
  }
  item: IItem = {
    name: '',
    zinc: 0,
    waste: 0
  };

  newItem: IIngotItem = {
    item: this.item,
    weight: 0
  };

  items: IItem[] = [];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    public trackby: TrackByService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      // this.getCustomer(id);
    }

    this.getItems();
  }
  // getCustomer(id: string) {
  //     this.dataService.getCustomer(id)
  //       .subscribe((customer: ICustomer) => {
  //         this.customer = customer;
  //       },
  //       (err: any) => console.log(err));
  // }

  AddNewItem(event: Event) {
    event.preventDefault();

    let newCourse = Object.assign({}, this.newItem);

    this.ingot.items.push(newCourse);
  }

  DeleteItem(event: Event, obj: IIngotItem) {

    this.ingot.items.splice(this.ingot.items.indexOf(obj), 1);

  }
  getItems() {
    this.dataService.getItems().subscribe((items: IItem[]) => {
      console.log(items);
      this.items = items

    },
      (err: any) => console.log(err),
      () => console.log('getItems() retrieved items'));
  }

  submit() {

    if (this.item._id) {

      // this.dataService.updateCustomer(this.customer)
      //   .subscribe((customer: ICustomer) => {
      //     if (customer) {
      //       this.router.navigate(['/customers']);
      //     } else {
      //       this.errorMessage = 'Unable to save customer';
      //     }
      //   },
      //   (err: any) => console.log(err));

    } else {

      this.dataService.insertItem(this.item)
        .subscribe((item: IItem) => {
          if (item) {
            console.log(item);
            this.getItems();
          }
          else {
            this.errorMessage = 'Unable to add item, please check your entry data and try again.';
          }
        },
        (err: any) => console.log(err));

    }
  }

  cancel(event: Event) {
    event.preventDefault();
    this.item = {
      name: '',
      zinc: 0,
      waste: 0
    };
  }

  

  // delete(event: Event) {
  //   event.preventDefault();
  //   this.dataService.deleteCustomer(this.customer._id)
  //       .subscribe((status: boolean) => {
  //         if (status) {
  //           this.router.navigate(['/customers']);
  //         }
  //         else {
  //           this.errorMessage = 'Unable to delete customer';
  //         }
  //       },
  //       (err) => console.log(err));
  // }

}