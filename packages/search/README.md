# search

## Usage

```jsx
import { useSearch } from '@afojs/search-box'
import useSWR from 'swr'

export const App = () =>{
  const { params, register } = useSearch('test')
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

### useSearch(namespace?:string)