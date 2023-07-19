import {
  createLocalStorage,
  createLocationStorage,
  createSessionStorage,
  remember,
} from '@ecec/remember'

const count = remember<number>('count')
const countLocation = remember<number>('count', { storage: createLocationStorage() })
const countLS = remember<number>('count', { storage: createLocalStorage() })
const countSS = remember<number>('count', { storage: createSessionStorage() })

const adapters = {
  localStorage: countLS,
  location: countLocation,
  memory: count,
  sessionStorage: countSS,
}

export const RememberExample = () => {
  return (
    <div>
      <b>open `devtool - console` to view data. </b>
      {Object.entries(adapters).map(([name, adapter]) => {
        const count = adapter
        return (
          <div className="mt-2" key={name}>
            <h5 className="text-xl">Remember with {name}</h5>
            <div className="flex gap-2 rounded border p-4">
              <button
                onClick={() => {
                  console.log('initial =', 0)
                  count.set('count', 0)
                }}
              >
                initial
              </button>
              <button
                onClick={() => {
                  const num = count.get('count')
                  console.log('increment 1 =', num)
                  count.set('count', num + 1)
                }}
              >
                increment
              </button>
              <button
                onClick={() => {
                  const num = count.get('count')
                  console.log('decrement 1 =', num)
                  count.set('count', num - 1)
                }}
              >
                decrement
              </button>
              <button onClick={() => console.log(count.get())}>log</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
