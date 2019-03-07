import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AddItemComponent } from './mange-Items/add-item/add-item.component';
import { RemoveItemComponent } from './mange-Items/remove-item/remove-item.component';
import { HomeComponent } from './home/home.component';
import { DiplayItemsComponent } from './diplay-items/diplay-items.component';
import { BorrowItemsComponent } from './borrow-items/borrow-items.component';
import { ReturnItemsComponent } from './return-items/return-items.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { UpdateItemComponent } from './mange-Items/update-item/update-item.component';
import { AddReservationComponent } from './mange-reservation/add-reservation/add-reservation.component';
import { RemoveReservationComponent } from './mange-reservation/remove-reservation/remove-reservation.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { AddReaderComponent } from './manage-readers/add-reader/add-reader.component';
import { UpdateReaderComponent } from './manage-readers/update-reader/update-reader.component';
import { RemoveReaderComponent } from './manage-readers/remove-reader/remove-reader.component';
import { MongoServiceService } from './service/mongo-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { SnackbarServiceService } from './service/snackbar-service.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    AddItemComponent,
    RemoveItemComponent,
    HomeComponent,
    DiplayItemsComponent,
    BorrowItemsComponent,
    ReturnItemsComponent,
    GenerateReportComponent,
    TestComponent,
    UpdateItemComponent,
    AddReservationComponent,
    RemoveReservationComponent,
    ViewItemComponent,
    AddReaderComponent,
    UpdateReaderComponent,
    RemoveReaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:LoginComponent},
      {
        path:'main-menu',
        component: MainMenuComponent,
        children:[
          {path:'',component:HomeComponent},
          {path:'home',component:HomeComponent},
          {path:'add-item',component:AddItemComponent},
          {path:'remove-item',component:RemoveItemComponent},
          {path:'borrow-item',component:BorrowItemsComponent},
          {path:'return-item',component:ReturnItemsComponent},
          {path:'generate-report',component:GenerateReportComponent},
          {path:'display-items',component:DiplayItemsComponent},
          {path:'update-item',component:UpdateItemComponent},
          {path:'add-reservation',component:AddReservationComponent},
          {path:'remove-reservation',component:RemoveReservationComponent},
          {path:'view-item/:type/:id',component:ViewItemComponent},
          {path:'add-reader',component:AddReaderComponent},
          {path:'update-reader',component:UpdateReaderComponent},
          {path:'remove-reader',component:RemoveReaderComponent}
        ]
      },
      
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule, 
  MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule
  ],
  providers: [MongoServiceService,SnackbarServiceService],
  bootstrap: [AppComponent]
   
})
export class AppModule { }
