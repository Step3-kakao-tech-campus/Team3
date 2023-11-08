"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import AuthCheckbox from "@/components/atoms/AuthCheckBox";
import InputBox from "@/components/molecules/InputBox";
import DropdownBox from "@/components/molecules/DropdownBox";
import { validateEmail, validatePassword, validateName, validatePasswordConfirm } from "@/utils/validation";
import Logo from "public/images/bowling_logo.png";
import BlankBar from "@/components/atoms/BlankBar";
import { useRouter } from "next/navigation";

import { postLogin, postRegister } from "@/apis/sign";
import { useMutation } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import { setLogin } from "@/utils/user";
import getApiErrorMsg from "@/utils/getApiErrorMsg";

function SignupForm(): JSX.Element {
  const router = useRouter();
  const { addSuccessToast, addWarningToast, addErrorToast } = useToast();

  const [errMsg, setErrMsg] = useState("");
  const [consentChecked, setConsentChecked] = useState(false); // 동의 체크 상태
  const [confirmPassword, setConfirmPassword] = useState("");
  const [regionIds, setRegionIds] = useState({ cityId: -1, countryId: -1, districtId: -1 }); // 선택된 지역 ID

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    districtId: regionIds.districtId,
  });

  const { mutate } = useMutation(postRegister);
  const { mutate: callPostLogin } = useMutation(postLogin, {
    retry: 3,
    onSuccess: (res) => {
      setLogin(res.headers.authorization).then(() => {
        router.refresh();
        router.push("/email-verification/send");
      });
    },
    onError: () => {
      addWarningToast("로그인 후 이메일 인증을 해주세요.");
    },
  });

  const handleInputChange = useCallback((fieldName: string, value: string | number) => {
    if (fieldName === "confirmPassword") {
      // 'confirmpassword' 필드의 값을 설정
      setConfirmPassword(value as string);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.email || !formData.password || !formData.name || !confirmPassword) {
      setErrMsg("모든 항목을 입력해주세요.");
    } else if (!validateEmail(formData.email)) {
      setErrMsg("이메일 형식이 올바르지 않습니다.");
    } else if (!validateName(formData.name)) {
      setErrMsg("닉네임은 한글, 영문, 숫자만 가능하며 20자 이하로 입력해주세요.");
    } else if (!validatePassword(formData.password)) {
      setErrMsg("비밀번호는 영문,숫자, 특수문자가 모두 포함 8자 이상 20자 이하로 입력해주세요.");
    } else if (!validatePasswordConfirm(formData.password, confirmPassword)) {
      setErrMsg("비밀번호가 일치하지 않습니다.");
    } else if (regionIds.districtId <= 0) {
      setErrMsg("읍/면/동 단위까지 지역 선택이 필요합니다.");
    } else if (!consentChecked) {
      setErrMsg("개인정보 수집 및 이용에 동의해주세요.");
    } else {
      mutate(formData, {
        onSuccess: () => {
          addSuccessToast("회원가입에 성공했습니다.");
          router.back();
          router.refresh();
          callPostLogin(formData);
        },
        onError: (err) => {
          const errorMessage = getApiErrorMsg(err);
          if (errorMessage) addErrorToast(errorMessage);
          else addErrorToast("회원가입 요청이 실패했습니다.");
        },
      });
    }
  }, [
    formData,
    confirmPassword,
    regionIds.districtId,
    consentChecked,
    mutate,
    addSuccessToast,
    router,
    callPostLogin,
    addErrorToast,
  ]);

  useEffect(() => {
    handleInputChange("districtId", regionIds.districtId);
  }, [handleInputChange, regionIds.districtId]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSubmit();
    },
    [handleSubmit],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div>
      <div className="flex items-center justify-center pb-[22px]">
        <Image src={Logo} alt="볼링 로고" width={50} height={50} />
        <h1 className="text-[40px] text-transparent bg-clip-text bg-thunder md:text-2xl">번개볼링</h1>
      </div>

      <div>
        {/* 이메일 입력란 */}
        <InputBox
          inputs={[
            {
              type: "email",
              placeholder: "이메일",
              className: "w-full py-2 px-3 rounded-lg border border-gray-400 md:text-sm",
            },
            {
              type: "name",
              placeholder: "닉네임",
              className: "w-full py-2 px-3 rounded-lg border border-gray-400 md:text-sm",
            },
            {
              type: "password",
              placeholder: "비밀번호",
              className: "w-full py-2 px-3 rounded-lg border border-gray-400 md:text-sm",
            },
            {
              type: "confirmPassword",
              placeholder: "비밀번호 확인",
              className: "w-full py-2 px-3 rounded-lg border border-gray-400 md:text-sm",
            },
          ]}
          onInputChange={(type, value) => handleInputChange(type, value)} // Pass the input change handler
        />
      </div>
      {/* 지역 선택 */}
      <DropdownBox selectedOptionIds={regionIds} setSelectedOptionIds={setRegionIds} styleType="small" />

      <BlankBar />
      {/* 개인 정보 수집 및 이용 동의 체크박스 */}
      <div className="mb-4">
        <AuthCheckbox checked={consentChecked} onChange={(isChecked) => setConsentChecked(isChecked)} />
      </div>

      <div>
        <p className="text-[#ff003e] text-sm whitespace-pre-line">{errMsg}</p>
      </div>
      <BlankBar />

      {/* 제출 버튼 */}
      <div className="flex justify-center">
        <Button styleType="thunder" rounded="full" size="lg" onClick={handleSubmit}>
          회원가입
        </Button>
      </div>
    </div>
  );
}

export default SignupForm;
