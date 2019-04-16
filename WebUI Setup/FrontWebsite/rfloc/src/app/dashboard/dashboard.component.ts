import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { interval, Subscription } from "rxjs";

/**
 *  interface for circle markers
 */
interface marker {
  lat: number;
  lng: number;
  radii?: number;
  draggable: boolean;
  label?: string;
}

/**
 * interface for window pop up
 */
export interface DialogData {
  detectorName: string;
  statement: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})
export class DashboardComponent implements OnInit {

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog
  ) { }

  // user object to handle login request
  public user: any;

  // request object to habndle api calls
  public requests;

  public detectRequests;

  public dataSource;

  public source;

  // latitude, longitude, zoom values for map
  private lat: number;
  private lng: number;
  private zoom: number;
  private radius: number;
  private signal: number;
  private selected: string;

  private statement: string;
  private detectorName: string;

  private intervalID: number;
  private subscription: Subscription;
  private requestSubs: Subscription;

  private err: boolean;
  private newData: boolean;

  private errmsg: string = 'Invalid Credentials Were Entered!';
  
  private markers: marker[] = [];
  private displayedColumns: string[] = ['mac_address', 'time_stamp', 'signal_strength', 'detector'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * set the initial values of the latitude and longitude to point to the university
   * default zoom level is set
   * user object is ready to work login
   */
  ngOnInit() {
    this.lat = 40.72131569380202;
    this.lng = -73.65225518308102;
    this.zoom = 17;
    this.radius = 0;
    this.user = {
      username: '',
      password: ''
    };
    this.err = false;
    this.newData = false;
    this.source = null;
    const source = interval(10000);
    this.subscription = source.subscribe(val => this.updateMap(this.markers));
    this.requestSubs = source.subscribe(val => this.apiService.listRequest());
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
    this.requestSubs && this.requestSubs.unsubscribe();
  }

  /**
   * onLogin(): handles login service and then once logged in handles the api calls
   */
  async onLogin() {
    await this.apiService.loginUser({ 'username': this.user.username, 'password': this.user.password }).catch(error => {this.err = true;});
    this.source = await this.apiService.listRequest();
    this.setRequestsTable(this.source);
    this.newData = true;
  }

  /**
   * refreshToken(): get a new JWT to continue using api
   */
  refreshToken() {
    this.apiService.refreshToken();
  }

  /**
   * logout(): logout of JWT session
   */
  logout() {
    this.apiService.logout();
    this.user = {
      username: '',
      password: ''
    };
    this.err = false;
  }

  /**
   * updateMap(): takes existing markers and tries to update them
   * 
   * @param mapMarkers: array of markers to add to the map
   */
  updateMap(mapMarkers: marker[]) {
    if (mapMarkers.length == 0 || mapMarkers === undefined) {
      console.log('Array of markers is empty');
    } else {
      let tmp = mapMarkers;
      console.log(tmp);
      mapMarkers.forEach(element => {
        console.log(element.label, ':', element.radii);
        if (element.label == 'detector-1') {
          this.setRadius(element.label);
          element.radii = this.radius;
        }
        console.log('New Values ', element.label, ':', element.radii);
      });
    }
  }


  /**
   * setRequestsTable(): takes endpoint data and creates table
   * 
   * @param data: endpoint data 
   */
  setRequestsTable(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * applyFilter(): filters the table
   * 
   * @param filterValue: string value to match against the table
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * setRadius(): sets the radius of the circle marker on the map
   * 
   * @param detector 
   */
  async setRadius(detector) {
    this.detectRequests = await this.apiService.listRequestByDetector(detector).toPromise();
    this.detectRequests.forEach(element => {
      if ((element.signal_strength > -110) && (element.signal_strength < -100)) {
        this.radius = 21;
      } else if ((element.signal_strength > -100) && (element.signal_strength < -90)) {
        this.radius = 18;
      } else if ((element.signal_strength > -90) && (element.signal_strength < -80)) {
        this.radius = 15;
      } else if ((element.signal_strength > -80) && (element.signal_strength < -70)) {
        this.radius = 12;
      } else if ((element.signal_strength > -70) && (element.signal_strength < -60)) {
        this.radius = 9;
      } else if ((element.signal_strength > -60) && (element.signal_strength < -50)) {
        this.radius = 6;
      } else if ((element.signal_strength > -50) && (element.signal_strength < -40)) {
        this.radius = 3;
      }
    });
  }

  /**
   * openDialog(): opens up window to enter detector info
   */
  async openDialog() {
    const dialogRef = this.dialog.open(DetectorDialog, {
      width: '250px',
      data: { statement: this.statement, detectorName: this.detectorName }
    });

    this.detectorName = await dialogRef.afterClosed().toPromise();
  }

  /**
   * mapClicked(): handles map events
   * 
   * @param $event: events when the mouse is clicked on the map
   */
  async mapClicked($event: MouseEvent) {
    await this.openDialog();
    console.log('Name: ', this.detectorName);
    await this.setRadius(this.detectorName);
    console.log('Detector Data: ', this.detectRequests);
    console.log('Radius: ', this.radius);

    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      label: this.detectorName,
      radii: this.radius
    });
  }
}


// class for dialog window
@Component({
  selector: 'dashboard-component',
  templateUrl: 'detector-dialog.html',
})
export class DetectorDialog {

  constructor(
    public dialogRef: MatDialogRef<DetectorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
