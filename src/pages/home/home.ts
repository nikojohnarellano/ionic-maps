import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from '../../providers/location/location'
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;

  map: any;
 
  // LocationProvider is injected. Check providers/location/location.ts
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public locProvider : LocationProvider) {
 
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       // REPLACE THE PARAMETER WITH THE USER'S INPUT
      this.locProvider.getLocation("4268 Victoria Drive Vancouver, BC").then((resp) => { 

        if (resp.status === "OK") {
          let lat = resp.results[0].geometry.location.lat;
          let lng = resp.results[0].geometry.location.lng;

          this.addMarker(lat, lng);
        }

      })

      // REPLACE THE PARAMETER WITH THE USER'S INPUT
      this.locProvider.getLocation("10130 102 Ave Surrey, BC").then((resp) => { 
        console.log(resp)

        if (resp.status === "OK") {

          let lat = resp.results[0].geometry.location.lat;
          let lng = resp.results[0].geometry.location.lng;

          this.addMarker(lat, lng);
        }
      })
 
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(latitude, longitude){

    const pos = { lat : latitude, lng : longitude }

     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: pos
     });
    
     let content = "<h4>Information!</h4>";         
    
     marker.setMap(this.map)
     this.addInfoWindow(marker, content);
    
   }

   addInfoWindow(marker, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: content
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
    
   }
 
}