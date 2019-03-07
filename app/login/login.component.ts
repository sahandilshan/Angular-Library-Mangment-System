import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { myValidations } from '../myValidators.validators';
import { MongoServiceService } from '../service/mongo-service.service';
import { SnackbarServiceService } from '../service/snackbar-service.service';

import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, 
  MatSnackBarConfig, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup ;

  

  constructor(private router:Router,private service:MongoServiceService,fb:FormBuilder,private snackbar:MatSnackBar)
  {
    this.form=fb.group(
      {
        username:['',[
          Validators.required,
          myValidations.cannotContainSpaces
        ]
      ],
      password:['', Validators.required]
      });
  }

  ngOnInit() {
    this.service.getAll('http://localhost:9000').subscribe(
      response =>
      {
        console.log(response);
      }
      ,error=>
      {
        this.serverError();
      }
    )
  }

  public usernameError()
  {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 3000;
    
    const snackBar = this.snackbar.open('Invalid username or password', 'Re-enter', config);
  }

  public serverError()
  {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    // config.duration = 3000;
    
    const snackBar = this.snackbar.open('Couldn\'t connect with the server', 'Retry', config);
    snackBar.onAction().subscribe(
      ()=>
      {
        this.service.getAll('http://localhost:9000').subscribe(
      response =>
      {
        console.log(response);
      }
      ,error=>
      {
        this.serverError();
      }
    )
  }
)
  }

  valid=true;

  // public logged=false;
  
  login()
  {
    let credentials={
      username:this.username.value,
      password:this.password.value
    }
    // let =this.getusername();
    // console.log(x);
    this.service.login(credentials).subscribe(
      response =>
      {
        console.log(credentials);
        this.router.navigate(['main-menu']);
        // console.log(data);
        
      }
      ,error =>
      {
        this.valid=false;
        this.usernameError();
      }
    );
  }

  get username():AbstractControl
  {
    return this.form.get('username');
  }

  get password()
  {
    return this.form.get('password');
  }

  
}
