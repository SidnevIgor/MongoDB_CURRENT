import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  genre: string;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(){

  }
  getCategory(category:string):string{
    return category;
  }
  getGenre():string{
    return 'allgenres';
  }
}
