"use client";

import { getMyProfile } from "@/apis/profile";
import Button from "@/components/atoms/Button";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ProfileLink from "@/components/atoms/ProfileLink";
import { deleteToken } from "@/utils/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  onClickLogout: () => void;
}

function AuthUserProfile({ onClickLogout }: Props) {
  const { data } = useQuery(["/api/users/mine"], getMyProfile);
  const router = useRouter();

  const handleLogout = () => {
    deleteToken();
    onClickLogout();
    router.refresh();
    router.push("/");
  };

  return (
    <>
      <ProfileLink userId={data?.data?.response?.id} className="flex items-center gap-1">
        <CircularProfileImage src={data?.data?.response?.profileImage} />
        <span className="text-sm text-gray-500 hover:underline md:w-0 md:invisible">
          {data?.data?.response?.name}님
        </span>
      </ProfileLink>
      <Button styleType="white" rounded="md" size="sm" onClick={handleLogout}>
        로그아웃
      </Button>
    </>
  );
}

export default AuthUserProfile;
