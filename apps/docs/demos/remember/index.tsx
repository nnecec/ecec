import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackConsole,
} from '@codesandbox/sandpack-react'

export const RememberExample = () => {
  const files = {
    '/index.js': `console.log('Hello world!')`
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
