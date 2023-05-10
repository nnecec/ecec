import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'

export const usePaginationBox = ({ queryKey, queryFn, ...rest }) => {
  const queryClient = useQueryClient()
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 0 }) => queryFn({ page: pageParam }),
      ...rest,
      getNextPageParam: (lastPage: any) => lastPage.nextPage,
    })

  return {
    data,
    error,
    InfiniteScroll: props => (
      <InfiniteScroll
        loadMore={async () => {
          await fetchNextPage()
        }}
        hasMore={!!hasNextPage && !isFetchingNextPage}
        {...props}
      />
    ),
    PullToRefresh: props => (
      <PullToRefresh onRefresh={() => queryClient.resetQueries({ queryKey })} {...props} />
    ),
  }
}
