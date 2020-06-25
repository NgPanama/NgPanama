import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-panama-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  public title = 'Bienvenidos a Ng Panama';
  constructor() {}

  ngOnInit(): void {}
}
