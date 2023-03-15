import { useSearch } from '@afojs/hooks'
import { Button, Card, Form, Input, Spin, Switch, Tabs } from 'antd'
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
  const [params, register] = useSearch()

  const { data, isLoading, isValidating } = useSWR(['sectionA', params], () => {
    return fetcher(params)
  })

  return (
    <div>
      <Card title="Section A">
        <Form
          {...register('form', {
            trigger: 'onFinish',
            getValue: values => {
              return values
            },
          })}
        >
          <Form.Item name="name" label="name">
            <Input type="text" />
          </Form.Item>

          <Button htmlType="submit">Submit</Button>
        </Form>

        <Tabs
          items={[
            {
              label: 'Tab 1',
              key: '1',
            },
            {
              label: 'Tab 2',
              key: '2',
            },
            {
              label: 'Tab 3',
              key: '3',
            },
          ]}
          {...register('tab', { valuePropName: 'activeKey' })}
        />

        <Switch
          {...register('opened', {
            valuePropName: 'checked',
          })}
        />

        <div>get string from params: {isLoading || isValidating ? <Spin /> : data}</div>
      </Card>
    </div>
  )
}
