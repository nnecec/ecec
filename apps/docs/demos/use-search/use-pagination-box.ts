import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

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
    infiniteScrollProps: {
      loadMore: async () => {
        await fetchNextPage()
      },
      hasMore: !!hasNextPage && !isFetchingNextPage,
    },
    pullToRefreshProps: {
      onRefresh: () => queryClient.resetQueries({ queryKey }),
    },
  }
}
