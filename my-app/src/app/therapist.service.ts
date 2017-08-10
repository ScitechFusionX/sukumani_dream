import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Therapist } from './therapist';

@Injectable()
export class TherapistService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'api/therapists';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Therapist[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Therapist[])
               .catch(this.handleError);
  }


  getHero(id: string): Promise<Therapist> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Therapist)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Therapist> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Therapist)
      .catch(this.handleError);
  }

  update(hero: Therapist): Promise<Therapist> {
    const url = `${this.heroesUrl}/${hero._id}`;
    return this.http
      .put(url, hero)
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

