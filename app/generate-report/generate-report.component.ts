import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MongoServiceService } from '../service/mongo-service.service';
import { SnackbarServiceService } from '../service/snackbar-service.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  constructor(private service:MongoServiceService,private snackbar:SnackbarServiceService) { }

  ngOnInit() {
    this.service.getAll('http://localhost:9000/generateReport').subscribe(
      response =>
      {
        this.overDueItems=response;
        console.log(this.overDueItems);
        
      }
      ,error=>
      {
        this.snackbar.openErrorSnackBar(error);
      }
    )
    
  }

  isVisible=false;

  generateReport()
  {

    this.isVisible=true;
    console.log(this.isVisible);
    
  }

  overDueItems=null;
  red="./assets/red.jpg";
  green="./assets/green.png";

}
