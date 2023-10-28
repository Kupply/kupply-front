import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from '../Typography';

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles && newFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...Array.from(newFiles)]);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [selectedFiles]);

  return (
    <div style={{ position: 'relative' }}>
      {selectedFiles.length === 0 ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="92"
            height="70"
            viewBox="0 0 92 70"
            fill="none"
            style={{ position: 'absolute', left: '268px', top: '37px' }}
          >
            <path
              d="M61.3698 49L46.0365 35L30.7031 49"
              stroke="#E57C90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M46.0391 35V66.5"
              stroke="#E57C90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M78.2 57.3649C87.4767 52.7449 90.9267 42.1049 85.8667 33.6349C82.4934 27.9999 76.0534 24.4999 69.0384 24.4999H64.2084C59.9534 9.51995 43.24 0.524947 26.8334 4.40995C10.4267 8.29495 0.575035 23.5549 4.83004 38.4999C6.0567 42.7699 8.3567 46.7249 11.5384 50.0499"
              stroke="#E57C90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M61.3698 49L46.0365 35L30.7031 49"
              stroke="#E57C90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Typography size="mediumText" style={{ position: 'absolute', color: '#E57C90', top: '124px', left: '213px' }}>
            Drag and Drop to Upload
          </Typography>
        </div>
      ) : null}
      {selectedFiles.length > 0
        ? selectedFiles.map((file, index) => (
            <div>
              <Typography
                size="largeText"
                style={{
                  color: 'rgba(20, 20, 20, 0)',
                  opacity: 0.8,
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                빈공간만들기~
              </Typography>
              <Typography
                size="mediumText"
                style={{
                  color: 'var(--Main-Black, #141414)',
                  opacity: 0.8,
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                {file.name}
              </Typography>
            </div>
          ))
        : null}

      <Button onClick={handleFileSelect} {...rest}>
        {children}
      </Button>
      <InputFile type="file" id="fileInput" onChange={handleFileChange} />
    </div>
  );
}
