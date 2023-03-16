import { createLocationStorage, remember } from '@afojs/remember'

const count = remember('count', { storage: createLocationStorage() })

export const RememberExample = () => {
  return (
    <div>
      <h4 className="text-3xl">open `devtool - console` to view. </h4>
      <div className="mt-2">
        <h5 className="text-xl">Remember with location</h5>
        <div className="flex gap-2 rounded border p-4">
          <button onClick={() => count.set({ num: 0 })}>initial</button>
          <button
            onClick={() => {
              const num = count.get('num') as number
              count.set({ num: num + 1 })
            }}
          >
            increment
          </button>
          <button
            onClick={() => {
              const num = count.get('num') as number
              count.set({ num: num - 1 })
            }}
          >
            decrement
          </button>
          <button onClick={() => console.log(count.get())}>log</button>
        </div>
      </div>
    </div>
  )
}
