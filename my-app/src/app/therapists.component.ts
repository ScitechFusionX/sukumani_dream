import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Therapist }                from './therapist';
import {TherapistService }         from './therapist.service';

@Component({
  selector: 'my-therapists',
  templateUrl: './therapists.component.html',
  styleUrls: [ './therapists.component.css' ]
})
export class TherapistsComponent implements OnInit {
  therapists: Therapist[];
  selectedTherapist:Therapist;

  constructor(
    private therapistService: TherapistService,
    private router: Router) { }

  getHeroes(): void {
    this.therapistService
        .getHeroes()
        .then(therapists => this.therapists = therapists);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.therapistService.create(name)
      .then(therapist => {
        this.therapists.push(therapist);
        this.selectedTherapist = null;
      });
  }

  delete(therapist: Therapist): void {
    this.therapistService
        .delete(therapist._id)
        .then(() => {
          this.therapists = this.therapists.filter(h => h !== therapist);
          if (this.selectedTherapist === therapist) { this.selectedTherapist = null; }
        });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(therapist: Therapist): void {
    this.selectedTherapist = therapist;
  }

  gotoDetail(): void {
    this.router.navigate(['/therapists/detail/', this.selectedTherapist._id]);
  }
}
