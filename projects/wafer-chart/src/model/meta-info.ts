import {Coordinate2d} from './coordinate-2d';
import {Value2d} from './value2d';

export class MetaInfo {
  constructor(
    public lotId: string,
    public waferId: string,
    public coordinate2d: Coordinate2d, // 场中心坐标
    public value2d: Value2d, // 点对应的二维值
    public color: string) {
  }
}
