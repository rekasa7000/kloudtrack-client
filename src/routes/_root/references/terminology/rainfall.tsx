import { createFileRoute } from '@tanstack/react-router'
import Reference from '@/components/references/reference'
export const Route = createFileRoute('/_root/references/terminology/rainfall')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div className='w-full'>
      <Reference/>
    </div>
  )
}
