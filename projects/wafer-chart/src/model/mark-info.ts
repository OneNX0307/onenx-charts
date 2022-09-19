import {MetaInfo} from './meta-info';
import {Size2D} from './size2-d';

export class MarkInfo extends MetaInfo {

  constructor(
    public metaInfo: MetaInfo,
    // 标记的尺寸
    public size: Size2D) {
    super(
      metaInfo.lotId,
      metaInfo.waferId,
      metaInfo.coordinate2d,
      metaInfo.value2d,
      metaInfo.color
    );
  }
}
