import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  genre: string;
  categories = ['New','Classics','Shorties','Nomination','Series','Cartoons'];
  constructor(private route:ActivatedRoute, private auth: AuthService) { }

  ngOnInit(){
  }
  getCategory(category:string):string{
    return category;
  }
  getGenre():string{
    this.genre = this.route.snapshot.queryParamMap.get('genre');
    return this.genre;
  }
}
