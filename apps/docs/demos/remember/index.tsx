import { createLocationStorage, remember } from '@afojs/remember'

const count = remember('count', { storage: createLocationStorage() })

export const RememberExample = () => {
  return (
    <div className="flex gap-2">
      <button onClick={() => count.set({ num: 0 })}>initial</button>
      <button
        onClick={() => {
          const num = count.get('num')
          console.log(num)
          count.set({ num: num + 1 })
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          const num = count.get('num')
          count.set({ num: num - 1 })
        }}
      >
        decrement
      </button>
      <button onClick={() => console.log(count.get())}>print</button>
    </div>
  )
}
