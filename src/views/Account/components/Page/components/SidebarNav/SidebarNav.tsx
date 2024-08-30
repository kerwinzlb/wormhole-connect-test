import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useMetaMask } from 'hooks/UseMetaMask';

const mock = [
  {
    groupTitle: 'Basic Info',
    id: 'business',
    pages: [
      {
        title: 'Account',
        href: '/account-info',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        ),
      },
    ],
  },
  {
    groupTitle: 'Governance Info',
    id: 'select-tools',
    pages: [
      {
        title: 'My Draft',
        href: '/account-myDraft',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        ),
      },
      {
        title: 'My Proposals',
        href: '/account-myGovernance',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        ),
      },
    ],
  },
  {
    groupTitle: 'Manager Info',
    id: 'manager',
    pages: [
      {
        title: 'Proposal Audit',
        href: '/manager-governanceAudit',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        ),
      },
    ],
  },
];

const SidebarNav = (): JSX.Element => {
  const theme = useTheme();
  const { userAddress } = useMetaMask();
  return (
    <Box
      padding={2}
      sx={{
        background: theme.palette.alternate.main,
      }}
    >
      {mock.map((item, i) => {
        if (
          process.env.managerAddress != null &&
          process.env.managerAddress.indexOf(userAddress.toLocaleLowerCase()) >
            -1
        ) {
          return (
            <Box key={i} marginBottom={3}>
              <Typography
                variant="caption"
                color={'text.secondary'}
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: theme.palette.alternate.main,
                  marginBottom: 1,
                  display: 'block',
                }}
              >
                {item.groupTitle}
              </Typography>
              <Box>
                {item.pages.map((p, i) => (
                  <Box marginBottom={1 / 2} key={i}>
                    <Button
                      component={'a'}
                      href={p.href}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'text.primary',
                      }}
                      startIcon={p.icon || null}
                    >
                      {p.title}
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        } else {
          if (item.id != 'manager') {
            return (
              <Box key={i} marginBottom={3}>
                <Typography
                  variant="caption"
                  color={'text.secondary'}
                  sx={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: theme.palette.alternate.main,
                    marginBottom: 1,
                    display: 'block',
                  }}
                >
                  {item.groupTitle}
                </Typography>
                <Box>
                  {item.pages.map((p, i) => (
                    <Box marginBottom={1 / 2} key={i}>
                      <Button
                        component={'a'}
                        href={p.href}
                        fullWidth
                        sx={{
                          justifyContent: 'flex-start',
                          color: 'text.primary',
                        }}
                        startIcon={p.icon || null}
                      >
                        {p.title}
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          }
        }
      })}
    </Box>
  );
};

export default SidebarNav;
