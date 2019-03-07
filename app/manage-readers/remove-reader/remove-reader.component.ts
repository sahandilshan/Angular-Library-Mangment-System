import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { myValidations } from 'src/app/myValidators.validators';
import { MongoServiceService } from 'src/app/service/mongo-service.service';
import { SnackbarServiceService } from 'src/app/service/snackbar-service.service';

@Component({
  selector: 'app-remove-reader',
  templateUrl: './remove-reader.component.html',
  styleUrls: ['./remove-reader.component.css']
})
export class RemoveReaderComponent implements OnInit {

  constructor(private service:MongoServiceService,private snackbar:SnackbarServiceService) { }

  ngOnInit() {
  }

  form=new FormGroup(
    {
      readerID: new FormControl('',[
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        myValidations.cannotContainSpaces]),
      fname:new FormControl(''),
      lname:new FormControl(''),
      dob:new FormControl(''),
      email: new FormControl(''),
      contactNo:new FormControl('')
    }
  );

  found=false;

  get readerID()
  {
    return this.form.get('readerID');
  }
  get fname()
  {
    return this.form.get('fname');
  }
  get lname()
  {
    return this.form.get('lname');
  }
  get dob()
  {
    return this.form.get('dob');
  }
  get email()
  {
    return this.form.get('email');
  }
  get contactNo()
  {
    return this.form.get('contactNo');
  }

  validForm():boolean
  {
    let x=this.lname.value;
    return this.readerID.valid && x!='';
  }


  reader;
  readerUrl='http://localhost:9000/reader';

  findReader() {
    this.found=false;
    let temp=this.readerID.value;
    this.form.reset();
    this.readerID.setValue(temp);

    this.service.findValue(this.readerUrl, this.readerID.value).subscribe(
      response => {
        console.log(response);
        this.reader = response;
        this.fname.setValue(this.reader.w1673657_fname);
        this.lname.setValue(this.reader.w1673657_lname);
        this.email.setValue(this.reader.w1673657_email);
        this.contactNo.setValue(this.reader.w1673657_mobileNumber);
        let year=this.reader.w1673657_dob.year;
        let month=this.reader.w1673657_dob.month;
        let day=this.reader.w1673657_dob.day;

        let date="";
        date+=year+"-";
        if(month<10)
            date+="0"+month;
        else
            date+=month;

        if(day<10)
            date+="-0"+day;
        else
            date+="-"+day;

        console.log(date);
        
        this.dob.setValue(date);

        this.found=true;


      }
      ,error=>
      {
        this.snackbar.openErrorSnackBar(error);
      }
    )
  }

  clear()
  {
    this.form.reset();
    this.found=false;
  }

  removeReader()
  {
    if(confirm('are you sure you want to remove this item, this action can\'t be undo'))
    this.service.deletePost(this.readerUrl,this.reader.id).subscribe(
      response =>
      {
        let data;
        data=response;

        if(data.msg=='removed')
          // alert('Reader has been successfully removed');
          this.snackbar.openSnackBar('Reader has been successfully removed');
        this.clear();
      }
      ,error=>
      {
        this.snackbar.openErrorSnackBar(error);
      }
    )
  }

  


}
