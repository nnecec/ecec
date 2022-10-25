import { useEffect } from 'react'
import { useSearch } from '@afojs/search'
import { Switch, Tabs } from 'antd-mobile'

export default function Index() {
  const { params, register } = useSearch('test')

  useEffect(() => {
    console.log(params)
  }, [params])

  return (
    <div>
      <input
        type="text"
        {...register('name')}
      />

      <Tabs
        {...register('status', {
          valuePropName: 'activeKey',
        })}>
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

      <Switch
        {...register('opened', {
          valuePropName: 'checked'
        })} />
    </div>
  )
}
