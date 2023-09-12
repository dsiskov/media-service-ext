import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { NavComponent } from './layout/nav/nav.component'
import { PageContentComponent } from './layout/page-content/page-content.component'

@NgModule({
  declarations: [AppComponent, NavComponent, PageContentComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
