import {Component,OnInit} from '@angular/core';
import { AuthService,DataService } from '../../services';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  userDetail:any={};
  userRole='';

  constructor(private auth:AuthService,private data:DataService){
    
  }
  ngOnInit(): void {
    // check login user detail
    this.data.userDetail.subscribe(data=>{
      if(data)
      {
        this.userDetail = data;
        this.userRole =this.userDetail.role;
        this.roleBasedNavigation();
      }
      else
      {
        this.fetchLoginUserDetail();
        
      }
    })
    
  }

  fetchLoginUserDetail()
  {
    // fetch user data from serve using token
    let  userInfo:any = localStorage.getItem('loggedinUser');
    if(userInfo)
    {
      userInfo = JSON.parse(userInfo);
      let role = userInfo?.role;
      this.data.setUserDetail(userInfo)
    }
  }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout()
  {
    this.auth.logout();
  }
  
  roleBasedNavigation(role='')
  {
    
    if(this.userRole=='Admin')
    {
      this.navItems =[
                      {name: 'Dashboard',url: '/dashboard',icon: 'icon-speedometer'},
                      {'title':true,name: 'Admin Section'},
                      {name: 'Users',url: '/admin/users-list', icon: 'icon-users'}]
    }
  }
  ngDestroy()
  {
    this.data.userDetail.unsubscribe();
  }
  
}
