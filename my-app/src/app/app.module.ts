import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { ImageUploadModule }    from 'angular2-image-upload';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';

import { LoginComponent }   from './login.component';

import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';

import { FilePickerModule } from 'angular-file-picker'





@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FilePickerModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,

    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,

    LoginComponent,

  
   

  ],
  providers: [ HeroService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
