import {Coordinate2d} from './coordinate-2d';
import {Offset2d} from './offset-2d';

export class ArrowInfo {
  constructor(
    public lotId: string,
    public waferId: string,
    public coordinate2d: Coordinate2d,
    public offset: Offset2d,
    public color: string) {
  }
}
