import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/_admin/organization/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(root)/organization/"!</div>
}
