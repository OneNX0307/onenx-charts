import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Field} from '../../projects/wafer-chart/src/model/field';
import {MetaInfo} from '../../projects/wafer-chart/src/model/meta-info';
import {map} from 'rxjs/operators';
import {MarkInfo} from '../../projects/wafer-chart/src/model/mark-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  fields$: Observable<Field[]> = of([]);
  arrows$: Observable<MetaInfo[]> = of([]);
  marks$: Observable<MarkInfo[]> = of([]);

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fields$ = this.http.get<Field[]>('assets/stub/layout.json');
    this.arrows$ = this.http.get<MetaInfo[]>('assets/stub/arrows.json')
      .pipe(
        map(_ => {
          const times = 20000;
          const waferCount = 25;
          const markCount = 32;
          return Array.from(Array(times).keys()).map(item => {
            const angleStep = Math.PI / 16.0;
            const radius = 150 * 0.8;
            const index = item % (times / waferCount) + 1;
            const positionIndex = item % (times / markCount);
            const info: MetaInfo = {
              lotId: `lot${index}`,
              waferId: `wafer${index}`,
              coordinate2d: {
                x: Math.cos(angleStep * positionIndex) * radius + Math.random() * 10,
                y: Math.sin(angleStep * positionIndex) * radius + Math.random() * 10
              },
              value2d: {
                dx: 10 * Math.random(),
                dy: 10 * Math.random()
              },
              color: 'red'
            };
            return info;
          });
        }),
        map(infos => infos.map(info => {
            const infoH = {...info, offset: {...info.value2d, dy: 0}};
            const infoV = {...info, offset: {...info.value2d, dx: 0}};
            return [infoH, infoV];
          }).reduce((p, n) => p.concat(n))
        ));
    this.marks$ = this.http.get<MarkInfo[]>('assets/stub/marks.json');
  }
}
