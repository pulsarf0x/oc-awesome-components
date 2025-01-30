import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from "../shared/shared.module";
import {ComplexFormComponent} from "./components/complex-form/complex-form.component";

const routes: Routes = [
  { path: '', component: ComplexFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplexFormRoutingModule { }
