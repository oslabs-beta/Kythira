// Import rest and setupServer from msw(mock service worker) so that we can intercept fetch requests
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom'
// Polyfill "window.fetch" for use in the React components.
import 'whatwg-fetch'

const handlers = [

  rest.post('http://localhost:8080/user/login', (req, res, ctx) => {
    return res(ctx.json(false))
  }),
]

// Setup requests interception using the given handlers.
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})