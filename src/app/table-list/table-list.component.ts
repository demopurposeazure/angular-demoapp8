import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from './../app.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit,AfterViewInit {
  public tableResponseData:any;
  public displayedColumns: string[] = ["package_id","package_type", "package_category", "aggr_id", "completed_date","assigned_to"];
  public headerName = {"package_id": "Package ID","package_type": "Package Type","package_category": "Package Category",
                       "aggr_id": "Agreement ID","completed_date": "Expiration Date","assigned_to": "Assigned To"};
  public dataSource : any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource['paginator'] = this.paginator;
    this.dataSource['sort'] = this.sort;
  }

  constructor(private appService: AppService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.fetchTableData();
  }

  public fetchTableData(){
   const req = {
     userId: JSON.parse(localStorage.getItem('userDetails')).user_id,
     username : JSON.parse(localStorage.getItem('userDetails')).username
   }
   this.spinner.show();
   this.appService.fetchTableData(req).subscribe(res => {
       this.spinner.hide();
       if(res.statusText === 'OK' && res.statusCode === 200){
           this.tableResponseData = res;
           this.dataSource = new MatTableDataSource<any[]>(this.tableResponseData.tableData);
           this.dataSource['paginator'] = this.paginator;
           this.dataSource['sort'] = this.sort;
       }
       
   }, error=> {
       this.spinner.hide();
       this.appService.showNotification('top','right', error.error.err.detail ,'danger');
   });
  }

public doGlobalFilter = (value: string) => {
    this.dataSource['filter'] = value.trim().toLocaleLowerCase();
}

// columnFilter(value,column: string) {
//    this.dataSource.filterPredicate = function(data: any, filterValue: string) {
//      return data.column.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
//   };
// }

}
