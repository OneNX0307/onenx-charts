import {FieldSize} from './field-size';
import {Coordinate2d} from './coordinate-2d';

export class Field {
  constructor(public coordinate: Coordinate2d, public size: FieldSize) {
  }
}
