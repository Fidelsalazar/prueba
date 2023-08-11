import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { CategoryComponent } from './modules/category/pages/category.component';
//Modules

const routes:Routes=[
    {path:'', redirectTo:'category', pathMatch:'full'},
    {path:'category', component:CategoryComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}

export const routingComponents = [
  CategoryComponent
]