import { createFileRoute } from "@tanstack/react-router";

import UserProfile from "@/components/profile/user-profile";


export const Route = createFileRoute("/_root/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return(
    <div>
      <UserProfile/>
    </div>
  ) 
}
