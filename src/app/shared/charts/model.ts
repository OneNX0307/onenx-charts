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
