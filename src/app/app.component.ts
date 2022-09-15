import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ArrowInfo, Field} from '../../projects/wafer-chart/src/lib/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  fields$: Observable<Field[]> = of([]);
  arrows$: Observable<ArrowInfo[]> = of([]);

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fields$ = this.http.get<Field[]>('assets/stub/layout.json');
    this.arrows$ = this.http.get<ArrowInfo[]>('assets/stub/arrows.json');
  }
}
