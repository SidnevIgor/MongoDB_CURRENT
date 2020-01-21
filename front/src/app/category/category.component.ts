import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  searchCategory: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe((params)=>{
      this.searchCategory = params.get('name');
    });
  }
}
