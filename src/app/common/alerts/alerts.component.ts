import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  @ViewChild('smallModal') public smallModal: ModalDirective;
  
  DeleteOption:any = false;  
  subscription:any=[];
  constructor(private alert:AlertService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAlert(); 
  }

  getAlert()
  {
    console.log('open the popup')
    let deletePopup = this.alert.DeleteOption.subscribe(data=>{      
       this.DeleteOption = data
       if(data)
       {
        this.smallModal.show();
       }
    })
    this.subscription.push(deletePopup);
  }

  

  confirmDelete()
  {
    console.log("delete the data")
    this.smallModal.hide();
  }
  

}
