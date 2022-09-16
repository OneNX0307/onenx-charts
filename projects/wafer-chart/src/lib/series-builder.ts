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

  public arrows(arrows: ArrowInfo[], fill: boolean = false): SeriesBuilder {
    const arrowsSeries: CustomSeriesOption = {
      type: 'custom',
      clip: true,
      data: arrows,
      renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) =>
        this.renderArrows(params, api, arrows, fill)
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
                       arrows: ArrowInfo[],
                       fill: boolean): CustomSeriesRenderItemReturn {
    const item = arrows[params.dataIndex];
    const sourceCoord = [item.coordinate2d.x, item.coordinate2d.y];
    const targetCoord = [item.coordinate2d.x + item.offset.dx, item.coordinate2d.y + item.offset.dy];
    const L = Math.sqrt(
      Math.pow(sourceCoord[0] - targetCoord[0], 2) +
         Math.pow(sourceCoord[1] - targetCoord[1], 2)
    );
    const arrowLength = L * 33.0 / 100.0;
    const angle = Math.PI / 6.0;
    const x = targetCoord[0] - (targetCoord[0] - sourceCoord[0]) * arrowLength / L;
    const y = targetCoord[1] - (targetCoord[1] - sourceCoord[1]) * arrowLength / L;

    const arrow1X = targetCoord[0] + (x - targetCoord[0]) * Math.cos(angle) - (y - targetCoord[1]) * Math.sin(angle);
    const arrow1Y = targetCoord[1] + (x - targetCoord[0]) * Math.sin(angle) + (y - targetCoord[1]) * Math.cos(angle);
    const arrow1Coord = [arrow1X, arrow1Y];

    const arrow2X = targetCoord[0] + (x - targetCoord[0]) * Math.cos(angle) + (y - targetCoord[1]) * Math.sin(angle);
    const arrow2Y = targetCoord[1] - (x - targetCoord[0]) * Math.sin(angle) + (y - targetCoord[1]) * Math.cos(angle);
    const arrow2Coord = [arrow2X, arrow2Y];
    return {
      type: 'group',
      children: [
        {
          type: 'path',
          z2: 3,
          shape: {
            pathData: `
              M ${api.coord(sourceCoord)[0]}, ${api.coord(sourceCoord)[1]}
              L ${api.coord(targetCoord)[0]}, ${api.coord(targetCoord)[1]}
              L ${api.coord(arrow1Coord)[0]}, ${api.coord(arrow1Coord)[1]}` +
             `L ${api.coord(fill ? arrow2Coord : targetCoord)[0]}, ${api.coord(fill ? arrow2Coord : targetCoord)[1]}` +
             `L ${api.coord(fill ? targetCoord : arrow2Coord)[0]}, ${api.coord(fill ? targetCoord : arrow2Coord)[1]}`
          },
          style: {
            stroke: item.color,
            fill: fill ? 'red' : 'transparent',
            lineWidth: 0.5
          }
        }
      ]
    };
  }
}
