 This package is based on [apache/echarts](https://echarts.apache.org/), provide a wafer layout chart out of the box. 
 
# Installation
```shell
npm install ngx-wafer-chart --save
```
# Usage
```html
<ngx-wafer-chart [fields$]="fields$"></ngx-wafer-chart>
```

```typescript
import {Field} from 'ngx-wafer-chart/lib/model';

fields$: Observable<Field[]> = of([]);

ngOnInit(): void {
    this.fields$ = this.http.get<Field[]>('path/to/request/field/data');
}
```
