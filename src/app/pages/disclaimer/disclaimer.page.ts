import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  aceptado: boolean;

  constructor() {
    this.aceptado = false;
   }

  ngOnInit() {
  }

}
