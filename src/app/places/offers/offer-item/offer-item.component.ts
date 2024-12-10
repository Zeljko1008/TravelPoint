import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'src/app/_models/place';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent  implements OnInit {

  @Input() offer?: Place;

  constructor(
    private router:Router
  ) { }

  ngOnInit() {

    console.log('offer item');
  }
  getDummyDate(){
    return new Date();
  }

}
