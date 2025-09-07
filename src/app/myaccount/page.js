import { redirect } from "next/navigation";

function MyAccountPage() {
  redirect("/myaccount/my_profile");
}

export default MyAccountPage;