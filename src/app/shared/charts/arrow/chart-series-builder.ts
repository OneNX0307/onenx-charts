import {CustomSeriesOption, ScatterSeriesOption, SeriesOption} from 'echarts';
import {LineSeriesOption} from 'echarts/charts';
import {CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams} from 'echarts/types/dist/echarts';

type Series = CustomSeriesOption
  | LineSeriesOption
  | ScatterSeriesOption;

export class ChartSeriesBuilder {
  private series: Series[] = [];

  public withWaferCircle(radius: number): ChartSeriesBuilder {
    const waferCircle: CustomSeriesOption = {
      type: 'custom',
      clip: true,
      data: [radius],
      renderItem: (params: any, api: any) => {
        return {
          type: 'circle',
          shape: {
            cx: api.coord([0, 0])[0],
            cy: api.coord([0, 0])[1],
            r: api.size([0, 1])[1] * api.value(0),
          },
          style: {
            fill: 'black',
            stroke: 'black'
          },
          silent: true
        };
      }
    };
    this.series.push(waferCircle);

    return this;
  }

  public withWaferNortch(): ChartSeriesBuilder {
    // TODO:

    return this;
  }

  public withFieldLayout(): ChartSeriesBuilder {
    // TODO:

    return this;
  }

  public withArrows(): ChartSeriesBuilder {
    // TODO:
    return this;
  }

  public withMarks(): ChartSeriesBuilder {
    // TODO:
    return this;
  }

  public build(): Series[] {
    return this.series;
  }

}
