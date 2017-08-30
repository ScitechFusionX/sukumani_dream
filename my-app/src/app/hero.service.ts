import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Router }            from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Rx';

import { Hero } from './hero';
import { User } from './user';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'api/heroes';  // URL to web api
  private loginUrl = 'api/login';
  private uploadUrl = 'api/upload';

  constructor(
    private http: Http,
    private router: Router
    ){ }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError);
  }
  
  sendPic(fileurl:string, hero:Hero): Promise<Hero> {
    fileurl['id'] = hero._id;
    let data = JSON.stringify(fileurl)
    console.log(data)
    const url = `${this.uploadUrl}/${hero._id}`;
    return this.http
      .put(url,data,  {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  
  
  getHeroesExport(): Observable<any>{
    let options = new RequestOptions({responseType: ResponseContentType.Blob })
    return this.http.get('/api/export', options)
          .map((res) => res.blob())
          .catch(this.handleError);
               
  }

  login(username:string, password:string):  Observable<boolean>{
  
    let data = {"username":username, "password":password}
     console.log(data)
    return this.http
      .post(this.loginUrl, JSON.stringify(data), {headers: this.headers})
      .do(res => {
        if(res.status === 200) 
          this.router.navigate(['/dashboard'])
     })
      .map(res => res.json())
      .catch(this.handleError)
  }


  getHero(id: string): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }



  update(hero: Hero): Promise<Hero> {
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

