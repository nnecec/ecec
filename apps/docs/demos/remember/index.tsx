import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackProvider,
} from '@codesandbox/sandpack-react'

export const RememberExample = () => {
  const files = {
    '/index.js': 'console.log(\'Hello world!\')',
  }
  return (
    <SandpackProvider files={files} theme="auto" template="vanilla">
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackConsole />
      </SandpackLayout>
    </SandpackProvider>
  )
}
