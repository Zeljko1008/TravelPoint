import { Injectable } from '@angular/core';
import { Booking } from '../_models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _bookings: Booking[] = [
    {
      id: 'xyz',
      placeId: 'p1',
      userId: 'a',
      placeTitle: 'Tower Mansion',
      guestNumber: 2


    },
    {
      id: 'xxx',
      placeId: 'p2',
      userId: 'ab',
      placeTitle: 'L\'Amour Kvarner',
      guestNumber: 2

    },
    {
      id: 'xzz',
      placeId: 'p3',
      userId: 'abc',
      placeTitle: 'The Foggy Palace',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p4',
      userId: 'abcd',
      placeTitle: 'Slunjčica River',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p5',
      userId: 'abcde',
      placeTitle: 'Zlatni Rat Beach',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p6',
      userId: 'abcdef',
      placeTitle: 'Vineyard Ilok Castle',
      guestNumber: 2
    },
    {
      id: 'xyz',
      placeId: 'p1',
      userId: 'a',
      placeTitle: 'Tower Mansion',
      guestNumber: 2


    },
    {
      id: 'xxx',
      placeId: 'p2',
      userId: 'ab',
      placeTitle: 'L\'Amour Kvarner',
      guestNumber: 2

    },
    {
      id: 'xzz',
      placeId: 'p3',
      userId: 'abc',
      placeTitle: 'The Foggy Palace',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p4',
      userId: 'abcd',
      placeTitle: 'Slunjčica River',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p5',
      userId: 'abcde',
      placeTitle: 'Zlatni Rat Beach',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p6',
      userId: 'abcdef',
      placeTitle: 'Vineyard Ilok Castle',
      guestNumber: 2
    },
    {
      id: 'xyz',
      placeId: 'p1',
      userId: 'a',
      placeTitle: 'Tower Mansion',
      guestNumber: 2


    },
    {
      id: 'xxx',
      placeId: 'p2',
      userId: 'ab',
      placeTitle: 'L\'Amour Kvarner',
      guestNumber: 2

    },
    {
      id: 'xzz',
      placeId: 'p3',
      userId: 'abc',
      placeTitle: 'The Foggy Palace',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p4',
      userId: 'abcd',
      placeTitle: 'Slunjčica River',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p5',
      userId: 'abcde',
      placeTitle: 'Zlatni Rat Beach',
      guestNumber: 2
    },
    {
      id: 'xzz',
      placeId: 'p6',
      userId: 'abcdef',
      placeTitle: 'Vineyard Ilok Castle',
      guestNumber: 2
    }
  ] ;



  get bookings() {
    return [...this._bookings];

  }
}
