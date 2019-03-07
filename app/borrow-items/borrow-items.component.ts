import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { myValidations } from '../myValidators.validators';
import { MongoServiceService } from '../service/mongo-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBarRef } from '@angular/material';
import { SnackbarServiceService } from '../service/snackbar-service.service';



@Component({
  selector: 'app-borrow-items',
  templateUrl: './borrow-items.component.html',
  styleUrls: ['./borrow-items.component.css']
})
export class BorrowItemsComponent implements OnInit {


  constructor(private service: MongoServiceService, private router: Router, private route: ActivatedRoute,
    public snackBar: SnackbarServiceService) { }

  ngOnInit() {
    response => {
      let data;
      data = response;
      console.log(data);

      if (!data.logged) {
        this.router.navigate([''], { relativeTo: this.route.parent });
      }
    }
  }

 

  addExtraClass: boolean = false;

  form = new FormGroup(
    {
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        myValidations.cannotContainSpaces]),
      title: new FormControl(''),
      publisher: new FormControl(''),

      readerID: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        myValidations.cannotContainSpaces]),
      readerName: new FormControl(''),
      email: new FormControl(''),
      contactNo: new FormControl('')

    });

  get isbn() {
    return this.form.get('isbn');
  }

  get title() {
    return this.form.get('title');
  }
  get publisher() {
    return this.form.get('publisher');
  }
  get readerID() {
    return this.form.get('readerID');
  }
  get readerName() {
    return this.form.get('readerName');
  }
  get email() {
    return this.form.get('email');
  }
  get contactNo() {
    return this.form.get('contactNo');
  }

  itemUrl = 'http://localhost:9000/item';
  readerUrl = 'http://localhost:9000/reader';

  item: any;
  reader: any;

  formValid(): boolean {
    let x = this.readerName.value;
    let y = this.publisher.value;
    return this.isbn.valid && x != '' && y != '';
  }

  clearItem() {
    this.title.reset();
    this.publisher.reset();
  }

  clearReader() {
    this.readerName.reset();
    this.contactNo.reset();
    this.email.reset();
  }


  findIsbn() {
    this.title.setValue('');
    this.publisher.setValue('');
    this.service.findValue(this.itemUrl, this.isbn.value).subscribe(
      response => {
        this.item = response;

        // console.log(data);
        console.log(this.item);

        this.title.setValue(this.item.w1673657_title);
        this.publisher.setValue(this.item.w1673657_publishers);


      },
      error => {

        console.log(error);
        this.snackBar.openErrorSnackBar(error);
        
      }
    )
  }

  findReader() {
    this.readerName.setValue('');
    this.email.setValue('');
    this.contactNo.setValue('');
    this.service.findValue(this.readerUrl, this.readerID.value).subscribe(
      response => {
        console.log(response);
        this.reader = response;
        this.readerName.setValue(this.reader.w1673657_fname + ' ' + this.reader.w1673657_lname);
        this.email.setValue(this.reader.w1673657_email);
        this.contactNo.setValue(this.reader.w1673657_mobileNumber);


      }, 
      error =>
      {
        this.snackBar.openErrorSnackBar(error);
      }
    )
  }

  setBorrowedDetails() {
    let put = {
      isbn: this.isbn.value,
      readerId: this.readerID.value
    }

    this.service.updatePost('http://localhost:9000/borrow/set', put).subscribe(
      response => {
        let data;
        data = response;
        if (data.msg == 'borrowed')
          // alert();
          this.snackBar.openSnackBar("Done! \n" +
          "return date :" + data.returnDate)
        console.log(response);
        this.form.reset();

      },
      error =>
      {
        console.log(error);
        
        this.snackBar.openErrorSnackBar(error);
        
      }
    )
  }





}
