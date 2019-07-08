import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BirdComponent } from './bird.component';
const routes: Routes = [
  {path: '',
    component: BirdComponent,
    pathMatch: 'full'},
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BirdComponent],
  entryComponents: [BirdComponent]
})
export class BirdModule {
 static components = {'BirdComponent': BirdComponent}
}