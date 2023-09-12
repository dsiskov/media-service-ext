import { Component } from '@angular/core'
import { ThemeService } from '@core/service/theme.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css'],
})
export class PageContentComponent {
  public darkMode: Observable<boolean>

  constructor(private readonly themeService: ThemeService) {}

  darkMode$ = this.themeService.getDarkTheme()
}
