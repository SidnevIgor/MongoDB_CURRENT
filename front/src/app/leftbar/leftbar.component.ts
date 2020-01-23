import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  genres=['Thriller','Horror','Romance','Travel','Comedy','Documentary'];
  
  constructor() { }

  ngOnInit() {
  }
  getGenre(genre:string):string{
    return genre;
  }
  getCategory():string{
    return 'all-categories';
  }
}
