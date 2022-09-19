import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {DatasetComponentOption, GridComponentOption, TitleComponentOption} from 'echarts/components';
import {CustomSeriesOption, EChartsOption, ScatterSeriesOption, TooltipComponentOption} from 'echarts';

type ECOption = echarts.ComposeOption<| TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | CustomSeriesOption
  | ScatterSeriesOption>;

type Series = CustomSeriesOption;

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

  public title(title: string = '', subTitle: string = ''): ChartBuilder {
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

  public grid(grids: GridComponentOption[] = []): ChartBuilder {
    this.option.grid = grids.length > 0 ? grids : [
      {
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '10%',
      }
    ];
    return this;
  }

  public zoom(start: number, end: number): ChartBuilder {
    this.option.dataZoom = [
      {
        type: 'inside',
        filterMode: 'filter',
        xAxisIndex: 0,
        rangeMode: ['value', 'value'],
        startValue: start,
        endValue: end
      },
      {
        type: 'inside',
        filterMode: 'filter',
        yAxisIndex: 0,
        rangeMode: ['value', 'value'],
        startValue: start,
        endValue: end
      }
    ];
    return this;
  }

  public axis(min: number, max: number, interval: number): ChartBuilder {
    this.option.xAxis = [
      {
        show: true,
        min,
        max,
        interval,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      }
    ];
    this.option.yAxis = [
      {
        show: true,
        min,
        max,
        interval,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      }
    ];
    return this;
  }

  public series(series: Series[]): ChartBuilder {
    this.option.series = series;
    return this;
  }

  public actions(radius: number, postZoom?: () => void): EChartsType | undefined {
    if (!this.chart) {
      return undefined;
    }

    this.chart.on('dataZoom', (event: any) => {
      if (event.batch) {
        if (event.batch.length > 1) {
          const option = this.chart?.getOption() as EChartsOption;
          if (option &&
            option.dataZoom &&
            option.dataZoom instanceof Array &&
            option.dataZoom.length >= 2) {
            const zoomX = option.dataZoom[0];
            const zoomY = option.dataZoom[1];
            if (zoomX.startValue &&
                zoomY.endValue &&
                zoomX.startValue &&
                zoomY.endValue &&
                typeof zoomX.startValue === 'number' &&
                typeof zoomX.endValue === 'number' &&
                typeof zoomY.startValue === 'number' &&
                typeof zoomY.endValue === 'number') {
              const xRange = zoomX.endValue - zoomX.startValue;
              const yRange = zoomY.endValue - zoomY.startValue;
              if (xRange === yRange) {
                // do nothing.
              } else if (xRange > yRange) {
                this.chart?.dispatchAction({
                  type: 'dataZoom',
                  dataZoomIndex: 0,
                  startValue: zoomX.startValue + xRange - yRange,
                  endValue: zoomX.endValue
                });
              } else {
                this.chart?.dispatchAction({
                  type: 'dataZoom',
                  dataZoomIndex: 1,
                  startValue: zoomY.startValue + yRange - xRange,
                  endValue: zoomY.endValue
                });
              }
            }
          }
        }
      }
      postZoom?.();
    });
    return this.chart;
  }

  public build(): ChartBuilder {
    this.chart?.clear();
    this.chart?.setOption(this.option);
    return this;
  }

}
