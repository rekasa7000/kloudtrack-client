import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/configuration/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/configuration/"!</div>
}
