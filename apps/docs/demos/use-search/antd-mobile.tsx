import { useEffect } from 'react'
import { useSearch } from '@afojs/use-search'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Button, InfiniteScroll, List, PullToRefresh, SearchBar, Switch, Tabs } from 'antd-mobile'

const fetcher = params => {
  const { page, ...other } = params
  return new Promise<any>(resolve => {
    setTimeout(() => {
      if (page >= 5) {
        resolve([])
        return
      }
      resolve({
        list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(
          t => `${t}-${page}-${other.tabs}-${other.searchbar}`,
        ),
        nextPage: page + 1,
      })
    }, 1000)
  })
}

export const SearchExample = () => {
  const queryClient = useQueryClient()
  const [search, params] = useSearch({
    onSearch() {
      queryClient.resetQueries({ queryKey: ['list'] })
    },
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.prefersColorScheme = 'light'
    }
  }, [])

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['list'],
      queryFn: ({ pageParam = 0 }) => fetcher({ page: pageParam, ...params }),
      getNextPageParam: (lastPage: any) => lastPage.nextPage,
    })

  return (
    <div className="h-[667px] w-[390px] overflow-y-auto border bg-white">
      <div className="sticky top-0">
        <SearchBar {...search('searchbar', { trigger: 'onSearch' })} />

        <Tabs
          {...search('tabs', {
            getValueProps(value) {
              console.log(value)
              return { activeKey: `${value}` }
            },
          })}
          activeKey={params.tabs}
        >
          <Tabs.Tab title="水果" key="fruits" />
          <Tabs.Tab title="蔬菜" key="vegetables" />
          <Tabs.Tab title="动物" key="animals" />
        </Tabs>
      </div>

      <List>
        {data?.pages?.map(group =>
          group.list?.map(item => <List.Item key={item}>{item}</List.Item>),
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
