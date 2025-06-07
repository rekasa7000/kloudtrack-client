import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/_superadmin/system/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(root)/audit-logs/"!</div>
}
