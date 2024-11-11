import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { getAuthedUserAndProfile } from "@/utils/supabase/server";
import { CircleUser, CircleUserIcon, CircleUserRound, User, User2 } from "lucide-react";
import { DropdownMenu } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default async function AuthButton() {
  const user = await getAuthedUserAndProfile();

  if (!user) {
    return (
    <NoUser/>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="square border border-white rounded-md  p-2 flex flex-row gap-x-4">
        <CircleUserRound />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex gap-2 flex-col border border-white justify-center p-2 mt-2">
          <UserExists name={user.profile.name} id={user.profile.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NoUser() {
  return (
    <div className="flex flex-row gap-2">
      <Link href="/sign-in">
        <Button variant="ghost" className="mx-auto">Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button  className="">Sign up</Button>
      </Link>
    </div>
  );
}

function UserExists({ id, name }: { id: string; name: string }) {
  return (
    <>
      <Link href={`/profile/${id}`}>
        <Button className="">{name}</Button>
      </Link>
      <Button formAction={signOutAction} className="">
        Sign Out
      </Button>
    </>
  );
}
