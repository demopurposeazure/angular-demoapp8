import { AppService } from './../app.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showError:boolean = false;
  public userResponse=null;
  

  constructor(private appService: AppService,private router: Router,
    private activatedRoute: ActivatedRoute,private spinner:NgxSpinnerService){

  }

  public ngOnInit(){
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      passWord: new FormControl('')
    });
  }

  public loginMethod(){
    console.log(this.loginForm.value);
    this.userResponse = null;
    this.spinner.show();
    this.appService.validateUser(this.loginForm.value).subscribe(res=> {
      console.log(res);
      this.userResponse = res;
      this.spinner.hide();
      if(res.userExists){
        this.showError = false;
        this.appService.userName = res.userName;
        console.log(this.appService.userName);
        this.router.navigate(['/welcome'],{ queryParams: { name: res.userName }});
      } else {
        this.showError = true;
      }
    },error=>{
      this.spinner.hide();
    });
  }

}
