import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { myValidations } from 'src/app/myValidators.validators';
import { MongoServiceService } from 'src/app/service/mongo-service.service';
import { SnackbarServiceService } from 'src/app/service/snackbar-service.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  constructor(private service: MongoServiceService, private snackbar: SnackbarServiceService) { }

  found = true;

  ngOnInit() {
  }
  form = new FormGroup({
    item: new FormControl({ value: '', disabled: true }, Validators.required),
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
      myValidations.cannotContainSpaces]),
    title: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    noOfpages: new FormControl('', Validators.required),
    authors: new FormArray([]),
    languages: new FormArray([]),
    subtitles: new FormArray([]),
    creators: new FormArray([]),
    actors: new FormArray([])

  });
  sectors = ['Sector 01', 'Sector 02', 'Sector 03', 'Sector 04'];

  get item() {
    return this.form.get('item');
  }
  get isbn() {
    return this.form.get('isbn');
  }
  get title() {
    return this.form.get('title');
  }
  get sector() {
    return this.form.get('sector');
  }
  get publisher() {
    return this.form.get('publisher');
  }
  get noOfpages() {
    return this.form.get('noOfpages');
  }
  get authors() {
    return (this.form.get('authors') as FormArray);
  }
  get languages() {
    return (this.form.get('languages') as FormArray);
  }
  get subtitles() {
    return (this.form.get('subtitles') as FormArray);
  }
  get creators() {
    return (this.form.get('creators') as FormArray);
  }
  get actors() {
    return (this.form.get('actors') as FormArray);
  }

  isdvdValid() {
    return this.isbn.valid && this.title.valid && this.sector.valid
      && this.publisher.valid && this.languages.valid && this.subtitles.valid
      && this.creators.valid && this.actors.valid;
  }
  isBookValid() {
    return this.isbn.valid && this.title.valid && this.sector.valid
      && this.publisher.valid && this.authors.valid && this.noOfpages.valid;
  }
  change(value: HTMLAnchorElement) {
    console.log(value);

  }

  addAuthor() {
    const author = new FormControl('', Validators.required);
    this.authors.push(author);
  }
  addLanguage() {
    const lan = new FormControl('', Validators.required);
    this.languages.push(lan);
  }
  addSubtitle() {
    const sub = new FormControl('', Validators.required);
    this.subtitles.push(sub);
  }
  addCreator() {
    const creator = new FormControl('', Validators.required);
    this.creators.push(creator);
  }
  addActor() {
    const actor = new FormControl('', Validators.required);
    this.actors.push(actor);
  }

  removeAuthor(author) {
    let index = this.authors.controls.indexOf(author);
    this.authors.removeAt(index);
  }

  removeLanguage(lan) {
    let index = this.languages.controls.indexOf(lan);
    this.languages.removeAt(index);
  }
  removeSubtitle(sub) {
    let index = this.subtitles.controls.indexOf(sub);
    this.subtitles.removeAt(index);
  }
  removeCreator(creator) {
    let index = this.creators.controls.indexOf(creator);
    this.creators.removeAt(index);
  }
  removeActor(actor) {
    let index = this.actors.controls.indexOf(actor);
    this.actors.removeAt(index);
  }

  itemUrl = 'http://localhost:9000/item';


  itemData;

  findIsbn() {
    this.itemData = null;

    this.title.setValue('');
    this.publisher.setValue('');
    this.authors.controls.splice(0);
    this.subtitles.controls.splice(0);
    this.actors.controls.splice(0);
    this.creators.controls.splice(0);
    this.languages.controls.splice(0);

    this.service.findValue(this.itemUrl, this.isbn.value).subscribe(
      response => {
        this.itemData = response;

        // console.log(data);
        console.log(this.itemData);
        this.item.setValue(this.itemData.type);
        this.title.setValue(this.itemData.w1673657_title);
        this.publisher.setValue(this.itemData.w1673657_publishers);
        this.sector.setValue(this.itemData.w1673657_sector);



        if (this.itemData.type == 'book')
          this.itemData.w1673657_authors.forEach(element => {
            this.noOfpages.setValue(this.itemData.w1673657_noOfPages);
            const author = new FormControl(element, Validators.required);
            this.authors.push(author);
          });



        if (this.itemData.type == 'dvd') {
          this.itemData.w1673657_languages.forEach(language => {
            const lan = new FormControl(language, Validators.required);
            this.languages.push(lan);
          });
          this.itemData.w1673657_subtitles.forEach(subtitle => {
            const sub = new FormControl(subtitle, Validators.required);
            this.subtitles.push(sub);
          });
          this.itemData.w1673657_creators.forEach(creator => {
            const cre = new FormControl(creator, Validators.required);
            this.creators.push(cre);
          });
          this.itemData.w1673657_actors.forEach(actor => {
            const act = new FormControl(actor, Validators.required);
            this.actors.push(act);
          });
        }
      }
      , error => {
        this.snackbar.openSnackBar(error);
      }
    )
  }



  bookSubmit() {
    console.log(this.isBookValid());
    this.updateBook();
    // this.form.reset();

  }
  dvdSubmit() {
    console.log(this.isdvdValid());
    this.updateDvd();
    // this.form.reset();
  }

  clear() {
    console.log(this.isbn);
    console.log(this.isbn.value);

    console.log(this.form);

  }

  bookUrl = 'http://localhost:9000/books';
  dvdUrl = 'http://localhost:9000/dvd';
  //..............
  updateBook() {
    let post = {
      isbn: this.isbn.value,
      title: this.title.value,
      publisher: this.publisher.value,
      sector: this.sector.value,
      authors: this.authors.value,
      noOfpages: this.noOfpages.value

    }

    console.log(post);
    this.service.updatePost(this.bookUrl, post).subscribe(
      response => {
        console.log(response);
        let res;
        res = response;
        if (res.msg == 'updated') {
          // alert('Successfully Updated\n'+  
          //       'no of books :'+res.bookCount);
          this.snackbar.openSnackBar('Updated!!\n' +
            'no of books :' + res.bookCount);
          this.isbn.setValue('');

        }
        let x = this.isbn.value;
        this.form.reset();

        this.isbn.setValue(x);
        this.itemData = null;
        // this.authors.controls.splice(0);
      }
      , error => {
        this.snackbar.openSnackBar(error);
      }
    )

  }

  updateDvd() {
    let post = {
      isbn: this.isbn.value,
      title: this.title.value,
      publisher: this.publisher.value,
      sector: this.sector.value,
      languages: this.languages.value,
      subtitles: this.subtitles.value,
      creators: this.creators.value,
      actors: this.actors.value
    }
    console.log(post);
    this.service.updatePost(this.dvdUrl, post).subscribe(
      response => {
        // let value:string=response;
        console.log(response);
        let res: any;
        res = response;
        if (res.msg == 'updated') {
          // alert('Successfully Updated\n'+  
          //       'no of dvd :'+res.dvdCount);
          this.snackbar.openSnackBar('Updated!!\n' +
            'no of dvd :' + res.dvdCount);
          this.isbn.setValue('');
        }

        let x = this.isbn.value;
        this.form.reset();
        this.subtitles.controls
        this.isbn.setValue(x);
        this.itemData = null;
      }
      , error => {
        this.snackbar.openSnackBar(error);
      }
    )

  }
}
