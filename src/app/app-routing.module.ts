import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "list"},
  { path: 'createService', component: CreateServiceComponent },
  { path: 'list', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }