import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  /*
  form = new FormGroup({
    username : new FormControl("your username", [Validators.required]),
    password : new FormControl("your password", [Validators.required]),
    rememberme : new FormControl(true, [Validators.required])
  })
  */
  public form : FormGroup;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['blah', Validators.required],
      password: [null, Validators.required],
      rememberme: [true],
    })
  }

  OnSubmit(jsonForm) {
    console.log(jsonForm);
  }
}
