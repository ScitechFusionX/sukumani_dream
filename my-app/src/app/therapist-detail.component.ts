import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Therapist }        from './therapist';
import { TherapistService } from './therapist.service';

@Component({
  selector: 'therapist-detail',
  templateUrl: './therapist-detail.component.html',
  styleUrls: [ './therapist-detail.component.css' ]
})
export class TherapistDetailComponent implements OnInit {
  therapist: Therapist;

  constructor(
    private therapistService: TherapistService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.therapistService.getHero(params.get('id')))
      .subscribe(therapist => this.therapist = therapist);
  }

  save(): void {
    this.therapistService.update(this.therapist)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
