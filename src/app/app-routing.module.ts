import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'login-form', component: LoginFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
