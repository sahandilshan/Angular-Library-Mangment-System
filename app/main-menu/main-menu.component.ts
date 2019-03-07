import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MongoServiceService } from '../service/mongo-service.service';
import { LoginComponent } from '../login/login.component';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private service:MongoServiceService) {
  

   }
  selected = 'home';

  onClick(value) {
    console.log(value);
    this.selected = value;
  }
  
  dropDownArr :number[]=[1,1,1]; // 1= active.need to hide

  ngOnInit() {
    this.service.checkLogin().subscribe(
      response =>
      {
        let data;
        data=response;
        console.log(data);
        
        if(!data.logged)
        {
          this.router.navigate([''],{relativeTo:this.route});
        }
      },
      error =>
      {
        console.log(error.status);
        
        this.router.navigate([''],{relativeTo:this.route});
      }
    )
    
  }

  logout()
  {
    this.service.logout().subscribe();
    this.router.navigate([''],{relativeTo:this.route})
  }

   openNav() {
    document.getElementById("mySidenav").style.width = "260px";
    document.getElementById("main").style.marginLeft = "260px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.getElementById("myOverlay").style.display = "block";
    
}

closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
  document.getElementById("myOverlay").style.display = "none";
}

changePath(value :string)
{
  this.closeNav();
  this.router.navigate([value],{relativeTo:this.route});
}

test()
{
  // console.log("sdasdasd");
  // let dropdown = document.getElementsByClassName("dropdown-btn");
  //     let i;

      
  //     for (i = 0; i < dropdown.length; i++) {
        
  //         // this.classList.toggle("active");
          
  //         let dropdownContent = dropdown[i].nextElementSibling;
  //         console.log(dropdownContent);
          
  //         let styles=getComputedStyle(dropdownContent);
  //         console.log(styles.display);
          
  //         if (styles.display === "block") {
  //           this.dropDownArr[i]=1;
  //           // dropdownContent.style.display = "none";
  //         } else {
  //           this.dropDownArr[i]=0;
  //           // dropdownContent.style.display = "block";
  //         }
  //         console.log(this.dropDownArr);
          
  //       };
   
      }
  test1(id:string)
  {
    switch(id){
      case 'dropdown1':
      {
        document.getElementById('dropdown2').style.display="none";
        document.getElementById('dropdown3').style.display="none";
        break;
      }
      case 'dropdown2':
      {
        document.getElementById('dropdown1').style.display="none";
        document.getElementById('dropdown3').style.display="none";
        break;
      }
      case 'dropdown3':
      {
        document.getElementById('dropdown2').style.display="none";
        document.getElementById('dropdown1').style.display="none";
        break;
      }


    }
    let x=document.getElementById(id);
    console.log(x.style.display);
    
    if(x.style.display=="block")
    {
      x.style.display="none";
    }
    else
    {
      x.style.display="block";
    }

  }
}


