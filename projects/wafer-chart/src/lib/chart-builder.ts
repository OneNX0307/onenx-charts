import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {GridComponentOption} from 'echarts/components';
import {ECOption, Series} from './model';

export class ChartBuilder {
  private option: ECOption = {};
  private chart: EChartsType | undefined;

  public init(domId: string, width: number, height: number): ChartBuilder {
    const dom = document.getElementById(domId);
    if (dom) {
      this.chart = echarts.getInstanceByDom(dom) ??
        echarts.init(dom, undefined, {width, height});
    }
    return this;
  }

  public withTitle(title: string = '', subTitle: string = ''): ChartBuilder {
    this.option.title = {
      text: title,
      subtext: subTitle,
      left: 'center',
      textStyle: {
        fontSize: 18
      }
    };
    return this;
  }

  public withGrid(grids: GridComponentOption[] = []): ChartBuilder {
    this.option.grid = grids.length > 0 ? grids : [
      {
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '10%'
      }
    ];
    return this;
  }

  public withDataZoom(start: number, end: number): ChartBuilder {
    this.option.dataZoom = [
      {
        type: 'inside',
        filterMode: 'none',
        xAxisIndex: 0,
        rangeMode: ['value', 'value'],
        startValue: start,
        endValue: end
      },
      {
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: 0,
        rangeMode: ['value', 'value'],
        startValue: start,
        endValue: end
      }
    ];
    return this;
  }

  public withAxis(min: number, max: number): ChartBuilder {
    this.option.xAxis = [
      {
        show: true,
        min,
        max
      }
    ];
    this.option.yAxis = [
      {
        show: true,
        min,
        max
      }
    ];
    return this;
  }

  public withSeries(series: Series[]): ChartBuilder {
    this.option.series = series;
    return this;
  }

  public build(): ChartBuilder {
    this.chart?.clear();
    this.chart?.setOption(this.option);
    return this;
  }

  public getChart(): EChartsType | undefined {
    return this.chart;
  }
}
