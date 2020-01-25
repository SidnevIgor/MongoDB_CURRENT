import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  searchCategory: string;
  searchGenre: string;
  constructor(private route: ActivatedRoute, private auth: AuthService){
  }
  ngOnInit(){
    this.route.queryParamMap.subscribe((params)=>{
      this.searchCategory = params.get('category');
      this.searchGenre = params.get('genre');
    });
  }
}
