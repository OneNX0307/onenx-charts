import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EChartsType} from 'echarts/core';
import {Observable, of, Subscription} from 'rxjs';
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
import {ArrowInfo, Field} from './model';
import {SeriesBuilder} from './series-builder';
import {ChartBuilder} from './chart-builder';

@Component({
  selector: 'smee-wafer-chart',
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
    this.fields$.subscribe(fields => {
      this.drawChart(fields);
    });
  }

  ngOnDestroy(): void {
    this.chart?.dispose();
    this.fieldsSubscription?.unsubscribe();
  }

  private drawChart(fields: Field[]): void {
    let builder = new SeriesBuilder().circle(150);
    builder = this.showNotch ? builder.notch() : builder;

    const series = builder
      .layout(fields.length > 0 ? fields : [])
      .arrows()
      .marks()
      .build();

    this.chart = new ChartBuilder()
      .init(this.domId, this.width, this.height)
      .title()
      .grid()
      .axis(-this.radius, this.radius, this.interval)
      .zoom(-this.radius, this.radius)
      .series(series)
      .build()
      .get();
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
