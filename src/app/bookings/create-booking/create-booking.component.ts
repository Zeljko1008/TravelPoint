import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/_models/place';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],

})
export class CreateBookingComponent  implements OnInit {

  @Input() selectedPlace?: Place;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('create booking page');
  }

  onBookPlace() {
    this.modalCtrl.dismiss({message: 'This is a dummy message!'}, 'confirm');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
