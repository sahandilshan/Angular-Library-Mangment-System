import { Injectable, NgZone, Component } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class SnackbarServiceService {
  

  constructor(private snackBar: MatSnackBar) {}

  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  public openErrorSnackBar(errorType:number):void {
    this.assingValues(errorType);
    
      let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    const snackBar = this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  public openSnackBar(msg:string):void {
    
    
      let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 4000;
    config.panelClass=['snack'];
    const snackBar = this.snackBar.open(msg, 'OK', config);
  }

  public openSnackBarCustom(msg:string):void {
    
    
    let config = new MatSnackBarConfig();
  config.verticalPosition = 'bottom';
  config.horizontalPosition = 'left';
  config.duration = 3000;
  const snackBar = this.snackBar.open(msg, 'OK', config);
}

  




  private assingValues(errorType:number)
  {
    switch(errorType)
    {
      case 500:
      {
          this.message='An problem occured with the server';
          this.actionButtonLabel='Retry';
          break;
      }
      case 404:
      {
        this.message='Invalid id';
        this.actionButtonLabel='Re-check';
        break;
      }
      case 400:
      {
        this.message='Please fill all details';
        this.actionButtonLabel='Retry';
        break;
      }
      case 403:
      {
        this.message='Item has already borrowed';
        this.actionButtonLabel='Try another item';
        break;
      }
      case 999:
      {
        this.message='Duplicate ISBN number';
        this.actionButtonLabel='Re-check';
        break;
      }
      case 998:
      {
        this.message='Can\'t add more items';
        this.actionButtonLabel='Error';
        break;
      }
      case 997:
      {
        this.message='Item has not borrowed';
        this.actionButtonLabel='OK';
        break;
      }
      case 995:
      {
        this.message='Isbn number has been changed';
        this.actionButtonLabel='Re-check';
        break;
      }
      case 994:
      {
        this.message='No Item found';
        this.actionButtonLabel='Re-enter';
        break;
      }
      case 993:
      {
        this.message='Reader id or isbn has been changed';
        this.actionButtonLabel='Re-check';
        break;
      }
      case 992:
      {
        this.message='No need to make a reservation, item is available to be borrowed';
        this.actionButtonLabel='OK';
        break;
      }
      case 991:
      {
        this.message='Invalid username or password';
        this.actionButtonLabel='Re-enter';
        break;
      }
      case 990:
      {
        this.message='can not remove this reader, he has a book/dvd to return';
        this.actionButtonLabel='OK';
        break;
      }
      case 889:
      {
        this.message='Can\'t borrow, there\'s a reservation for this item';
        this.actionButtonLabel='OK';
        break;
      }
      case 888:
      {
        this.message='this user has already put a reservation for this';
        this.actionButtonLabel='OK';
        break;
      }


      default:
      {
        this.message='Error';
        this.actionButtonLabel='OK';
      }
    }
  }
}