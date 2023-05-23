import { Button } from 'antd-mobile'

export const usePickerBox = () => {
  return {
    children: ([value], { open }) => (
      <Button onClick={open} block fill="none">
        {value ? value.label : '请选择'}
      </Button>
    ),
  }
}
