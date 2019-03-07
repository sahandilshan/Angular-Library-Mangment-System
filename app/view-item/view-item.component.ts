import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MongoServiceService } from '../service/mongo-service.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  constructor(private route:ActivatedRoute,private service:MongoServiceService) { }

  isbn:string;
  type:string;

  item;

  itemUrl='http://localhost:9000/item';

  ngOnInit() {
    this.route.paramMap.subscribe(
      params =>
      {
        console.log(params);
        this.isbn=params.get('id');
        this.type=params.get('type');
        this.service.findValue(this.itemUrl,this.isbn).subscribe(
          response =>
          {
            this.item=response;
            console.log(this.item);
          }
        )
      }
    )
  }

}
