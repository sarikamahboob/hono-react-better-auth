import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Mail, KeyRound, CircleX } from 'lucide-react'
import { authClient } from '../lib/auth-client'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if(session){
    router.navigate({ to: '/todos' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      const response = await authClient.signIn.email({
        email,
        password
      })

      if(!response.error) {
        router.navigate({ to: '/todos' })
      } else {
        setError(response.error.message || 'Failed to sign in')
      }
    } catch (error) {
      setError('Failed to sign in')
      console.error('Error signing in', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mx-auto bg-base-100 flex justify-center items-center pt-10 '>
      <div className="card bg-base-300 max-w-md shadow-sm">
        <div className="card-body p-12">
          <div className='flex justify-center items-center flex-col'>
            <p className="card-title text-2xl px-4">Welcome Back</p>
            <p className='my-2 text-base-content/70'>Sign in to your account</p>
          </div>
          {
            error && (
              <div role='alert' className='alert alert-error'>
                <CircleX className='w-4 h-4' />
                <span>Error: {error}</span>
              </div>
            )
          }
          <form onSubmit={handleSubmit}>
            <div className=''>
              <label className="input validator">
                <Mail />
                <input 
                  id='email'
                  type="email" 
                  placeholder="mail@site.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </label>
              <div className="validator-hint hidden">Enter valid email address</div>
            </div>
            <div className=' mt-2'>
              <label className="input validator">
                <KeyRound />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be 8 characters long"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </label>
              <p className="validator-hint hidden">
                Must be 8 characters long
              </p>
            </div>
            <div className="card-actions mt-4">
              <button type="submit" className="w-full btn btn-primary" disabled={isLoading}>
                {isLoading ? <>
                  <span className="loading loading-spinner loading-xs"></span>
                  <span className='ml-2'>Signing in...</span>
                </> : 'Sign In'}
              </button>
            </div>
          </form>
          <div className='mt-4 text-center'>
            <p className='text-base-content/70'>
              Don't have an account?
              <Link to="/signup" className='ml-2 link link-primary'>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
