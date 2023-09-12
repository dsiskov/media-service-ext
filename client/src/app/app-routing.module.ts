import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PageContentComponent } from './layout/page-content/page-content.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PageContentComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@modules/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [],
})
export class AppRoutingModule {}
