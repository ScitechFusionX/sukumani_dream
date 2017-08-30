import { Component, OnInit, Input } from '@angular/core';

import { User }        from './user';
import { HeroService } from './hero.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
  
  user: User;
 constructor(
    private heroService: HeroService,
  ) {}

    loginAccount(username:string, password:string): void {
      this.heroService.login(username,password).subscribe();
      console.log("got here");
  }
}

