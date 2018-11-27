import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestComponent } from './rest/rest.component';
import { PostService } from './services/post.service';
import { WithEbeanComponent } from './withEbean/with-ebean/with-ebean.component';
import { EbeanServiceService } from './services/ebean-service.service';
import { HttpClientModule } from '@angular/common/http';
import { WithMongoComponent } from './with-mongo/with-mongo.component';
import { WithMongoService } from './services/with-mongo.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    RestComponent,
    WithEbeanComponent,
    WithMongoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    PostService,
    EbeanServiceService,
    WithMongoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
