import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.page.html',
  styleUrls: ['./create-offer.page.scss'],
})
export class CreateOfferPage implements OnInit {

  form:FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit() {

    this.form = new FormGroup({

      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [  Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [ Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [ Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [ Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [ Validators.required]
      })

    })
  }


  onCreateOffer() {
    console.log(this.form);
  }




}
