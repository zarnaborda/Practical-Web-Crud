import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  productFormDetail: any = {};
  constructor() { }

  ngOnInit(): void {
    this.productFormDetail = {
      id: 0,
      name: null,
      type: null,
      manufacture_date: null,
      price: null,
      image: null,
      description: null
    };
  }

}
