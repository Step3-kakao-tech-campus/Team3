"use client";

import Image from "next/image";
import ModalWrapper from "..";

interface Props {
  imagePath: string;
  onDismiss: () => void;
}

function ImageModal({ imagePath, onDismiss }: Props) {
  return (
    <ModalWrapper noPadding onDismiss={onDismiss}>
      <Image
        alt="스코어 이미지"
        src={imagePath}
        width={400}
        height={400}
        className="md:max-w-[280px] md:max-h-[280px]"
      />
    </ModalWrapper>
  );
}

export default ImageModal;
