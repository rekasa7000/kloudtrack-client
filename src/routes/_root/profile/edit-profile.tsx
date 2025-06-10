import { createFileRoute } from '@tanstack/react-router'
import EditProfile from '@/components/profile/edit-profile'

export const Route = createFileRoute('/_root/profile/edit-profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div>
      <EditProfile/>
    </div>
  )
}
