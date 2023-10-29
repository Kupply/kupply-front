import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export interface ImgCtrlButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode;
}

const InputFile = styled.input`
  display: none;
`;

const Button = styled.button<ImgCtrlButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(223, 223, 223, 0.5);
  color: #434343;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;

  &:hover {
    // While hovering
    // Change to: "Hover";
    // Animate: Dissolve;
    animation-timing-function: ease-in-out;
    animation-duration: 300ms;
    background: var(--primary-10, rgba(216, 88, 136, 0.1));
    color: #d85888;
  }

  &:active {
    animation-timing-function: ease-in-out;
    animation-duration: 300ms;
    background: var(--primary-10, rgba(216, 88, 136, 0.1));
    color: #d85888;
  }
`;

function ImgCtrlButton(props: ImgCtrlButtonProps) {
  const { children = '사진 업로드', ...rest } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;

    if (newFiles) {
      const newFile = newFiles[0];
      if (newFile) {
        if (newFile.type.startsWith('image/')) {
          setSelectedFile(newFile);
        } else {
          alert('이미지 파일만 업로드할 수 있습니다.');
        }
      }
    }
  };

  useEffect(() => {
    // 이미지 업로드 완료 후 동작 수행
    if (!isLoading && selectedFile) {
      // 이미지 업로드 완료 후 관련 동작 수행
    }
  }, [isLoading, selectedFile]);

  return (
    <div>
      <Button onClick={handleFileSelect}>{children}</Button>
      <InputFile
        type="file"
        id="fileInput"
        accept="image/*" // 이미지 파일만 허용
        onChange={handleFileChange}
      />
    </div>
  );
}

function ImgDelButton(props: ImgCtrlButtonProps) {
  const { children = '삭제', ...rest } = props;
  return <Button {...rest}>{children}</Button>;
}

export { ImgCtrlButton, ImgDelButton };
