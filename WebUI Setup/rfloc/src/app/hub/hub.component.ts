import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ApiService } from '../api.service';

/**
 * interface for window pop up
 */
export interface DialogData {
  userName: string;
  mac_address: string;
}

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  public optIn;

  userName: string;
  mac_address: string;

  ngOnInit() {
    
  }

  /**
   * openDialog(): opens up window to enter user and mac address info
   */
  async openDialog() {
    const dialogRef = this.dialog.open(OptInDialog, {
      width: '450px',
      data: { userName: this.userName, mac_address: this.mac_address }
    });

    await dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.apiService.sendWhitelistRequest(data.userName, data.mac_address);
    });
  }

}

@Component({
  selector: 'hub-component',
  templateUrl: 'opt-in-dialog.html',
})
export class OptInDialog {

  constructor(
    public dialogRef: MatDialogRef<OptInDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
