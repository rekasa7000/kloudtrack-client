import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/dashboard/map')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_root/dashboard/map"!</div>
}
