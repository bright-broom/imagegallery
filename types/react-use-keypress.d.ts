declare module 'react-use-keypress' {
  type KeypressCallback = () => void;
  type KeypressHook = (key: string | string[], callback: KeypressCallback) => void;
  const useKeypress: KeypressHook;
  export default useKeypress;
}