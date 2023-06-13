import { useSearch } from '@ecec/use-search'
import { useQueryClient } from '@tanstack/react-query'
import { Button, InfiniteScroll, List, Picker, PullToRefresh, SearchBar, Tabs } from 'antd-mobile'

import { useConfirmBox } from './use-confirm-box'
import { usePaginationBox } from './use-pagination-box'

const fetcher = (params: any) => {
  const { page, ...other } = params
  return new Promise<any>(resolve => {
    setTimeout(() => {
      if (page >= 5) {
        resolve([])
        return
      }
      resolve({
        list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(t => ({
          name: `${t}-${page}`,
          ...other,
        })),
        nextPage: page + 1,
      })
    }, 1000)
  })
}

const remover = (params: any) => {
  console.log(params)
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5
      if (isSuccess) {
        resolve('Success!')
      } else {
        reject(new Error('Verify failed!'))
      }
    }, 1000)
  })
}

export const SearchExample = () => {
  const queryClient = useQueryClient()
  const [search, params] = useSearch({
    initialValues: {
      tabs: 'fruits',
    },
  })
  const queryKey = ['list', params]

  const { data, infiniteScrollProps, pullToRefreshProps } = usePaginationBox({
    queryKey,
    queryFn: async (pageParams: any) => await fetcher({ ...pageParams, ...params }),
  })

  const remove = useConfirmBox({
    resetKey: queryKey,
    mutationFn: data => remover(data),
    title: item => `确认删除${item.name}吗？`,
    content: '数据删除后将无法恢复，请确认后操作！',
  })

  return (
    <div className="h-[667px] w-[390px] overflow-y-auto border bg-white" id="antd-mobile-demo">
      <div className="sticky top-0 z-10 bg-white shadow">
        <SearchBar {...search('searchbar', { trigger: 'onSearch' })} />

        <Tabs
          {...search('tabs', {
            onChange() {
              queryClient.resetQueries({ queryKey: ['list'] })
            },
            valuePropName: 'activeKey',
          })}
        >
          <Tabs.Tab title="水果" key="fruits" />
          <Tabs.Tab title="蔬菜" key="vegetables" />
          <Tabs.Tab title="动物" key="animals" />
        </Tabs>

        <div className="flex">
          <Picker
            columns={[
              [
                { label: '周一', value: 'Mon' },
                { label: '周二', value: 'Tues' },
                { label: '周三', value: 'Wed' },
                { label: '周四', value: 'Thur' },
                { label: '周五', value: 'Fri' },
              ],
            ]}
            {...search('picker1', { trigger: 'onConfirm' })}
          >
            {([value], { open }) => (
              <Button onClick={open} block fill="none">
                {value ? value.label : '请选择'}
              </Button>
            )}
          </Picker>
          <Picker
            columns={[
              [
                { label: '上午', value: 'am' },
                { label: '下午', value: 'pm' },
              ],
            ]}
            {...search('picker2', { trigger: 'onConfirm' })}
          >
            {([value], { open }) => (
              <Button onClick={open} block fill="none">
                {value ? value.label : '请选择'}
              </Button>
            )}
          </Picker>
        </div>
      </div>

      <PullToRefresh {...pullToRefreshProps}>
        <List>
          {data?.pages?.map(group =>
            group.list?.map((item: any) => (
              <List.Item key={item.name}>
                <p>{item.name}</p>
                <p>{item.tabs}</p>
                <p>
                  {item.picker1} {item.picker2 ? `-${item.picker2}` : null}
                </p>
                <Button onClick={() => remove(item)}>Remove</Button>
              </List.Item>
            )),
          )}
        </List>
      </PullToRefresh>

      <InfiniteScroll {...infiniteScrollProps} />
    </div>
  )
}
