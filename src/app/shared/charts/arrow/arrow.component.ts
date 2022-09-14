import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  GridComponent
} from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {ArrowChartBuilder} from './arrow-chart-builder';
import {EChartsType} from 'echarts/core';
import {ChartSeriesBuilder} from './chart-series-builder';


@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.less']
})
export class ArrowComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: EChartsType | undefined;

  constructor() { }

  ngOnInit(): void {
    this.register();
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnDestroy(): void {
    this.chart?.dispose();
  }

  private draw(): void {
    const series = new ChartSeriesBuilder()
      .withWaferCircle(150)
      // .withWaferNortch()
      // .withFieldLayout()
      // .withArrows()
      .build();

    this.chart = new ArrowChartBuilder()
      .init('chart')
      .withTitle()
      .withGrid()
      .withAxis(-160, 160)
      .withDataZoom(-160, 160)
      .withSeries(series)
      .build()
      .getChart();
  }

  private register(): void {
    // 注册必须的组件
    echarts.use([
      TitleComponent,
      GridComponent,
      LegendComponent,
      DataZoomComponent,
      LabelLayout,
      CanvasRenderer
    ]);

  }

}
