import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
  bootstrap: [],
})
export class AppRoutingModule {}
