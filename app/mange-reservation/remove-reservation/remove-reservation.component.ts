import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { myValidations } from 'src/app/myValidators.validators';
import { MongoServiceService } from 'src/app/service/mongo-service.service';
import { SnackbarServiceService } from 'src/app/service/snackbar-service.service';

@Component({
  selector: 'app-remove-reservation',
  templateUrl: './remove-reservation.component.html',
  styleUrls: ['./remove-reservation.component.css']
})
export class RemoveReservationComponent implements OnInit {

  constructor(private service: MongoServiceService,private snackbar:SnackbarServiceService) { }

  ngOnInit() {
  }


  form = new FormGroup(
    {
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        myValidations.cannotContainSpaces]),
      title: new FormControl()
    }
  );

  get isbn() {
    return this.form.get('isbn');
  }

  get title() {
    return this.form.get('title');
  }




  formValid(): boolean {
    let x = this.title.value;
    return this.isbn.valid && x != '';
  }

  itemUrl = 'http://localhost:9000/item';


  itemData;

  findIsbn() {
    this.itemData = null;

    this.title.setValue('');
    this.service.findValue(this.itemUrl, this.isbn.value).subscribe(
      response => {
        this.itemData = response;
        console.log(this.itemData);
        this.title.setValue(this.itemData.w1673657_title);
      }
      ,error =>
      {
        this.snackbar.openErrorSnackBar(error);
      }
    )
  }

  removeReservation(isbn: string, readerId: string) {
    if (confirm('Are you sure u want to remove this reseration, this can\'t be undo')) {
      console.log(isbn);

      let put = {
        isbn: isbn,
        readerId: readerId
      }

      this.service.updatePost('http://localhost:9000/reservation/remove', put).subscribe(
        response => {
          let msg;
          msg = response;
          if (msg.msg == 'removed') {
            // alert('Reservation has successfully removed');
            this.snackbar.openSnackBar('Reservation has successfully removed')
            this.findIsbn();
            // this.form.reset();
          }
        }
        ,error=>
        {
          this.snackbar.openErrorSnackBar(error);
        }
      )
    }


  }


}
