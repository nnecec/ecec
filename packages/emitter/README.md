# emitter

> forked from [developit/mitt](https://github.com/developit/mitt)

## Usage

```ts
import { Emitter, emitter } from '@afojs/emitter'

const mi = new Emitter()
// or
const mi = emitter()

mi.on('say', name => {
  console.log(name)
})

mi.emit('say', 'afo') // afo
mi.off('say')
```

## API

### on

### off

### emit
