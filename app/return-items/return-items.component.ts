import { Component, OnInit } from '@angular/core';
import { myValidations } from '../myValidators.validators';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MongoServiceService } from '../service/mongo-service.service';
import { SnackbarServiceService } from '../service/snackbar-service.service';

@Component({
  selector: 'app-return-items',
  templateUrl: './return-items.component.html',
  styleUrls: ['./return-items.component.css']
})
export class ReturnItemsComponent implements OnInit {

  constructor(private service:MongoServiceService,private snackbar:SnackbarServiceService) { }

  ngOnInit() {
  }

  form=new FormGroup(
    {
      isbn:new FormControl('',[
        Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
      myValidations.cannotContainSpaces]),
    title: new FormControl(''),

    readerID: new FormControl(''),
    readerName:new FormControl(''),
    
    fine :new FormControl('')

    });
    
    get isbn()
    {
      return this.form.get('isbn');
    }

    get title()
    {
      return this.form.get('title');
    }
    
    get readerID()
    {
      return this.form.get('readerID');
    }
    get readerName()
    {
      return this.form.get('readerName');
    }
    get fine()
    {
      return this.form.get('fine');
    }
    

    formValid():boolean
    {
      let x=this.readerID.value;
      return this.isbn.valid && x!='';
    }

    


    itemUrl='http://localhost:9000/borrow/item';

    allItemData:any;
    

    findDetails()
    {
      this.title.setValue('');
      this.title.setValue('');
      this.readerID.setValue('');
      this.readerName.setValue('');
      this.fine.setValue('');

      let put={
        isbn :this.isbn.value
      }

      this.service.findValue(this.itemUrl,this.isbn.value).subscribe(
        response =>
        {
          this.allItemData=response;
          
          console.log(this.allItemData);

          this.title.setValue(this.allItemData.w1673657_title );
          this.readerID.setValue(this.allItemData.w1673657_reader.id);
          this.readerName.setValue(this.allItemData.w1673657_reader.name);
          this.fine.setValue('Rs:'+this.allItemData.fine); 
          
        },
        error =>
        {
          this.snackbar.openErrorSnackBar(error);
          
        }
      )
    }


    url='http://localhost:9000/borrow/remove';
    returnItem()
    {
      let put={
        isbn :this.isbn.value
      }
      return this.service.updatePost(this.url,put).subscribe(
        response =>
        {
          let data;
          data=response;
          if(data.msg=='removed')
            // alert('Borrowed details were successfully removed');
            this.snackbar.openSnackBar('Borrowed details were successfully removed');
          console.log(response);
          this.form.reset();
        }
        ,error =>
        {
          this.snackbar.openErrorSnackBar(error);
        }
      )
    }

}
