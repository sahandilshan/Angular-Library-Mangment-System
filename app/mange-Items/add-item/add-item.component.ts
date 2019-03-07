import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { myValidations } from 'src/app/myValidators.validators';
import { MongoServiceService } from 'src/app/service/mongo-service.service';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
import { LoginComponent } from 'src/app/login/login.component';
import { SnackbarServiceService } from 'src/app/service/snackbar-service.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  constructor(private service: MongoServiceService,private snackbar:SnackbarServiceService) { }

  bookUrl = 'http://localhost:9000/books';
  dvdUrl = 'http://localhost:9000/dvd';



  ngOnInit() {

    // let i
    // console.log(i.items);
  }

  form = new FormGroup({
    item: new FormControl('', Validators.required),
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
      myValidations.cannotContainSpaces]),
    title: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    noOfpages: new FormControl('', Validators.required),
    authors: new FormArray([new FormControl('', Validators.required)]),
    languages: new FormArray([new FormControl('', Validators.required)]),
    subtitles: new FormArray([new FormControl('', Validators.required)]),
    creators: new FormArray([new FormControl('', Validators.required)]),
    actors: new FormArray([new FormControl('', Validators.required)])

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



  bookSubmit() {
    console.log(this.isBookValid());
    this.addBook();

  }
  dvdSubmit() {
    console.log(this.isdvdValid());
    this.addDvd();
  }

  clear() {
    //   console.log(this.isbn);
    //   console.log(this.isbn.value);

    //  console.log(this.form);
    this.form.reset();
    this.item.setValue('');
    this.authors.controls.splice(1);
    this.subtitles.controls.splice(1);
    this.actors.controls.splice(1);
    this.creators.controls.splice(1);
    this.languages.controls.splice(1);

  }


  //..............
  addBook() {
    let post = {
      isbn: this.isbn.value,
      title: this.title.value,
      publisher: this.publisher.value,
      sector: this.sector.value,
      authors: this.authors.value,
      noOfpages: this.noOfpages.value

    }

    console.log(post);
    this.service.createPost(this.bookUrl, post).subscribe(
      response => {
        console.log(response);
        let data;
        data = response;
        if (data.msg == 'added') {
          // alert('Book has been successfully added' +
          //   '\nanother ' + (100 - data.bookCount) + ' book(s)can be added');
          this.snackbar.openSnackBar('Done!' +
          '\nanother ' + (100 - data.bookCount) + ' book(s)can be added')
        }
        this.clear();

      }
      ,error=>
      {
        this.snackbar.openErrorSnackBar(error);
      }
      )
  }

  addDvd() {
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
    this.service.createPost(this.dvdUrl, post).subscribe(
      response => {
        // let value:string=response;
        console.log(response);
        let data;
        data = response;

        if (data.msg == 'added') {
          // alert('DVD has been successfully added' +
          //   '\ndvd count :' + data.dvdCount +
          //   '\nanother ' + (50 - data.dvdCount) + ' dvd can be added');
            this.snackbar.openSnackBar('Done!' +
            '\nanother ' + (50 - data.dvdCount) + ' dvd can be added')
        }
        this.clear();
      }
      ,error=>
      {
        this.snackbar.openErrorSnackBar(error);
      }
    )

  }




}