import {CustomSeriesOption} from 'echarts';
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn
} from 'echarts/types/dist/echarts';
import {Field, Series} from '../model';



export class ChartSeriesBuilder {
  private series: Series[] = [];

  public withWaferCircle(radius: number): ChartSeriesBuilder {
    const waferCircle: CustomSeriesOption = {
      type: 'custom',
      clip: true,
      data: [radius],
      renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) => this.renderCircle(params, api)
    };
    this.series.push(waferCircle);

    return this;
  }

  public withWaferNotch(): ChartSeriesBuilder {
    // TODO:

    return this;
  }

  public withFieldLayout(fields: Field[]): ChartSeriesBuilder {
    if (fields.length <= 0) {
      return this;
    }
    const layout: CustomSeriesOption = {
      type: 'custom',
      clip: true,
      data: fields,
      renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) => this.renderLayout(params, api, fields)
    };

    this.series.push(layout);
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

  private renderCircle(_: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI): CustomSeriesRenderItemReturn {
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

  private renderLayout(params: CustomSeriesRenderItemParams,
                       api: CustomSeriesRenderItemAPI, fields: Field[]): CustomSeriesRenderItemReturn {
    const item = fields[params.dataIndex];
    const coordinates = [item.coordinates.x - item.size.width / 2.0, item.coordinates.y + item.size.height / 2.0];
    let unit = 0;
    if (api && api.size){
      const size = api.size([1, 1]);
      if (size instanceof Array){
        unit = size[0];
      }
    }
    return {
      type: 'rect',
      shape: {
        x: api.coord(coordinates)[0],
        y: api.coord(coordinates)[1],
        width: unit * item.size.width,
        height: unit * item.size.height
      },
      style: {
        fill: 'grey',
        stroke: 'black'
      },
    };
  }
}
