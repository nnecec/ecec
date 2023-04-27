# @afojs/use-search

- useSearch

## Usage

```jsx
import { Form, Input, Switch } from 'antd'
import { SearchBar } from 'antd-mobile'
import { useSearch } from '@afojs/use-search'
import useSWR from 'swr'
import { CustomPicker, SearchInput } from '~/components'

export const App = () => {
  const [search, params] = useSearch('namespace', {
    onSearch: params => {
      fetch(`${url}?${new URLSearchParams(params).toString()}`)
    },
    onInitialize: searchParams => {
      form.setFieldsValue(searchParams)
    },
  })

  const { data } = useSWR(['/api', params], url => {
    fetch(`${url}?${new URLSearchParams(params).toString()}`)
  })

  // there are two conditions of search function
  // first, you can pass a field name, the search function will affect the field of params.
  // other, pass nothing, the search function will merge received params to the useSearch's params.

  return (
    <div>
      <Form
        onFinish={values => {
          search(values)
        }}
      >
        <Form.Item name="field1">
          <Input />
        </Form.Item>
        <Form.Item name="field2">
          <Input />
        </Form.Item>
        <Form.Item name="field3">
          <Input />
        </Form.Item>
      </Form>

      <Input {...search('name')} />

      <Tabs
        options={[
          { label: 'Open', value: 1 },
          { label: 'Close', value: 0 },
        ]}
        {...search('status')}
      />

      <Switch
        checked={params.switch}
        onChange={value => {
          search({ switch: value })
        }}
      />

      <SearchInput {...search('searchInput', { trigger: 'onConfirm' })} />
      <CustomPicker
        {...search('customPicker', {
          getValueFromEvent: e => e[0],
          getValueProps: value => ({ value: [value] }),
        })}
      />

      <SearchBar {...search('searchbar', { trigger: 'onSearch' })} />

      <Picker columns={columns} {...search('picker', { trigger: 'onConfirm' })}>
        {(items, { open }) => {
          return (
            <Space align="center">
              <Button onClick={open}>选择</Button>
              {items.every(item => item === null)
                ? '未选择'
                : items.map(item => item?.label ?? '未选择').join(' - ')}
            </Space>
          )
        }}
      </Picker>
    </div>
  )
}
```

## API

### useSearch: (namespace?:string) => [Record<string, any>, Register]

Generate `Search` instance with the namespace.

Take the `Search` instance register controlled component to collect param.

```jsx
const [params, register] = useSearch()
```

#### Register: (name: string, options?: Options) => { value, onChange }

`name`: param key

#### Options: { getValueFromEvent: (e)=> any, valuePropName: string }
