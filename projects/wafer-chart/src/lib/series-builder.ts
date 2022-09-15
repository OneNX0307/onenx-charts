import {CustomSeriesOption} from 'echarts';
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn
} from 'echarts/types/dist/echarts';
import {Field} from '../model/field';
import {ArrowInfo} from '../model/arrow-info';

type Series = CustomSeriesOption;

export class SeriesBuilder {
  private series: Series[] = [];

  public circle(radius: number): SeriesBuilder {
    const waferCircle: CustomSeriesOption = {
      type: 'custom',
      clip: true,
      data: [radius],
      renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) =>
        this.renderCircle(params, api)
    };
    this.series.push(waferCircle);

    return this;
  }

  public notch(): SeriesBuilder {
    // TODO:

    return this;
  }

  public layout(fields: Field[]): SeriesBuilder {
    if (fields.length <= 0) {
      return this;
    }
    const layout: CustomSeriesOption = {
      type: 'custom',
      clip: true,
      data: fields,
      renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) =>
        this.renderLayout(params, api, fields)
    };

    this.series.push(layout);
    return this;
  }

  public arrows(arrows: ArrowInfo[]): SeriesBuilder {
    const arrowsSeries: CustomSeriesOption = {
      type: 'custom',
      clip: true,
      data: arrows,
      renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) =>
        this.renderArrows(params, api, arrows)
    };

    this.series.push(arrowsSeries);
    return this;
  }

  public marks(): SeriesBuilder {
    // TODO:
    return this;
  }

  public build(): Series[] {
    return this.series;
  }

  private renderCircle(_: CustomSeriesRenderItemParams,
                       api: CustomSeriesRenderItemAPI): CustomSeriesRenderItemReturn {
    let unit = 0;
    if (api && api.size) {
      const size = api.size([1, 1]);
      if (size instanceof Array) {
        unit = size[0];
      }
    }
    const value = api.value(0);
    return {
      type: 'circle',
      z2: 1,
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
                       api: CustomSeriesRenderItemAPI,
                       fields: Field[]): CustomSeriesRenderItemReturn {
    const item = fields[params.dataIndex];
    const coordinates = [
      item.coordinate.x - item.size.width / 2.0,
      item.coordinate.y + item.size.height / 2.0
    ];
    let unit = 0;
    if (api && api.size) {
      const size = api.size([1, 1]);
      if (size instanceof Array) {
        unit = size[0];
      }
    }
    return {
      type: 'rect',
      z2: 2,
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

  private renderArrows(params: CustomSeriesRenderItemParams,
                       api: CustomSeriesRenderItemAPI,
                       arrows: ArrowInfo[]): CustomSeriesRenderItemReturn {
    const item = arrows[params.dataIndex];
    const sourceCoordinate = [item.coordinate2d.x, item.coordinate2d.y];
    const desCoordinate = [item.coordinate2d.x + item.offset.dx, item.coordinate2d.y + item.offset.dy];

    return {
      type: 'group',
      children: [
        {
          type: 'path',
          z2: 3,
          shape: {
            pathData: `M ${api.coord(sourceCoordinate)[0]} ${api.coord(sourceCoordinate)[1]}
                         ${api.coord(desCoordinate)[0]} ${api.coord(desCoordinate)[1]}`
          },
          style: {
            stroke: item.color,
            fill: 'transparent',
            lineWidth: 0.5
          }
        }
      ]
    };
  }
}
