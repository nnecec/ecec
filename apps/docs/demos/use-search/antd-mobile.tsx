import { useEffect, useState } from 'react'
import { useSearch } from '@afojs/use-search'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Button, List, Picker, SearchBar, Tabs } from 'antd-mobile'
import { usePaginationBox } from './use-pagination-box'

const fetcher = params => {
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

export const SearchExample = () => {
  const queryClient = useQueryClient()
  const [search, params] = useSearch({
    initialValues: {
      tabs: 'fruits',
    },
  })

  const { data, InfiniteScroll, PullToRefresh } = usePaginationBox({
    queryKey: ['list', params],
    queryFn: async pageParams => await fetcher({ ...pageParams, ...params }),
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

      <PullToRefresh>
        <List>
          {data?.pages?.map(group =>
            group.list?.map(item => (
              <List.Item key={item.name}>
                <p>{item.name}</p>
                <p>{item.tabs}</p>
                <p>
                  {item.picker1} {item.picker2 ? `-${item.picker2}` : null}
                </p>
              </List.Item>
            )),
          )}
        </List>
      </PullToRefresh>

      <InfiniteScroll />
    </div>
  )
}
