import { useEffect } from 'react'
import { useSearch } from '@afojs/use-search'
import { SearchBar, Switch, Tabs } from 'antd-mobile'
import useSWR from 'swr'

const fetcher = (params: Record<string, any>) =>
  new Promise<any[]>(resolve => {
    setTimeout(() => {
      resolve(
        Object.entries(params).map(([key, value]) => ({ name: key, value, amount: Math.random() })),
      )
    }, 1000)
  })

export const SearchExample = () => {
  const [search, params] = useSearch()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-prefers-color-scheme', 'light')
    }
  }, [])

  const { data, isLoading, isValidating } = useSWR<any[]>(
    ['sectionA', params],
    async () => await fetcher(params),
  )

  return (
    <div className="w-[390px] h-[667px] border bg-white">
      <SearchBar {...search('searchbar', { trigger: 'onSearch' })} />

      <Tabs
        {...search('tabs', {
          getValueProps(value) {
            return { activeKey: value }
          },
        })}
      >
        <Tabs.Tab title="水果" key="fruits">
          菠萝
        </Tabs.Tab>
        <Tabs.Tab title="蔬菜" key="vegetables">
          西红柿
        </Tabs.Tab>
        <Tabs.Tab title="动物" key="animals">
          蚂蚁
        </Tabs.Tab>
      </Tabs>
      
    </div>
  )
}
