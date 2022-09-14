import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  GridComponent,
  TooltipComponent,
  TransformComponent, DatasetComponent
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {ArrowChartBuilder} from './arrow-chart-builder';
import {EChartsType} from 'echarts/core';
import {ChartSeriesBuilder} from './chart-series-builder';
import {CustomChart} from 'echarts/charts';
import {Field} from '../model';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.less']
})
export class ArrowComponent implements OnInit, AfterViewInit, OnDestroy {

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
      const series = new ChartSeriesBuilder()
        .withWaferCircle(150)
        .withWaferNotch()
        .withFieldLayout(fields.length > 0 ? fields : [])
        .withArrows()
        .withMarks()
        .build();

      this.chart = new ArrowChartBuilder()
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
