import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Place } from 'src/app/_models/place';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],

})
export class CreateBookingComponent  implements OnInit {

  @Input() selectedPlace?: Place;
  @Input() selectedMode?: 'select' | 'random';
  @ViewChild('form') form?:NgForm;
  startDate?: string | '';
  endDate?: string | '';

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    const availableFrom = this.selectedPlace?.availableFrom ?? new Date();
const availableTo = this.selectedPlace?.availableTo ?? new Date();




      if (this.selectedMode === 'random') {
        // Random date logic
        this.startDate = new Date(
          availableFrom.getTime() +
            Math.random() *
              (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
        ).toISOString();

        this.endDate = new Date(
          new Date(this.startDate).getTime() +
            Math.random() *
              (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
        ).toISOString();

      } else {

        this.startDate = availableFrom.toISOString();
        this.endDate = availableTo.toISOString();
      }

    console.log('Start Date:', this.startDate); // Ispisivanje u konzolu
    console.log('End Date:', this.endDate); // Ispisivanje u konzolu
  }





  onBookPlace() {
    if (!this.form?.valid && !this.datesValid()) {
     return;
    }
    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form?.value['first-name'],
          lastName: this.form?.value['last-name'],
          guestNumber: this.form?.value['guest-number'],
          startDate: new Date(this.form?.value['date-from']),
          endDate: new Date(this.form?.value['date-to'])
        }
      },
      'confirm'
    );

  }

  datesValid(){
    const startDate = new Date(this.form?.value['date-from']);
    const endDate = new Date(this.form?.value['date-to']);
    return endDate > startDate;
  }



  onCancel() {

    this.modalCtrl.dismiss(null, 'cancel');
  }



}
