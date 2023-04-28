import { useSearch } from '@afojs/use-search'
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
} from 'antd'
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
  const [form] = Form.useForm()
  const [search, params] = useSearch({
    onInitialize(params) {
      form.setFieldsValue(params)
    },
  })

  console.log(params)

  const { data, isLoading, isValidating } = useSWR<any[]>(
    ['sectionA', params],
    async () => await fetcher(params),
  )

  return (
    <div>
      <Card title="Section A">
        <Form form={form} onFinish={values => search(values)}>
          <Form.Item name="input" label="Input">
            <Input />
          </Form.Item>
          <Form.Item name="select" label="Select" hasFeedback>
            <Select placeholder="select a country">
              <Select.Option value="china">China</Select.Option>
              <Select.Option value="usa">U.S.A</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="select-multiple" label="Select[multiple]">
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="blue">Blue</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="InputNumber">
            <Form.Item name="input-number" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              machines
            </span>
          </Form.Item>

          <Form.Item name="switch" label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="radio-group" label="Radio.Group">
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="checkbox-group" label="Checkbox.Group">
            <Checkbox.Group>
              <Space>
                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                  A
                </Checkbox>

                <Checkbox value="D" style={{ lineHeight: '32px' }}>
                  D
                </Checkbox>

                <Checkbox value="E" style={{ lineHeight: '32px' }}>
                  E
                </Checkbox>

                <Checkbox value="F" style={{ lineHeight: '32px' }}>
                  F
                </Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="rate" label="Rate">
            <Rate />
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
          {...search('tab', { getValueProps: value => ({ activeKey: value }) })}
        />

        <Switch
          {...search('opened', {
            getValueProps: value => ({ checked: value }),
          })}
        />
        <Input.Search
          {...search('inputSearch', {
            searchTrigger: 'onSearch',
          })}
        />

        <Table
          loading={isLoading || isValidating}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
            },
            {
              title: 'Value',
              dataIndex: 'value',
            },
          ]}
          dataSource={data ?? []}
          pagination={{
            pageSize: 5,
            onChange(page, pageSize) {
              search({ page, pageSize })
            },
          }}
        />
      </Card>
    </div>
  )
}
