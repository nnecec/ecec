# remember

Declare a named space to remember values.

## Usage

```ts
import { createLocationCache, Remember, remember } from '@afojs/remember'

const reme = new Remember('cache')
// or
const reme = remember('cache')

reme.set({
  age: 18,
})

reme.set('name', 'wayne')

reme.set('sex', 'male')

reme.get()
// return {
//   age: 18,
//   name: 'wayne',
//   sex: 'male'
// }
```


