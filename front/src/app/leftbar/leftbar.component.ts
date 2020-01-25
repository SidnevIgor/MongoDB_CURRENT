import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  genres=['Thriller','Horror','Romance','Travel','Comedy','Documentary'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }
  getGenre(genre:string):string{
    return genre;
  }
  getCategory():string{
    return this.route.snapshot.queryParamMap.get('category');
    //return 'all-categories';
  }
}
