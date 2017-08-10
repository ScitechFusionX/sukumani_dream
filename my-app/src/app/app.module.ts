import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';

import { TherapistsComponent }      from './therapists.component';
import { TherapistDetailComponent }  from './therapist-detail.component';
import { TherapistService }          from './therapist.service';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,

    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,

    TherapistDetailComponent,
    TherapistsComponent,
   

  ],
  providers: [ HeroService, TherapistService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
