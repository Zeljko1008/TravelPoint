import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/_models/place';
import { AuthService } from 'src/app/_services/auth.service';
import { BookingService } from 'src/app/_services/booking.service';
import { PlacesService } from 'src/app/_services/places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place?: Place;
  isBookable = false;
  isLoading = false;
  private placesSub: Subscription = new Subscription();

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl : AlertController,
    private router : Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      const placeId = paramMap.get('placeId');
      if (placeId) {
        this.placesSub = this.placesService
          .getPlace(placeId)
          .subscribe(place => {
            this.place = place;
            this.isBookable = place.userId !== this.authService.userId;
            this.isLoading = false;
          },
          error => {
            this.alertCtrl.create({
              header: 'An error occurred!',
              message: 'Could not load place.',
              buttons: [{text: 'Okay', handler: () => {
                this.router.navigate(['/places/tabs/discover']);
              }}]
            }).then(alertEl => {
              alertEl.present();
            })
          });
      }
    });
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });

    //this.router.navigateByUrl('/places/tabs/discover');
    //this.navCtrl.navigateBack('/places/tabs/discover');
  }
  openBookingModal(mode: 'select' | 'random') {
    if (!this.place) {
      console.error('Place not available');
      return;
    }
    const startDate = '';
    const endDate = '';

    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
          selectedMode: mode,
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking place...' })
            .then((loadingEl) => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              if (this.place?.id && this.place?.title && this.place?.imageUrl) {
                this.bookingService
                  .addBooking(
                    this.place.id,
                    this.place.title,
                    this.place.imageUrl,
                    data.firstName,
                    data.lastName,
                    data.guestNumber,
                    data.startDate,
                    data.endDate
                  )
                  .subscribe(() => {
                    loadingEl.dismiss();
                  });
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
