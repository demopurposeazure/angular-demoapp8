import { AppService } from './../app.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showError:boolean = false;
  public userResponse=null;
  

  constructor(private appService: AppService,private router: Router,
    private activatedRoute: ActivatedRoute,private spinner:NgxSpinnerService){
    if(localStorage.getItem('userDetails')){
       this.router.navigate(['/welcome'],{ queryParams: { name: localStorage.getItem('name') }});
    } else {
       //localStorage.removeItem('name');
       localStorage.removeItem('userDetails');
    }
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
        //localStorage.setItem('name',this.appService.userName);
        localStorage.setItem('userDetails',JSON.stringify(res.userDetails));
      } else {
        this.showError = true;
        this.appService.showNotification('top','right',"User doesn't exist - Please enter valid Username & Password.",'danger');
      }
    },error=>{
      this.spinner.hide();
      this.appService.showNotification('top','right',error,'danger');
    });
  }

  // showNotification(from, align){
  //     const type = ['','info','success','warning','danger'];

  //     const color = Math.floor((Math.random() * 4) + 1);

  //     $.notify({
  //         icon: "notifications",
  //         message: "User doesn't exist - Please enter valid Username & Password."

  //     },{
  //         type: type[color],
  //         timer: 4000,
  //         placement: {
  //             from: from,
  //             align: align
  //         },
  //         template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
  //           '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
  //           '<i class="material-icons" data-notify="icon">notifications</i> ' +
  //           '<span data-notify="title">{1}</span> ' +
  //           '<span data-notify="message">{2}</span>' +
  //           '<div class="progress" data-notify="progressbar">' +
  //             '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  //           '</div>' +
  //           '<a href="{3}" target="{4}" data-notify="url"></a>' +
  //         '</div>'
  //     });
  // }

}
