import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/stations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/weather-station/"!</div>
}
