import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, Toast } from 'antd-mobile'

export const useConfirmBox = ({ resetKey, mutationFn, title, ...props }) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn,
    onSuccess() {
      // 跳转到列表页
      Toast.show('操作成功')
      queryClient.resetQueries(resetKey)
    },
    onError(err: any) {
      Toast.show(`操作失败：${err.message}`)
    },
  })
  return (data: any) => {
    Dialog.confirm({
      title: title ? (title(data) as string) : '提示',
      content: '确认操作吗?',
      ...props,
      onConfirm: async () => {
        await mutate(data)
      },
    })
  }
}
