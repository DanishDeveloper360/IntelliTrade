import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IItem } from '../shared/interfaces';

import { TrackByService } from '../core/trackby.service';

@Component({
  selector: 'item-edit',
  templateUrl: './item-edit.component.html'
})
export class ItemEditComponent implements OnInit {

  item: IItem = {
    name: '',
    zinc: 0,
    waste: 0
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

  getItems() {
    this.dataService.getItems().subscribe((items: IItem[]) => 
    {
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