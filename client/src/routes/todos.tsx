import { createFileRoute, useRouter } from '@tanstack/react-router'
import { hc } from 'hono/client'
import type { AppType } from '../../../server/index'
import { useQuery } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const client = hc<AppType>('/')

export const Route = createFileRoute('/todos')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  if (!session) {
    router.navigate({ to: '/signin' })
    return null
  }
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await client.api.todos.$get()
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      return response.json()
    },
    initialData: [],
  })
  return (
    <div className="flex flex-col items-center p-10">
        {
            isError && (
                <div role='alert' className='alert alert-error'>
                    <CircleX className='w-4 h-4' />
                    <span>{error.message}</span>
                </div>
            )
        }
      <div className='space-y-3 p-6'>
        {
            isLoading && (
                <>
                    {
                        [1,2,3,4,5].map(()=> (
                            <div className="flex items-center gap-2">
                                <div className="skeleton h-6 w-6 rounded-full"></div>
                                <div className="skeleton h-6 w-32"></div>
                            </div>
                        ))
                    }
                </>
            )
        }
        {data?.map((todo) => (
          <div className="flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-warning" />
            <span key={todo.id}>{todo.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
