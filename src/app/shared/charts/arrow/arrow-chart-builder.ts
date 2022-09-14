import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {DatasetComponentOption, GridComponentOption, TitleComponentOption} from 'echarts/components';
import {LineSeriesOption} from 'echarts/charts';
import {CustomSeriesOption, ScatterSeriesOption} from 'echarts';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | CustomSeriesOption
  | LineSeriesOption
  | ScatterSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | DatasetComponentOption
  >;

type Series = CustomSeriesOption
  | LineSeriesOption
  | ScatterSeriesOption;

export class ArrowChartBuilder {
  private option: ECOption = {};
  private chart: EChartsType | undefined;

  public init(domId: string): ArrowChartBuilder {
    const dom = document.getElementById(domId);
    if (dom) {
      this.chart = echarts.getInstanceByDom(dom) ??
        echarts.init(dom, undefined);
    }
    return this;
  }

  public withTitle(title: string = '', subTitle: string = ''): ArrowChartBuilder {
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

  public withGrid(grids: GridComponentOption[] = []): ArrowChartBuilder {
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

  public withDataZoom(start: number, end: number): ArrowChartBuilder {
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

  public withAxis(min: number, max: number): ArrowChartBuilder {
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

  public withSeries(series: Series[]): ArrowChartBuilder {
    this.option.series = series;
    return this;
  }

  public build(): ArrowChartBuilder {
    this.chart?.clear();
    this.chart?.setOption(this.option);
    return this;
  }

  public getChart(): EChartsType | undefined {
    return this.chart;
  }
}
