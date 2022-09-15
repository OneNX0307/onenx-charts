 This package is based on [apache/echarts](https://echarts.apache.org/), provide a wafer layout chart out of the box. 
 
# Installation
```shell
npm install wafer-chart --save
```
# Usage
```html
<smee-wafer-chart [fields$]="fields$"></smee-wafer-chart>
```

```typescript
import {Field} from 'wafer-chart/lib/model';

fields$: Observable<Field[]> = of([]);

ngOnInit(): void {
    this.fields$ = this.http.get<Field[]>('path/to/request/field/data');
}
```
