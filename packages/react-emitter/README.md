# @afojs/react-emitter

## Usage

Basic usage:

```tsx
import { useEmitter } from '@afojs/react-emitter'

export const App = () => {
  const emitter = useEmitter()

  useEffect(() => {
    emitter.on('say', data => {
      console.log(data)
    })
    return () => {
      emitter.off('say')
    }
  }, [])

  const send = () => {
    emitter.emit('say', 'afo')
  }

  return <button onClick={send}>send</button>
}
```

Or use with Context, `useEmitter` will catch the nearly `Context` value

```tsx
import { EmitterProvider } from '@afojs/react-emitter'

export const App = () => {
  return (
    <EmitterProvider>
      <Child1 />
      <Child2 />
    </EmitterProvider>
  )
}

export const Child1 = () => {
  const emitter = useEmitter()

  const send = () => {
    emitter.emit('say', 'afo')
  }

  return <button onClick={send}>send</button>
}

export const Child2 = () => {
  const emitter = useEmitter()

  useEffect(() => {
    emitter.on('say', data => {
      console.log(data)
    })
    return () => {
      emitter.off('say')
    }
  }, [])

  return <div>Hello!</div>
}
```

## API

### useEmitter

### EmitterProvider
