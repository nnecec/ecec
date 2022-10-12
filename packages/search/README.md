# search

## Usage

```jsx
import { useSearch } from '@afojs/search-box'
import useSWR from 'swr'


export const App = () =>{
  const [query, setQuery] = useState({})

  const { register, reset } = useSearch({
    onSearch (values) {
      setQuery(new URLSearchParams(values).toString())
    }
  })

  const { data } =  useSWR(`/api?${query}`,(url) => fetch(url))

  return <div>
    <input {...register('name')} />

    <CustomInput {...register('custom', { trigger: 'onConfirm' })} />
  </div>
}
```

## API
