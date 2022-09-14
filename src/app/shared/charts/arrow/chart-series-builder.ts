import {CustomSeriesOption} from 'echarts';
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn
} from 'echarts/types/dist/echarts';
import {Series} from '../model';



export class ChartSeriesBuilder {
  private series: Series[] = [];

  public withWaferCircle(radius: number): ChartSeriesBuilder {
    const waferCircle: CustomSeriesOption = {
      type: 'custom',
      clip: true,
      data: [radius],
      renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) => this.renderItem(params, api)
    };
    this.series.push(waferCircle);

    return this;
  }

  public withWaferNotch(): ChartSeriesBuilder {
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

  private renderItem(_: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI): CustomSeriesRenderItemReturn {
    let unit = 0;
    if (api && api.size){
      const size = api.size([1, 1]);
      if (size instanceof Array){
        unit = size[0];
      }
    }
    const value = api.value(0);
    return {
      type: 'circle',
      shape: {
        cx: api.coord([0, 0])[0],
        cy: api.coord([0, 0])[1],
        r: unit * Number(value),
      },
      style: {
        fill: 'transparent',
        stroke: 'grey'
      },
      silent: true
    };
  }

}
