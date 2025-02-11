declare module "react-use-keypress" {
  const useKeypress: (
    keys: string | string[],
    callback: (event: KeyboardEvent) => void,
    options?: { preventDefault?: boolean; repeat?: boolean }
  ) => void;
  export default useKeypress;
}
