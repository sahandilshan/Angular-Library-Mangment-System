import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { SnackbarServiceService } from './snackbar-service.service';




@Injectable({
  providedIn: 'root'
})
export class MongoServiceService {

  constructor(private http:HttpClient,private snackbar:SnackbarServiceService) { }

  
  
  

  checkLogin()
  {
    return this.http.get('http://localhost:9000/login/check');

  }
  

  login(credentials)
  {
    return this.http.post('http://localhost:9000/login',credentials);
  }

  logout()
  {
    return this.http.get('http://localhost:9000/logout');
  }

  createPost(url,post)
  {
    return this.http.post(url,post).pipe(
      catchError(this.handdleErrors)
    );

  }

  getAll(url:string)
  {
    return this.http.get(url).pipe(
      catchError(this.handdleErrors)
    );
  }

  updatePost(url:string,post)
  {
    return this.http.put(url,post).pipe(
      catchError(this.handdleErrors)
    );
  }

  deletePost(url:string,id:String)
  {
    return this.http.delete(url+'/'+id).pipe(
      catchError(this.handdleErrors)
    );
  }


  findValue(url:String,id:string)
  {
    return this.http.get(url+'/'+id).pipe(
      catchError(this.handdleErrors))
  }



  


  private handdleErrors(response:Response)
  {
    console.log(response);
    
    
    if(response.status==500)
    {
      alert ("An problem occured with the server");
      return throwError("Server error");
    }
    else if(response.status==404)
    {
      return throwError(404);
    }
    else if(response.status==400)
    {
      // alert('Please fill all details');
      return throwError(400);
    }
    else if(response.status==403)
    {
      // alert('Item has already borrowed');
      return throwError(response);
    }

    else if(response.status==999)
    {
      // alert('Duplicate ISBN number');
      return throwError(999);
    }
    else if(response.status==998)
    {
      // alert('Can\'t add more items');
      return throwError(998);
    }
    else if(response.status==997)
    {
      // alert('Item has not borrowed');
      return throwError(997);
    }
    else if(response.status==995)
    {
      // alert('Isbn number has been changed');
      return throwError(995);
    }
    else if(response.status==994)
    {
      // alert('No Item found');
      return throwError(994);
    }
    else if(response.status==993)
    {
      // alert('Reader id or isbn has been changed');
      return throwError(993);
    }
    else if(response.status==992)
    {
      // alert('No need to make a reservation, item is available to be borrowed');
      return throwError(992);
    }
    else if(response.status==991)
    {
      // alert('Invalid username or password');
      return throwError(991);
    }
    else if(response.status==990)
    {
      // alert('can not remove this reader, he has a book/dvd to return');
      return throwError(990);
    }
    else if(response.status==889)
    {
      // alert('Can't borrow,there's an reservation for this item');
      return throwError(889);
    }
    else if(888)
    {
      return throwError(888);
    }
    else
    {
      // alert('Error');
      return throwError(1000);
    }

    

  }
}
