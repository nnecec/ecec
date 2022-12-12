import { useSearch } from "@afojs/search";
import { Card, Input, Spin, Switch, Tabs } from "antd";
import useSWR from "swr";

const fetcher = (params: Record<string, any>) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(
        Object.entries(params)
          .map(([key, value]) => `${key}: ${value}`)
          .join(",")
      );
    }, 1500);
  });

export const SearchExample = () => {
  const [pa, ra] = useSearch("sectionA");
  const [pb, rb] = useSearch("sectionB");

  const { data: da, isLoading: la } = useSWR(["sectionA", pa], () =>
    fetcher(pa)
  );
  const { data: db, isLoading: lb } = useSWR(["sectionA", pb], () =>
    fetcher(pb)
  );

  return (
    <div>
      <Card title="Section A">
        <input
          type="text"
          {...ra("name", {
            getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.value,
          })}
        />
        <Input type="text" {...ra("description")} />

        <Tabs
          items={[
            {
              label: `Tab 1`,
              key: "1",
            },
            {
              label: `Tab 2`,
              key: "2",
            },
            {
              label: `Tab 3`,
              key: "3",
            },
          ]}
          {...ra("tab", { valuePropName: "activeKey" })}
        ></Tabs>

        <Switch
          {...ra("opened", {
            valuePropName: "checked",
          })}
        />

        <div>get string from params: {la ? <Spin /> : da}</div>
      </Card>
      <Card title="Section B">
        <input type="text" {...rb("name")} />
        <Input type="text" {...rb("description")} />

        <Tabs
          items={[
            {
              label: `Tab 1`,
              key: "1",
            },
            {
              label: `Tab 2`,
              key: "2",
            },
            {
              label: `Tab 3`,
              key: "3",
            },
          ]}
          {...rb("tab", { valuePropName: "activeKey" })}
        ></Tabs>

        <Switch
          {...rb("opened", {
            valuePropName: "checked",
          })}
        />
      </Card>

      <div>get string from params: {lb ? <Spin /> : db}</div>
    </div>
  );
};
