declare module "*?worker&inline" {
  const worker: new () => Worker;
  export default worker;
}
