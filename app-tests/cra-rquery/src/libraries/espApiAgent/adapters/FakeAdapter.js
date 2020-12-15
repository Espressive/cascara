class FakeAxiosAdapter {
  baseURL = '';
  queue = new Map();
  mocks = new Map();

  init(baseURL, mocks) {
    this.mocks = new Map(mocks);
    this.baseURL = baseURL;
  }

  handleRequest(config) {
    return new Promise((resolvePromise, rejectPromise) => {
      const { baseURL, data, url, method } = config;
      const stringifiedData = data ? JSON.stringify(data) : '';
      const finalUrl = `${method} ${baseURL}${url} ${stringifiedData}`;

      const thereIsAMockForThisRequest = this.mocks.has(finalUrl);
      const requestHasAMatchInQueue = this.queue.has(finalUrl);
      const { config: mockConfig, response } = requestHasAMatchInQueue
        ? this.queue.get(finalUrl)
        : thereIsAMockForThisRequest
        ? this.mocks.get(finalUrl)
        : {};

      if (!response) {
        rejectPromise(`No mock for: ${finalUrl}`);
      }

      mockConfig.once && this.queue.delete(finalUrl);

      mockConfig.shouldError
        ? rejectPromise(response)
        : resolvePromise(response);
    });
  }

  clear() {
    this.queue.clear();
  }

  enqueue(options, response) {
    const baseURL = this.baseURL;
    const { data, method = 'get', url, ...rest } = options;
    const stringifiedData = data ? JSON.stringify(data) : '';

    const key = `${method} ${baseURL}${url} ${stringifiedData}`;

    this.queue.add(key, {
      response,
      config: rest,
    });
  }
}

export const fakeAxiosAdapter = new FakeAxiosAdapter();
