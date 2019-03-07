import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { myValidations } from 'src/app/myValidators.validators';
import { MongoServiceService } from 'src/app/service/mongo-service.service';
import { SnackbarServiceService } from 'src/app/service/snackbar-service.service';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.css']
})
export class AddReaderComponent implements OnInit {

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
      fname:new FormControl('',Validators.required),
      lname:new FormControl('',Validators.required),
      dob:new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      contactNo:new FormControl('',[
        Validators.required,
        Validators.minLength(10)]
        )
    }
  );

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


  generateId()
  {
    this.service.getAll('http://localhost:9000/generateReaderId').subscribe(
      response =>
      {
        let data:any=response;
        console.log(data);
        this.readerID.setValue(data.id);
      }
      ,error=>
    {
      this.snackbar.openErrorSnackBar(error);
    }
    )
  }
  responseData:any;

  addReader()
  {
    let post={
      readerId:this.readerID.value,
      fname:this.fname.value,
      lname:this.lname.value,
      dob:this.dob.value,
      email:this.email.value,
      contactNo:this.contactNo.value

    };
    console.log(post);

    
    
    this.service.createPost('http://localhost:9000/reader/add',post).subscribe(
      response =>
      {
        console.log(response);
        // let data=response;
        this.responseData=response;
        if(this.responseData.msg=='added')
        {
          // alert('Reader has been successfully added');
          this.snackbar.openSnackBar('Reader has been successfully added');
          this.form.reset();

        }
        
      }
      ,error=>
      {
        this.snackbar.openErrorSnackBar(error);
      }
    )
  }

}
