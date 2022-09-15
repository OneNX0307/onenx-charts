import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EChartsType} from 'echarts/core';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {CustomChart} from 'echarts/charts';
import {SeriesBuilder} from './series-builder';
import {ChartBuilder} from './chart-builder';
import {Field} from '../model/field';
import {ArrowInfo} from '../model/arrow-info';
import {ChartInfo} from '../model/chart-info';

@Component({
  selector: 'ngx-wafer-chart',
  template: ` <div [id]="domId"></div> `,
  styles: []
})
export class WaferChartComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: EChartsType | undefined;
  domId = 'chart';

  @Input() width = 600;
  @Input() height = 600;

  @Input() radius = 150;

  @Input() showNotch = true;
  @Input() showAxis = true;
  @Input() showGrid = true;
  @Input() interval = 20;

  @Input() fields$: Observable<Field[]> = of();
  @Input() arrows$: Observable<ArrowInfo[]> = of();

  private fieldsSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
    this.registerComponents();
  }

  ngAfterViewInit(): void {
    forkJoin({
      fields: this.fields$,
      arrows: this.arrows$
    }).subscribe((data: ChartInfo) => this.drawChart(data));
  }

  ngOnDestroy(): void {
    this.chart?.dispose();
    this.fieldsSubscription?.unsubscribe();
  }

  private drawChart(info: ChartInfo): void {
    let builder = new SeriesBuilder().circle(150);
    builder = this.showNotch ? builder.notch() : builder;

    const series = builder
      .layout(info.fields.length > 0 ? info.fields : [])
      .arrows(info.arrows.length > 0 ? info.arrows : [])
      .marks()
      .build();

    this.chart = new ChartBuilder()
      .init(this.domId, this.width, this.height)
      .title()
      .grid()
      .axis(-this.radius, this.radius, this.interval)
      .zoom(-this.radius, this.radius)
      .series(series)
      .build();
  }

  private registerComponents(): void {
    echarts.use([
      TitleComponent,
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      TransformComponent,
      LabelLayout,
      UniversalTransition,
      CanvasRenderer,
      CustomChart,
      LegendComponent,
      TooltipComponent,
      DataZoomComponent,
    ]);
  }

}
