import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/user-management/"!</div>
}
