import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { AppRoutingModule } from './app-routing.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
