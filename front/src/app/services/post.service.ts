import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class PostService {
  constructor(private http:Http) { }
  getPosts(url:string){
    return this.http.get(url);
  }
  addPost(title: HTMLInputElement, url: string){
    let newItem = {name: title.value};
    return this.http.post(url,JSON.stringify(newItem), this.getOptions());
  }
  updatePost(post, url: string){
    let newObj = {
      "name": "updated genre"
    };
    return this.http.put(url+'/'+post._id,newObj,this.getOptions());
  }
  deletePost(post, url: string){
    return this.http.delete(url+'/'+post._id, this.getOptions());
  }
  getOptions(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    let options = new RequestOptions({headers: headers});
    return options;
  }
}
