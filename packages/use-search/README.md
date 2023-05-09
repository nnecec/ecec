# @afojs/use-search

- UI 无关
- 整合请求数据
- 支持 location 同步

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

  /**
   * there are two conditions of search function
   *
   * first, you can pass a field name, the search function will affect the field of params.
   * other, pass nothing, the search function will merge received params to the useSearch's params.
   */

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
        {...search('status', {
          onChange: () => {
            // your change
          },
        })}
      />

      <Switch
        {...search('status', {
          valuePropName: 'checked',
        })}
      />

      <Input.Search {...search('input-search', { searchTrigger: 'onSearch' })} />

      <Picker
        columns={[
          [
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
          ],
        ]}
        {...search('picker', {
          trigger: 'onConfirm',
          getValueFromEvent: e => e[0],
          getValueProps: value => ({ value: [value] }),
        })}
      >
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

```tsx
const usePickerBox = () => {
  return {
    children: (items, { open }) => {
      return (
        <Space align="center">
          <Button onClick={open}>选择</Button>
          {items.every(item => item === null)
            ? '未选择'
            : items.map(item => item?.label ?? '未选择').join(' - ')}
        </Space>
      )
    },
    trigger: 'onConfirm',
    getValueFromEvent: e => e[0],
    getValueProps: value => ({ value: [value] }),
  }
}

const App = () => {
  return (
    <Picker
      columns={[
        [
          { label: 'a', value: 'a' },
          { label: 'b', value: 'b' },
        ],
      ]}
      {...usePickerBox()}
    />
  )
}
```

```tsx
const App = () => {
  const queryClient = useQueryClient()
  const [search, params] = useSearch()

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['list', params],
      queryFn: ({ pageParam = 0 }) => fetcher({ page: pageParam, ...params }),
      getNextPageParam: (lastPage: any) => lastPage.nextPage,
    })

  return (
    <div>
      <List>
        {data?.pages?.map(group =>
          group.list?.map(item => (
            <List.Item key={item}>
              <p>{item.name}</p>
              <p>{item.tabs}</p>
              <p>
                {item.picker1} {item.picker2 ? `-${item.picker2}` : ''}
              </p>
            </List.Item>
          )),
        )}
      </List>

      <InfiniteScroll
        loadMore={async () => {
          await fetchNextPage()
        }}
        hasMore={!!hasNextPage || !isFetchingNextPage}
      />
    </div>
  )
}

const App = () => {
  const [search, params] = useSearch()
  const { InfiniteScroll, list, error, isLoading } = usePaginationBox({
    queryKey: ['list', params],
    queryFn: query => fetcher({ ...query, ...params }),
  })

  return (
    <div>
      <List>
        {list?.map(item => (
          <List.Item key={item}>
            <p>{item.name}</p>
            <p>{item.tabs}</p>
            <p>
              {item.picker1} {item.picker2 ? `-${item.picker2}` : ''}
            </p>
          </List.Item>
        ))}
      </List>

      <InfiniteScroll />
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
