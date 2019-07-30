import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',
    component: HomeComponent,
    pathMatch: 'full'},
  { path: 'bird', loadChildren: './bird/bird.module#BirdModule' },
  { path: 'list', loadChildren: './list/list.module#ListModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
