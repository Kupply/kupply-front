import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from '../Typography';

/* 버튼 커스텀은 나중에 .... 어려웡 ㅜㅜ  */

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
    const newFiles = e.target.files;
    if (newFiles && newFiles.length > 0) {
      const newFile = newFiles[0];
      setSelectedFile(newFile);
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
      {selectedFile! ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '63px', marginLeft: '279px' }}
          >
            <path
              d="M40.8346 5.83398H17.5013C15.9542 5.83398 14.4705 6.44857 13.3765 7.54253C12.2826 8.63649 11.668 10.1202 11.668 11.6673V58.334C11.668 59.8811 12.2826 61.3648 13.3765 62.4588C14.4705 63.5527 15.9542 64.1673 17.5013 64.1673H52.5013C54.0484 64.1673 55.5321 63.5527 56.6261 62.4588C57.7201 61.3648 58.3346 59.8811 58.3346 58.334V23.334L40.8346 5.83398Z"
              stroke="#E57C90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M35 52.5V35" stroke="#E57C90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M26.25 43.75H43.75"
              stroke="#E57C90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M40.832 5.83398V23.334H58.332"
              stroke="#E57C90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Typography
            size="mediumText"
            style={{
              display: 'flex',
              color: '#E57C90',
              marginTop: '5px',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedFile.name}
          </Typography>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="92"
            height="70"
            viewBox="0 0 92 70"
            fill="none"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '37px', marginLeft: '268px' }}
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

          <Typography
            size="mediumText"
            style={{
              display: 'flex',
              color: '#E57C90',
              marginTop: '17px',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            학업계획서를 첨부해주세요 (선택)
          </Typography>
          <button></button>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{
              position: 'absolute',
              top: '130px',
              left: '231px',
            }}
          />
        </div>
      )}
    </div>
  );
}
