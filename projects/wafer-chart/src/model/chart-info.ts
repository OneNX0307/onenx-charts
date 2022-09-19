import {Field} from './field';
import {MetaInfo} from './meta-info';
import {MarkInfo} from './mark-info';

export class ChartInfo {
  constructor(
    public fields: Field[] = [],
    public arrows: MetaInfo[] = [],
    public marks: MarkInfo[] = []) {
  }
}
