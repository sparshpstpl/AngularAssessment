import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Processing:boolean =true;
  ErrMsg       = '';
  Users:any = [];

  constructor(private admin:AdminService){}

  ngOnInit(): void {
    this.fetchAssessments();
  }

  fetchAssessments()
  {
    this.ErrMsg='';
    this.admin.fetchUserList().subscribe((res)=>{
      this.Processing =false;
      if(res)
      {
        this.Users = res;
      }
      else{
         this.ErrMsg='No Users Found.';
      }
    },error=>{
      this.Processing =false;
      this.ErrMsg='Something wrong. Please try again.';
    })
  }
}
