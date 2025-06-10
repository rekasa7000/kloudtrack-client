import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/profile/change-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_root/profile/change-password"!</div>
}
