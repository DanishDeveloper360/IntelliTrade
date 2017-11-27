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
    items: [],
    waste: 0,
    ingotRate: 0,
    zincRate:0
  };

  item: IItem = {
    name: '',
    zinc: 0,
    waste: 0,
    rate: 0
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
    }

    this.getItems();
  }

  AddNewItem(event: Event) {
    event.preventDefault();

    let newCourse = Object.assign({}, this.newItem);

    this.ingot.items.push(newCourse);

    let zincWeight = this.ingot.items.map(x => {
      return (x.item.zinc / 100) * x.weight;
    }).reduce((a, b) => a + b, 0);

    this.ingot.zinc = zincWeight;

    let wasteWeight = this.ingot.items.map(x => {
      return ((x.item.waste/100) * x.weight);
    }).reduce((a, b) => a + b, 0);

    this.ingot.waste = wasteWeight;

    this.ingot.totalItemWeight = this.ingot.items.map(x => {
      return x.weight;
    }).reduce((a, b) => a + b, 0);


    this.ingot.totalItemWeightMinusZinc = this.ingot.items.map(x => {
      return x.weight;
    }).reduce((a, b) => a + b, 0) - this.ingot.zinc;
    
    this.ingot.netIngotWeight = this.ingot.totalItemWeight + this.ingot.zinc
      - this.ingot.lm - this.ingot.sisa - this.ingot.rodi - this.ingot.loha - this.ingot.waste;
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
  };


  CalculateProfit(event) {

    let totalItemRate = this.ingot.items.map(x => {
      return x.item.rate * x.weight;
    }).reduce((a, b) => a + b, 0);

    let rodiRate =  this.items.find(x => x.name.toLowerCase().trim() == "rodi").rate * this.ingot.rodi;
    let lmRate =  this.items.find(x => x.name.toLowerCase().trim() == "lm").rate * this.ingot.lm;
    let sisaRate =  this.items.find(x => x.name.toLowerCase().trim() == "sisa").rate * this.ingot.sisa;
    let lohaRate =  this.items.find(x => x.name.toLowerCase().trim() == "loha").rate * this.ingot.loha;

    this.ingot.profit = -10000 + this.ingot.netIngotWeight * this.ingot.ingotRate 
    - totalItemRate + rodiRate + lmRate + sisaRate + lohaRate - (this.ingot.zinc * this.ingot.zincRate);
    
  };


  cancel(event: Event) {
    event.preventDefault();
    this.item = {
      name: '',
      zinc: 0,
      waste: 0,
      rate: 0
    };
  };

}