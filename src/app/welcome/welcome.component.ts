import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { multi,gauzesingle } from './data';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public name:any;
  single: any[];
  multi: any[];
  gauzesingle: any[];

  view: any[] = [600, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  showDataLabel = true;

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#ff3399','#ff33ff']
  // };
  constructor(private activatedRoute:ActivatedRoute,private appService:AppService,
              private spinner:NgxSpinnerService) {
      //  Object.assign(this, { multi });
      //  Object.assign(this,{ gauzesingle });
   }

  ngOnInit() {
    this.name = this.activatedRoute.queryParams['value'].name;
    console.log(this.activatedRoute);
    this.getGraphData();
  }

public getGraphData(){
  // this.spinner.show();
  // this.appService.getGraphData().subscribe(res=>{
  //   this.spinner.hide();
  //   console.log(res);
  //   let multi = res['multi'];
  //   let gauzesingle = res['gauzesingle'];
  //    Object.assign(this, { multi });
  //    Object.assign(this,{ gauzesingle });
  // },err=>{
  //   this.spinner.hide();
  // });
}
onSelect(event) {
    console.log(event);
}

onActivate(data): void {
    console.log('Activate', data);
  }

  onDeactivate(data): void {
    console.log('Deactivate', data);
  }

}
