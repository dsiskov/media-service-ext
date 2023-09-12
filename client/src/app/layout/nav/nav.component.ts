import { Component, OnInit } from '@angular/core'
import { ThemeService } from '@core/service/theme.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private readonly themeService: ThemeService) {}

  public darkMode$: Observable<boolean>
  profilePopupOpen = false

  ngOnInit() {
    this.darkMode$ = this.themeService.getDarkTheme()
  }

  toggleProfileOpen() {
    this.profilePopupOpen = !this.profilePopupOpen
  }

  toggleDarkMode(checked: boolean) {
    this.themeService.setDarkTheme(checked)
  }
}
