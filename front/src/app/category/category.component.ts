import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  searchCategory: string;
  searchGenre: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParamMap.subscribe((params)=>{
      this.searchCategory = params.get('category');
      this.searchGenre = params.get('genre');
    });
  }
  isLoggedIn(){
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');
    if(!token) return false;
    else{
      let isExpired = jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
  }
}
