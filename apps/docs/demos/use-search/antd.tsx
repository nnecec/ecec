import { useSearch } from '@ecec/hooks'
import { Button, Col, Form, Input, Row, Space, Table, Tabs } from 'antd'
import useSWR from 'swr'

const fetcher = (params?: Record<string, any>) => {
  console.log(params)
  return new Promise<any[]>(resolve => {
    setTimeout(() => {
      resolve(
        Object.entries(params ?? {})
          .map(([key, value]) => {
            if (value === undefined) return null
            return {
              [key]: typeof value === 'string' ? value : `${value}`,
            }
          })
          .filter(Boolean),
      )
    }, 500)
  })
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export const SearchExample = () => {
  const [form] = Form.useForm()
  const [search, params] = useSearch({
    defaultValue: {
      page: 1,
      pageSize: 10,
    },
    name: 'account-manage',
    onInit(params) {
      form.setFieldsValue(params)
    },
  })

  const { data, isLoading, mutate } = useSWR<any[]>(['sectionA', params], () => fetcher(params))
  console.log(data)
  return (
    <div className="bg-white">
      <Form
        className="mb-4 bg-white p-4"
        {...layout}
        onFinish={values => {
          search({ ...values, page: 1 })
          mutate()
        }}
        form={form}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="UserName" name="userName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="UserId" name="userId">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Mobile" name="mobile">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Space>
            <Button
              onClick={() => {
                form.resetFields()
                search(form.getFieldsValue())
              }}
            >
              Reset
            </Button>
            <Button htmlType="submit" type="primary">
              Search
            </Button>
          </Space>
        </Row>
      </Form>

      <Tabs
        {...search('status', {
          valuePropName: 'activeKey',
        })}
        items={[
          { key: '1', label: 'Enable' },
          { key: '0', label: 'Disabled' },
          { key: '-1', label: 'Cancelled' },
        ]}
      />

      <Table
        columns={[
          {
            dataIndex: 'userId',
            title: 'UserId',
          },
          {
            dataIndex: 'userName',
            title: 'UserName',
          },
          {
            dataIndex: 'mobile',
            title: 'Mobile',
          },
          {
            dataIndex: 'status',
            title: 'Status',
          },
        ]}
        pagination={{
          onChange(page, pageSize) {
            search({ page, pageSize })
          },
        }}
        dataSource={data ?? []}
        loading={isLoading}
      />
    </div>
  )
}
