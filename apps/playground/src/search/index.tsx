import { useSearch } from '@afojs/search'
import { Card, Input, Spin, Switch, Tabs } from 'antd'
import useSWR from 'swr'

const fetcher = (params: Record<string, any>) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(
        Object.entries(params)
          .map(([key, value]) => `${key}: ${value}`)
          .join(','),
      )
    }, 1000)
  })

export const SearchExample = () => {
  const [params, register] = useSearch('sectionA')

  const { data, isLoading, isValidating } = useSWR(['sectionA', params], () =>
    fetcher(params),
  )

  return (
    <div>
      <Card title="Section A">
        <input
          type="text"
          {...register('name', {
            getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.value,
          })}
        />
        <Input type="text" {...register('description')} />

        <Tabs
          items={[
            {
              label: `Tab 1`,
              key: '1',
            },
            {
              label: `Tab 2`,
              key: '2',
            },
            {
              label: `Tab 3`,
              key: '3',
            },
          ]}
          {...register('tab', { valuePropName: 'activeKey' })}
        ></Tabs>

        <Switch
          {...register('opened', {
            valuePropName: 'checked',
          })}
        />

        <div>
          get string from params: {isLoading || isValidating ? <Spin /> : data}
        </div>
      </Card>
    </div>
  )
}
