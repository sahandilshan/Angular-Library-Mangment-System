import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { myValidations } from 'src/app/myValidators.validators';
import { MongoServiceService } from 'src/app/service/mongo-service.service';
import { SnackbarServiceService } from 'src/app/service/snackbar-service.service';

@Component({
  selector: 'app-remove-item',
  templateUrl: './remove-item.component.html',
  styleUrls: ['./remove-item.component.css']
})
export class RemoveItemComponent implements OnInit {

  constructor(private service: MongoServiceService,private snackbar:SnackbarServiceService) { }

  ngOnInit() {
  }

  found = false;

  form = new FormGroup(
    {
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        myValidations.cannotContainSpaces]),
      title: new FormControl(''),
      item: new FormControl(''),
      publisher: new FormControl('')
    });

  get isbn() {
    return this.form.get('isbn');
  }
  get item() {
    return this.form.get('item');
  }

  get title() {
    return this.form.get('title');
  }

  get publisher() {
    return this.form.get('publisher');
  }


  validForm(): boolean {
    // console.log(this.author.value);
    let x = this.title.value;
    return this.isbn.valid && x != '';
  }

  clear() {
    // this.itemData = null;
    this.form.reset();
    this.itemData = null;

  }

  itemUrl = 'http://localhost:9000/item';


  itemData;

  findIsbn() {
    this.itemData = null;

    this.title.setValue('');
    this.publisher.setValue('');
    this.service.findValue(this.itemUrl, this.isbn.value).subscribe(
      response => {
        this.itemData = response;

        // console.log(data);
        console.log(this.itemData);
        this.item.setValue(this.itemData.type);
        this.title.setValue(this.itemData.w1673657_title);
        this.publisher.setValue(this.itemData.w1673657_publishers);

      },
      error => {
        this.snackbar.openErrorSnackBar(error);
     }
    )
  }


  removeItem() {
    if (confirm('Are you sure you want to remove this item,this action can\'t be undo')) {
      if (this.itemData.type == 'book') {
        this.service.deletePost('http://localhost:9000/books', this.isbn.value).subscribe(
          response => {
            let data;
            data = response;
            if (data.msg == 'deleted') {
              // alert('Item has been successfully deleted\n' +
              //   'availabe book space :' + data.freespace);
              this.snackbar.openSnackBar('Deleted!\n' +
                'availabe book space :' + data.freespace)
              this.form.reset();
              this.itemData = null;
            }
          }
          ,error => {
            this.snackbar.openErrorSnackBar(error);
            let x = this.isbn.value;
            this.form.reset;
            this.itemData = null;
            this.isbn.setValue(x);
           
     
          }
        )
        
      }
      else {
        this.service.deletePost('http://localhost:9000/dvd', this.isbn.value).subscribe(
          response => {
            let data;
            data = response;
            if (data.msg == 'deleted') {
              // alert('Item has been successfully deleted\n' +
              //   'availabe dvd space :' + data.freespace);
                this.snackbar.openSnackBar('Deleted!\n' +
                'availabe dvd space :' + data.freespace);
              this.form.reset();
              this.itemData = null;
            }
          }
          ,
          error => {
            this.snackbar.openErrorSnackBar(error);
            let x = this.isbn.value;
            this.form.reset;
            this.itemData = null;
            this.isbn.setValue(x);
          }
        )
      }
    }

  }




}
