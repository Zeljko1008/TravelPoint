import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/_services/places.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.page.html',
  styleUrls: ['./create-offer.page.scss'],
})
export class CreateOfferPage implements OnInit {

  form:FormGroup = new FormGroup({});
  isFromDateModalOpen = false;
  isToDateModalOpen = false;
  selectedFromDate: string | null = null;
  selectedToDate: string | null = null;

  constructor(
    private placesService :PlacesService,
    private router : Router
  )
     { }

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
  onResetForm() {
    this.form.reset();
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }

    this.placesService.addPlace(
      this.form.value.title,
      this.form.value.description,
      +this.form.value.price,
      new Date(this.form.value.dateFrom),
      new Date(this.form.value.dateTo)
    )
    .subscribe(() => {


    this.form.reset();
    this.router.navigate(['/places/tabs/offers']);
    }
    );

  }

  openFromDateModal() {
    this.isFromDateModalOpen = true;
  }

  closeFromDateModal() {
    this.isFromDateModalOpen = false;
  }

  openToDateModal() {
    this.isToDateModalOpen = true;
  }

  closeToDateModal() {
    this.isToDateModalOpen = false;
  }

  onFromDateSelected(event: any) {
    this.selectedFromDate = event.detail.value;
    this.closeFromDateModal();
  }

  onToDateSelected(event: any) {
    this.selectedToDate = event.detail.value;
    this.closeToDateModal();
  }





}
