import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { DonateDialogComponent } from 'src/app/shared/dialogs/donate-dialog/donate-dialog.component';
import { DonationPost } from 'src/app/shared/models/donation.model';
import { PostService } from 'src/app/shared/services/post/post.service';

@Component({
  selector: 'app-donation-map',
  templateUrl: './donation-map.component.html',
  styleUrls: ['./donation-map.component.scss']
})
export class DonationMapComponent implements OnInit {
  donationList: DonationPost[];
  donationListSubscription$!: Subscription;
  selectedDonation!: DonationPost;

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  display: any;
  // center: google.maps.LatLngLiteral = {
  //   lat: 22.58088432313956,
  //   lng: 88.42910351167149
  // };
  center: google.maps.LatLngLiteral = {
    lat: 22.5726459,
    lng: 88.3638953
  };
  zoom = 5;

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerPositionList: { id: number, markerPosition: google.maps.LatLngLiteral }[] = [];

  constructor(
    private _postService: PostService,
    public _dialog: MatDialog
  ) {
    this.donationList = [];
  }

  ngOnInit(): void {
    this.donationListSubscription$ = this._postService.getAllDonationPostList().subscribe((donationList: DonationPost[]) => {
      this.donationList = donationList;
      donationList.forEach((donation: DonationPost) => {
        this.markerPositionList.push({
          id: donation.id,
          markerPosition: {
            lat: parseFloat(donation.latitude), 
            lng: parseFloat(donation.longitude)
          }
        })
      })
    })
  }

  // ========== Map Event Handler ==========//
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null)
      this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null)
      this.display = event.latLng.toJSON();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    // if (event.latLng != null)
      // this.markerPositions.push(event.latLng.toJSON());
  }

  openInfoWindow(marker: MapMarker, id: number) {
    let tempItem = this.donationList.find((item) => item.id == id)
    if(tempItem){
      this.selectedDonation = tempItem
    } 
    if (this.infoWindow != undefined)
      this.infoWindow.open(marker);
  }
  
  // ========== End Map Event Handler ==========//

  onClickDonate(selectedDonation: DonationPost): void {
    this._dialog.open(DonateDialogComponent, { data: { id: selectedDonation.id, amount: selectedDonation.amount } });
  }

}
