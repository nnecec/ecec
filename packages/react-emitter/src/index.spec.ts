import { useEmitter } from '.'

describe('useEmitter', () => {
  it('should export Emitter(class), emitter(function)', () => {})

  it('should accept an optional event handler map', () => {})
})

type Events = {
  foo: string;
  bar?: number;
};

export const App = () => {
  const emitter = useEmitter<Events>()
}