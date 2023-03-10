interface ApiResponse<T> {
  data: T | null;
  errors: Array<string>;
}

export default ApiResponse;
