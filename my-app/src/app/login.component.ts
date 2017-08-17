import { Component, OnInit, Input } from '@angular/core';

import { Hero }        from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {



  login(): void {
    //this.heroService.getHeroesExport();
  }
  register(): void {
    //this.heroService.getHeroesExport();
  }



}
