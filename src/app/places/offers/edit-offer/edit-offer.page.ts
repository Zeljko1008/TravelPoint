import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/_models/place';
import { PlacesService } from 'src/app/_services/places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit , OnDestroy {

  place?: Place;
  form:FormGroup = new FormGroup({});
  private placesSub : Subscription = new Subscription();
  isLoading = false;
  placeId?: string;

  constructor(

    private placesService: PlacesService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router : Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');

      if (!placeId) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
        this.placeId = paramMap.get('placeId') as string;
        this.isLoading = true;
        this.placesSub = this.placesService.getPlace(placeId).subscribe(place => {
          this.place = place;
         this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [  Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [ Validators.required, Validators.maxLength(180)]
          })

         });
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occurred!',
            message: 'Place could not be fetched. Please try again later.',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['/places/tabs/offers']);
                }
              }
            ]

          }).then(alertEl => {
            alertEl.present();
          });

        }
      );

  }

  );


}
   onUpdateOffer(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesService.updatePlace(
        this.place?.id as string,
        this.form.value.title,
        this.form.value.description
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/offers']);
      }
      )

    })

   }
    ngOnDestroy(): void {
      if (this.placesSub) {
        this.placesSub.unsubscribe();
      }
    }

}
