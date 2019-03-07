import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { myValidations } from 'src/app/myValidators.validators';
import { MongoServiceService } from 'src/app/service/mongo-service.service';
import { SnackbarServiceService } from 'src/app/service/snackbar-service.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  constructor(private service:MongoServiceService,private snackBar:SnackbarServiceService) { }

  ngOnInit() {
  }

  form=new FormGroup(
    {
      isbn:new FormControl('',[
        Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
      myValidations.cannotContainSpaces]),
    title: new FormControl(),
    dateAvailable: new FormControl(),

    readerID: new FormControl('',[
      Validators.required,
    Validators.minLength(7),
    Validators.maxLength(7),
    myValidations.cannotContainSpaces]),
    readerName:new FormControl(''),
    email: new FormControl()
    }
  );

  get isbn()
  {
    return this.form.get('isbn');
  }

  get title()
  {
    return this.form.get('title');
  }
  get dateAvailable()
  {
    return this.form.get('dateAvailable');
  }
  get readerID()
  {
    return this.form.get('readerID');
  }
  get readerName()
  {
    return this.form.get('readerName');
  }
  get email()
  {
    return this.form.get('email');
  }
  

  formValid():boolean
    {
      let x=this.readerName.value;
      return this.isbn.valid && this.isbn.valid && x!='';
    }
  onClick()
  {
    let x=this.readerName.value;
    console.log(x);
    
  }


  itemUrl='http://localhost:9000/item';
  

  itemData;

  findIsbn()
    {
      this.itemData=null;
      
      this.title.setValue('');
      this.dateAvailable.setValue('');
    
      
      this.service.findValue(this.itemUrl,this.isbn.value).subscribe(
        response =>
        {
          this.itemData=response;
          
          // console.log(data);
          console.log(this.itemData);
          this.title.setValue(this.itemData.w1673657_title );
          this.dateAvailable.setValue(this.itemData.availableDate);       
                
          
        }
        ,error =>
        {
          this.snackBar.openErrorSnackBar(error);
        }
      )
    }

    readerUrl='http://localhost:9000/reader';

    reader;

    findReader()
    {
      this.readerName.setValue('');
          this.email.setValue('');
          
      this.service.findValue(this.readerUrl,this.readerID.value).subscribe(
        response =>
        {
          console.log(response);
          this.reader=response;
          this.readerName.setValue(this.reader.w1673657_fname+' '+this.reader.w1673657_lname);
          this.email.setValue(this.reader.w1673657_email); 
        }
        ,error =>
        {
          this.snackBar.openErrorSnackBar(error);
        }
      )
    }


    addReservation()
    {
      let put=
      {
        isbn:this.isbn.value,
        readerId:this.readerID.value
      }
      this.service.updatePost('http://localhost:9000/reservation/set',put).subscribe(
        response =>
        {
          let msg;
          msg=response;
          if(msg.msg=='updated')
          {
            // alert('Reservation has successfully added');
            this.snackBar.openSnackBar('Reservation has successfully added!')
            this.form.reset();
          }
        }
        ,error =>
        {
          this.snackBar.openErrorSnackBar(error);
        }
      )
    }


}
