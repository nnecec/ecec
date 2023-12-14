import type { QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

type Props = {
  queryKey?: QueryKey
} & ReturnType<typeof useInfiniteQuery>

export const useInfiniteBox = ({ queryKey, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching }: Props) => {
  const queryClient = useQueryClient()

  return {
    infiniteScrollProps: {
      async loadMore() {
        if (isFetchingNextPage) return
        await fetchNextPage()
      },
      hasMore: !!hasNextPage /** on scroll */ || (isFetching && !hasNextPage) /** first load */,
    },
    pullToRefreshProps: {
      async onRefresh() {
        if (queryKey) await queryClient.resetQueries({ queryKey })
      },
    },
  }
}
