import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export interface UploadButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isClicked: boolean;
  children?: React.ReactNode;
}

const Button = styled.button<UploadButtonProps>`
  display: flex;
  width: 170px;
  height: 36px;
  border-radius: 3.638px;
  padding: 8px 26px;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 111.111%;

  ${({ isClicked }) =>
    isClicked
      ? `
      background: #d85888;
      color: #FFF;
      `
      : `
      background: none;
      color: #d85888;
    `};
`;

const InputFile = styled.input`
  display: none;
`;

export default function UploadButton(props: UploadButtonProps) {
  const { children = '첨부 파일 업로드', ...rest } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      // 파일을 선택한 후 파일 상태 업데이트
      setSelectedFile(selectedFile);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [selectedFile]);

  return (
    <div style={{ position: 'relative' }}>
      <Button onClick={handleFileSelect} {...rest}>
        {children}
      </Button>
      <InputFile type="file" id="fileInput" onChange={handleFileChange} />
    </div>
  );
}
