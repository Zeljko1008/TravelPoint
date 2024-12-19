import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from 'src/app/_models/place';
import { PlacesService } from 'src/app/_services/places.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy{

  loadedPlaces?: Place[];
  listedLoadedPlaces?: Place[];
  relevantPlaces?: Place[] = [];
  private placesSub: Subscription = new Subscription();
  isLoading = false;

  constructor(

    private placesService: PlacesService,
    private authService: AuthService,
  ) { }


  ngOnInit() {

    this.placesSub= this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    })
  }
  ionViewWillEnter() {
  this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(()=>{
      this.isLoading = false;
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
   if (event.detail.value === 'all') {
     this.relevantPlaces = this.loadedPlaces;
     this.listedLoadedPlaces = this.relevantPlaces?.slice(1);
   } else {
      this.relevantPlaces = this.loadedPlaces?.filter(place => place.userId !== this.authService.userId);
      this.listedLoadedPlaces = this.relevantPlaces?.slice(1);
    }
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
  }

}

}
