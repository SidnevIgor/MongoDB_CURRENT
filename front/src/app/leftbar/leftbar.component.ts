import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

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
