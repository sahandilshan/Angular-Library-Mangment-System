import { Component, OnInit } from '@angular/core';
import { MongoServiceService } from '../service/mongo-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-diplay-items',
  templateUrl: './diplay-items.component.html',
  styleUrls: ['./diplay-items.component.css']
})
export class DiplayItemsComponent implements OnInit {

  constructor(private service:MongoServiceService) { }

  isFind=false;

  items;

  itemsbyTitle=null;


  red="./assets/red.jpg";
  green="./assets/green.svg";

  ngOnInit() {
    this.isFind=false;
    this.service.getAll('http://localhost:9000').subscribe(
      response =>
      {
        console.log(response);
        this.items=response;
        
      }
    )
  }

  form=new FormGroup(
    {
      title:new FormControl('')
    }
  )

  get title()
  {
    return this.form.get('title');
  }

  findTitle()
  {
    this.itemsbyTitle=null;
    this.isFind=true;
    this.service.getAll('http://localhost:9000/items/'+this.title.value).subscribe(
      response =>
      {
          this.itemsbyTitle=response;
          console.log(this.itemsbyTitle);
          
      }
    )
  }

}
