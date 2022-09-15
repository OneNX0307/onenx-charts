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
import {Field} from './model';
import {SeriesBuilder} from './series-builder';
import {ChartBuilder} from './chart-builder';

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
  @Input() fields$: Observable<Field[]> = of([]);

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
    const series = new SeriesBuilder()
      .withWaferCircle(150)
      .withWaferNotch()
      .withFieldLayout(fields.length > 0 ? fields : [])
      .withArrows()
      .withMarks()
      .build();

    this.chart = new ChartBuilder()
      .init(this.domId, this.width, this.height)
      .withTitle()
      .withGrid()
      .withAxis(-150, 150)
      .withDataZoom(-150, 150)
      .withSeries(series)
      .build()
      .getChart();
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
      DataZoomComponent
    ]);
  }

}
