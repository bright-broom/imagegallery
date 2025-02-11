declare module "imagemin-jpegtran" {
  interface Options {
    progressive?: boolean;
  }
  
  function jpegtran(options?: Options): (input: Buffer) => Promise<Buffer>;
  
  export default jpegtran;
}
