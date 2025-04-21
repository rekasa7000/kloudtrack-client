import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/monitoring/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/system-monitor/"!</div>
}
