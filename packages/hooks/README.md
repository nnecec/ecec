# @afojs/hooks

- useSearch

## Usage

```jsx
import { useSearch } from '@afojs/hooks'
import useSWR from 'swr'

export const App = () =>{
  const [params, register] = useSearch('test')
  const { data } =  useSWR(['/api', params],(url) => {
    const search = new URLSearchParams(params)
    fetch(`${url}?${search.toString()}`)
  })

  return <div>
    <input {...register('name')} />
    <SearchInput {...register('search', { trigger: 'onConfirm' })} />
    <CustomInput {...register('custom', { getValueFromEvent: e => e.target.value })}>
  </div>
}
```

## API

### useSearch: (namespace?:string) => [Record<string, any>, Register]

Generate `Search` instance with the namespace.

Take the `Search` instance register controlled component to collect param.

```jsx
const [params, register] = useSearch('test')

return (
  <input {...register('text')} />
)
```

#### Register: (name: string, options: Options) => { value, onChange }

`name`: param key

#### Options: { getValueFromEvent: (e)=> any, valuePropName: string }
