import { useSearch } from '@afojs/use-search'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Spin,
  Switch,
  Tabs,
} from 'antd'
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

  const { data, isLoading, isValidating } = useSWR(['sectionA', params], () => fetcher(params))

  console.log(params)
  return (
    <div>
      <Card title="Section A">
        <Form
          {...register({
            trigger: 'onFinish',
          })}
        >
          <Form.Item label="Plain Text">
            <span className="ant-form-text">China</span>
          </Form.Item>
          <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: 'Please select your country!' }]}
          >
            <Select placeholder="Please select a country">
              <Select.Option value="china">China</Select.Option>
              <Select.Option value="usa">U.S.A</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="select-multiple"
            label="Select[multiple]"
            rules={[
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ]}
          >
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

          <Form.Item name="slider" label="Slider">
            <Slider
              marks={{
                0: 'A',
                20: 'B',
                40: 'C',
                60: 'D',
                80: 'E',
                100: 'F',
              }}
            />
          </Form.Item>

          <Form.Item name="radio-group" label="Radio.Group">
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="radio-button"
            label="Radio.Button"
            rules={[{ required: true, message: 'Please pick an item!' }]}
          >
            <Radio.Group>
              <Radio.Button value="a">item 1</Radio.Button>
              <Radio.Button value="b">item 2</Radio.Button>
              <Radio.Button value="c">item 3</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="checkbox-group" label="Checkbox.Group">
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox value="A" style={{ lineHeight: '32px' }}>
                    A
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                    B
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="C" style={{ lineHeight: '32px' }}>
                    C
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="D" style={{ lineHeight: '32px' }}>
                    D
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="E" style={{ lineHeight: '32px' }}>
                    E
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="F" style={{ lineHeight: '32px' }}>
                    F
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="rate" label="Rate">
            <Rate />
          </Form.Item>
        </Form>

        <Input
          type="text"
          {...register('name', {
            trigger: 'onPressEnter',
          })}
        />

        <InputNumber
          {...register('age', {
            trigger: 'onPressEnter',
          })}
        />

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
