import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent{
  genres: any[];
  constructor(http:Http){
    http.get('http://localhost:3000/api/genres')
    .subscribe(responce=>{
      this.genres = responce.json();
      console.log(this.genres);
    });
  }
}
