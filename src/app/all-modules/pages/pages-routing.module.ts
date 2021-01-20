import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { AuthGuard } from '../../guard/auth.guard';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {path:'',component:PagesComponent,children:[
    {path:'',component:DashbaordComponent, data:{'title':'Home Page'},canActivate:[AuthGuard]},
    {path:'admin',loadChildren:()=>import("./admin/admin.module").then((m)=>m.AdminModule),data:{'title':'Admin'},canActivateChild:[AuthGuard]}
  ],data:{'title':'Home'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
