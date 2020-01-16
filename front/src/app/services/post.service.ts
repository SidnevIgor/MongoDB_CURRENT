//Standard libraries
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions, Headers } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/catch';
//Error services
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable()
export class PostService {
  constructor(private http:Http) { }
  getPosts(url:string){
    return this.http.get(url)
    .catch((error:Response)=>{
      return this.handleErrors(error);
    });
  }
  addPost(newItem: Object, url: string){
    return this.http.post(url,JSON.stringify(newItem), this.getOptions())
    .catch((error:Response)=>{
      return this.handleErrors(error);
    });
  }
  updatePost(post, url: string){
    let newObj = {
      "name": "updated genre"
    };
    return this.http.put(url+'/'+post._id,newObj,this.getOptions())
    .catch((error:Response)=>{
      return this.handleErrors(error);
    });
  }
  deletePost(post, url: string){
    return this.http.delete(url+'/'+post._id, this.getOptions())
    .catch((error:Response)=>{
      return this.handleErrors(error);
    });
  }
  getOptions(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    let options = new RequestOptions({headers: headers});
    return options;
  }
  handleErrors(error:Response){
    console.log(error);
    if(error.status==400) return Observable.throw(new BadRequestError());
    if(error.status==404) return Observable.throw(new NotFoundError());
    return Observable.throw(new AppError(error.json()));
  }
}
