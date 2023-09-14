import { Component, OnInit } from '@angular/core'
import { ApiService } from '@core/service/api.service'
import { Observable, map } from 'rxjs'
import { IHealth } from '@lib/interfaces'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}
  serverValue$: Observable<string | undefined>

  ngOnInit(): void {
    this.serverValue$ = this.apiService.get<IHealth>('health/ready').pipe(
      map((data) => {
        if (data && data !== undefined) {
          return data.status
        } else {
          console.error('Invalid API response:', data)
          return undefined
        }
      }),
    )
  }
}
