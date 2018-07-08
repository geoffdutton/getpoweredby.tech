const fakeAxios = jest.fn(() => {
  return Promise.resolve(fakeAxios.__mockResponse)
})
fakeAxios.__mockResponse = { data: {} }
fakeAxios.defaults = {
  headers: {
    common: {}
  }
}
export default fakeAxios
