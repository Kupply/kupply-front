import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Typography from '../../../assets/Typography';

import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

/*
DB에 저장된 회원정보 목록
[users.json]
# 공통 (6가지)
-이름 (name) /
-20자리 학번 (studentID) /
-이메일 (email)
-1전공 (firstMajor-name) /
-닉네임 (nickname-name) /
-회원구분 (role) /

# passer 만 해당 (3가지)
-2전공 (secondMajor) /
-합격학기 (passSemester)
-합격학점 (passGPA)

# candidate 만 해당 (5,6가지)
-1지망전공 (hopeMajor1-name)
-2지망전공 (hopeMajor2-name)
-희망지원학기 (hopeSemester)
-현재학점 (curGPA)
-바뀐학점 (changeGPA)
-모의지원여부 (isApplied/boolean)

*/

interface UserTableRowProps {
  selected: boolean;
  role: string;
  name: string;
  nickname: string;
  studentID: string;
  firstMajor: string;
  secondMajor: string;
  email: string;
  handleClick: () => void;
}

export default function UserTableRow({
  selected,
  role,
  name,
  nickname,
  studentID,
  firstMajor,
  secondMajor,
  email,
  handleClick,
}: UserTableRowProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>
          <Label color={(role === 'passer' && 'error') || 'success'}>{role}</Label>
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{nickname}</TableCell>

        <TableCell>{studentID}</TableCell>

        <TableCell>{firstMajor}</TableCell>

        <TableCell>{secondMajor}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

/*
interface UserTableRowProps {
  selected: boolean;
  name: string;
  avatarUrl: string;
  company: string;
  role: string;
  isVerified: boolean;
  status: string;
  handleClick: () => void;
}

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  company,
  role,
  isVerified,
  status,
  handleClick,
}: UserTableRowProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

*/
