import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LocationProvider Provider');
  }

  getLocation(address : String) : Promise<any> {
    let modifiedAddress = address.replace(/ /g, '+');
    let apiKey          = "AIzaSyCJ0zn4kQOUe-Y8-dukAOeVWNgZG6WBzHk";
    let googleUrl       = `https://maps.googleapis.com/maps/api/geocode/json?address=${modifiedAddress}&key=${apiKey}`

    return this.http.get(googleUrl)
                    .toPromise()
                    .then(response => response)
                    .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
