import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../../services';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  // selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  Processing:boolean =true;
  GraphLoading= true;
  ErrMsg='';
  Assessments:any=[];

    // Pie
    public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData: number[] = [800, 500, 100];
    public pieChartType = 'pie';


  constructor(private user:UserService){}
  ngOnInit(): void {
    this.fetchAssessments();  
    
  }
  fetchAssessments()
  {
    this.ErrMsg='';
    this.user.fetchAssessments().subscribe((res)=>{
      this.Processing =false;
      if(res)
      {
        this.Assessments = res;
      }
      else{
         this.ErrMsg='No Assessments Found.';
      }
    },error=>{
      this.Processing =false;
      this.ErrMsg='Something wrong. Please try again.';
    })
  }
  graphErr='';
  fetchGraphData(id='')
  {    
    // this.chart.chart.update();
    this.largeModal.show()
    this.graphErr='';
    this.GraphLoading =true;

    this.user.fetchAssessmentGraph(id).subscribe((res:any)=>{
      this.GraphLoading =false;
      if(res)
      { 
        
        let value:any =[]
        this.pieChartLabels = Object.keys(res.data);
        this.pieChartLabels.forEach(element=>{
          value.push(res.data[element]);
        })
      
      }
      else{
         this.graphErr='No Data for graph.';
      }
    },error=>{
      this.GraphLoading =false;
      this.graphErr='Something wrong. Please try again.';
    })
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
