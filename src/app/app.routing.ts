import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from '../error/404.component';
import { P500Component } from '../error/500.component';

export const routes: Routes = [
  {path:'auth',loadChildren:()=>import('./all-modules/auth/auth.module').then((m)=>m.AuthModule)},
  {path:'',component:DefaultLayoutComponent,loadChildren:()=>import('./all-modules/pages/pages.module').then((m)=>m.PagesModule)},  
  {path: 'dashboard',redirectTo: '/',pathMatch: 'full',},
  // error pages routing
  {path: '404',component: P404Component,data: {title: 'Page 404'}},
  {path: '500',component: P500Component,data: {title: 'Page 500'}},
  // wild card routing
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
