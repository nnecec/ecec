# search-box

## Features

- UI 无关
- 与 window.location.search 同步 (可选).
- 受控模式.
- 增加 hooks 处理业务需求.

## Usage

### antd

```jsx
import { useSearch } from "@dian/common/components/search-box";

function App() {
  const [search, params] = useSearch({
    name: "account-manage",
    defaultValue: {
      page: 1,
      pageSize: 10,
    },
    onInit(params) {
      form.setFieldsValue(params);
    },
  });

  const queryKey = ["/nile/api/v1/user/users", params];

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: ({ queryKey }) => zApi.get(queryKey[0], { params }),
  });

  return (
    <div>
      <Form
        className="bg-white p-4 mb-4"
        {...layout}
        form={form}
        onFinish={(values) => {
          search({ ...values, page: 1 });
          refetch();
        }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="userName" label="用户名">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="userId" label="用户ID">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="mobile" label="手机号">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Space>
            <Button
              onClick={() => {
                form.resetFields();
                search(form.getFieldsValue());
              }}
            >
              重置
            </Button>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Space>
        </Row>
      </Form>

      <Tabs
        {...search("status", {
          onChange() {
            queryClient.resetQueries({ queryKey: ["/nile/api/v1/user/users"] });
          },
          valuePropName: "activeKey",
        })}
      >
        <Tabs.Tab title="启用中" key="1" />
        <Tabs.Tab title="禁用中" key="0" />
        <Tabs.Tab title="已注销" key="-1" />
      </Tabs>

      <Table
        dataSource={data?.list ?? []}
        loading={isLoading}
        columns={[
          {
            title: "用户ID",
            dataIndex: "userId",
          },
          {
            title: "用户名",
            dataIndex: "userName",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
          },
          {
            title: "状态",
            dataIndex: "status",
          },
        ]}
        pagination={{
          total: data?.totalPage,
          pageSize: params.pageSize,
          current: params.page,
          onChange(page, pageSize) {
            search({ page, pageSize });
          },
        }}
      />
    </div>
  );
}
```

### antd-mobile

```jsx
import { useSearch } from "@dian/common/components/search-box";

function App() {
  const [search, params] = useSearch({
    name: "account-manage",
    defaultValue: {
      page: 1,
      pageSize: 10,
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey:["/nile/api/v1/user/users", params],
    queryFn: ({ queryKey }) => zApi.get(queryKey[0], { params }),
  });

  return <div>
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

    {
      data.map((item: any) => (
        <List.Item key={item.name}>
          <p>{item.name}</p>
        </List.Item>
      ))
    }
</div>
```

### useInfiniteBox

```jsx
const fetchList = async (params) => {
  const list = await zApi.get("url", { params });

  return {
    list,
    // v4 只能在响应中提供判断是否结束的字段
    nextPage: list.length < pageSize ? null : params.page + 1,
  };
};

function App() {
  const [search, params] = useSearch({
    initialValues: {
      tabs: "fruits",
    },
  });

  const queryKey = ["list", params];
  const infiniteQuery = useInfiniteQuery({
    queryKey,
    /** v5 */
    async queryFn({ pageParam }) {
      return await fetchList({ page: pageParam, ...params });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, page) =>
      lastPage.length < params.pageSize ? undefined : page + 1,
    /** v5 */

    /** v4 */
    async queryFn({ pageParam = 1 }) {
      return await fetchList({ page: pageParam, ...params });
    },
    getNextPageParam: (lastPage, _, page) => lastPage.nextPage,
    /** v4 */
  });

  const { infiniteScrollProps, pullToRefreshProps } = useInfiniteBox({
    queryKey,
    ...infiniteQuery,
  });

  return (
    <div>
      <SearchBar {...search("searchbar", { trigger: "onSearch" })} />

      <PullToRefresh {...pullToRefreshProps}>
        <List>
          {data?.pages?.map((group) =>
            group.list?.map((item: any) => (
              <List.Item key={item.name}>
                <p>{item.name}</p>
              </List.Item>
            ))
          )}
        </List>
      </PullToRefresh>

      <InfiniteScroll {...infiniteScrollProps} />
    </div>
  );
}
```

## API

### `useSearch(options: UseSearchOptions) => [search, params]`

```ts
type UseSearchOptions = {
  // Callback when search is triggered
  onSearch?: (params?: Params) => void;

  //  Callback after initial values are retrieved
  onInit?: (params?: Params) => void;

  //  Default values, lower priority than cached window.location values
  defaultValue?: Params;

  //  Query parameter name for recording and syncing with window.location
  name?: string;
};
```

### search

search 有两种调用方式

#### search(name: string, options?: SearchOptions) => {value: ParamValue, onChange: e => ParamValue }

- name: Parameter key
- options

  ```ts
  interface SearchOptions {
    // When useSearch collects values
    trigger?: string;

    // Event that triggers search
    searchTrigger?: string | string[];

    // Custom get value from onChange event
    getValueFromEvent?: (...args: any[]) => ParamValue;

    // Convert value before passing to component, will override valuePropsName
    getValueProps?: (value: any) => { [value: string]: any };

    // Rename prop for controlled value
    valuePropName?: string;
  }
  ```

#### search(obj: Record<string, any>)

Object params will merge with existing values, trigger search callback
