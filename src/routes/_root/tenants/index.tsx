import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/tenants/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/tenant-management/"!</div>
}
