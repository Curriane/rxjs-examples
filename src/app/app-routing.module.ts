import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsExamplesComponent } from './components/rxjs-examples/rxjs-examples.component';

const routes: Routes = [
  { path: '', component: RxjsExamplesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
