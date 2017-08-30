import { Component, OnInit, Input } from '@angular/core';
import {saveAs as importedSaveAs} from "file-saver";

import { Hero }        from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(-4));
  }
  
  export(): void {
    this.heroService.getHeroesExport().subscribe(blob => {
            importedSaveAs(blob, "data.xlsx");
        })
  }
}
