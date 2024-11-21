import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../app/page'

vi.mock('@clerk/nextjs', () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: async () =>
      new Promise((resolve) =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
      ),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  }

  return mockedFunctions
})

vi.mock('@clerk/nextjs/server', async () => {
  return {
    auth: async () => {
      const object = {
        sessionId: 'sess_2GaMqUCB3Sc1WNAkWuNzsnYVVEy',
        userId: 'user_2F2u1wtUyUlxKgFkKqtJNtpJJWj',
        orgId: null,
        orgRole: null,
        orgSlug: null,
        orgPermissions: null,
        has: function () {},
        getToken: async function () {},
        claims: {
          azp: 'http://localhost:3000',
          exp: 1666622607,
          iat: 1666622547,
          iss: 'https://clerk.quiet.muskox-85.lcl.dev',
          nbf: 1666622537,
          sid: 'sess_2GaMqUCB3Sc1WNAkWuNzsnYVVEy',
          sub: 'user_2F2u1wtUyUlxKgFkKqtJNtpJJWj',
        },
      }
      return object
    },
  }
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  }
})

vi.mock('server-only', () => {
  return {}
})

test('Home', async () => {
  render(await Home())
  expect(screen.getByText('The best Journal app, period.')).toBeTruthy()
})
