import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 public signupForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.InitiateSignupForm();
  }

public InitiateSignupForm(){
  this.signupForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      passWord: new FormControl('',[Validators.required]),
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      fullName : new FormControl(''),
      email: new FormControl('',[Validators.required])
    });
 }

 public submitUser(){
   alert("Sorry !\nPage creation is in progress!");
 }
}
