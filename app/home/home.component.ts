import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeData } from '@angular/core/src/view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private elRef:ElementRef) {
    this.carousel();
    
   }

  ngOnInit() {
    
    
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeouts);
    
  }

  changePath(value :string)
{
  
  this.router.navigate([value],{relativeTo:this.route.parent});
}


  myIndex = 0;

  timeouts;


 carousel() {
    console.log(this.myIndex++);
    if (this.myIndex > 6) {this.myIndex = 1}
    
    this.timeouts=setTimeout(() => {
      this.carousel();
    }, 6000);


    
    
    
   
}





}
