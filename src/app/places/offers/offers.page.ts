import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/_models/place';
import { PlacesService } from 'src/app/_services/places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy{


  isLoading = false;
  offers?: Place[];
  private placesSub: Subscription = new Subscription();
  constructor(

    private placesService: PlacesService,
    private router: Router
  ) { }

  ngOnInit() {

     this.placesSub= this.placesService.places.subscribe(places => {
      this.offers = places;
    });
    }
    ionViewWillEnter() {
      this.isLoading = true;
      this.placesService.fetchPlaces().subscribe(()=>{
        this.isLoading = false;

      });


    }


  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing item', offerId);
  }
  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
