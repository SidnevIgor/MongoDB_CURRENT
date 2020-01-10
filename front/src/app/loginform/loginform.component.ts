import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent{
  form = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)
    ])
  });
}
