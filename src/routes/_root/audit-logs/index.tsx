import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/audit-logs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(root)/audit-logs/"!</div>
}
