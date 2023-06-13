# emitter

> forked from [developit/mitt](https://github.com/developit/mitt)

## Usage

```ts
import { Emitter, emitter } from '@ecec/emitter'

const mi = new Emitter()
// or
const mi = emitter()

mi.on('say', name => {
  console.log(name)
})

mi.emit('say', 'ecec') // ecec
mi.off('say')
```

## API

### on

### off

### emit
