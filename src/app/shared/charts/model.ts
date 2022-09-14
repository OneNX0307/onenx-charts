// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
import * as echarts from 'echarts/core';
import {
  CustomSeriesOption,
  ScatterSeriesOption,
  TooltipComponentOption
} from 'echarts';
import {DatasetComponentOption, GridComponentOption, TitleComponentOption} from 'echarts/components';

export type ECOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | CustomSeriesOption
  | ScatterSeriesOption
  >;

export type Series = CustomSeriesOption | ScatterSeriesOption;

export class FieldSize {
  constructor(public width: number, public height: number) {
  }
}

export class Field {
  constructor(public coordinates: Coordinates2D, public size: FieldSize) {
  }
}

export class Coordinates2D {
  constructor(public x: number, public y: number) {
  }
}

export class Offset2D {
  constructor(public dx: number, public dy: number) {
  }
}

export class MetaItem {
  constructor(
    public coordinates2D: Coordinates2D,
    public offset2D: Offset2D,
    public extra: object) {
  }
}
