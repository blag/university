import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: [] = [];

  constructor() { }

  ngOnInit() {
  }

}
