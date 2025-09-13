import { Link, useRouter } from '@tanstack/react-router'
import { LogOut, LogIn } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'

export default function Header() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState<string | null>('')

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [error])

  const handleLogout = async () => {
    setError('')
    setIsLoggingOut(true)
    try {
      const response = await authClient.signOut()
      if (response.error) {
        setError(response.error.message || 'Failed to logout')
      } else {
        router.navigate({ to: '/' })
      }
    } catch (error) {
      setError('Failed to logout')
      console.error('Error logging out', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleLogin = () => {
    router.navigate({ to: '/signin' })
  }

  return (
    <>
      <header className="flex gap-2 justify-between bg-base-300">
        <nav className="navbar">
          <div className="navbar-start">
            <div className="px-2">
              <Link to="/" activeProps={{ className: 'text-primary font-bold' }}>Home</Link>
            </div>
            <div className="px-2">
              <Link to="/todos" activeProps={{ className: 'text-primary font-bold' }}>Todos</Link>
            </div>
          </div>
          <div className="navbar-end">
            {isPending ? (
              <button className="btn btn-ghost" disabled>
                <span className="loading loading-spinner loading-sm"></span>
              </button>
            ) : session ? (
              <button 
                className="btn btn-ghost" 
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Logout"
              >
                {isLoggingOut ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <LogOut className='size-5 hover:text-warning'/>
                )}
              </button>
            ) : (
              <button 
                className="btn btn-ghost" 
                onClick={handleLogin}
                title="Login"
              >
                <LogIn className='size-5 hover:text-primary'/>
              </button>
            )}
          </div>
        </nav>
        {
          error && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            </div>
          )
        }
      </header>
    </>
  )
}