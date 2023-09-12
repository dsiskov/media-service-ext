import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode: BehaviorSubject<boolean>

  constructor() {
    this.darkMode = new BehaviorSubject<boolean>(
      localStorage.getItem('darkMode') === 'true',
    )
  }

  setDarkTheme(darkMode: boolean) {
    this.darkMode.next(darkMode)
    localStorage.setItem('darkMode', this.darkMode.value.toString())
  }

  getDarkTheme(): Observable<boolean> {
    return this.darkMode
  }
}
