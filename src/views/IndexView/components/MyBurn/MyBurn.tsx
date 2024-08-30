/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-empty */
/* eslint-disable no-var */
/* eslint-disable react/jsx-key */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import Container from 'components/Container';

import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useMetaMask } from 'hooks/UseMetaMask';
//import { checkLogin } from 'hooks/UserUtils';
import { toDateStr, formatAddress } from 'hooks/Utils';

const MyBurn = (): JSX.Element => {
  const [burnList, setBurnList] = useState([]); // 初始化空列表

  const { userAddress, explorerUrl } = useMetaMask();

  useEffect(() => {
    fetchListData(); // 在组件加载时获取列表数据
  }, [userAddress]);

  const fetchListData = async () => {
    if (userAddress) {
      await fetch(`${process.env.apiHost}/findCryptoBurnList`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // 根据需要设置合适的 Content-Type
        },
        body: JSON.stringify({
          page: 1,
          rows: 100000,
		  userAddress: userAddress.toLowerCase(),
        }), // 将需要发送的数据转换成 JSON 格式
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {

            setBurnList(data.data.records);
          }
        });
    }
  };

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }

  //分页
  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - burnList.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
	<Container>

        <Box>
		<Box paddingY={4}>
            <Divider />
          </Box>
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography variant="h6" fontWeight={700}>
             My Crypto Burn
            </Typography>
			
			<IconButton onClick={fetchListData} color="primary">
				<RefreshIcon />
			</IconButton>
          </Box>
          

          <Box sx={{ width: '100%' }}>
            <Container>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                  <TableHead sx={{ bgcolor: 'alternate.dark' }}>
                    <TableRow>
					<TableCell>
                        <Typography
                          variant={'caption'}
                          fontWeight={700}
                          sx={{ textTransform: 'uppercase' }}
                        >
                          Hash
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant={'caption'}
                          fontWeight={700}
                          sx={{ textTransform: 'uppercase' }}
                        >
                          User
                        </Typography>
                      </TableCell>
					  <TableCell style={{ width: '100px' }}>
  	                      <Typography
  	                        variant={'caption'}
  	                        fontWeight={700}
  	                        sx={{ textTransform: 'uppercase' }}
  	                      >
  	                        Token Type
  	                      </Typography>
  	                    </TableCell>
					  <TableCell style={{ width: '100px' }}>
	                      <Typography
	                        variant={'caption'}
	                        fontWeight={700}
	                        sx={{ textTransform: 'uppercase' }}
	                      >
	                        Crypto Amount
	                      </Typography>
	                    </TableCell>
                      <TableCell>
                        <Typography
                          variant={'caption'}
                          fontWeight={700}
                          sx={{ textTransform: 'uppercase' }}
                        >
                          Burn GEOD
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant={'caption'}
                          fontWeight={700}
                          sx={{ textTransform: 'uppercase' }}
                        >
                          Burn Time
                        </Typography>
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? burnList.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                      : burnList
                    ).map((item, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:nth-of-type(2n)': { bgcolor: 'alternate.main' },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography variant={'subtitle2'} fontWeight={700}>
                            <a href = {explorerUrl + '/tx/'+ item['hash']} style={{ textDecoration: 'none' }}>
							{formatAddress(item['hash'])}
							</a>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color={'text.secondary'}
                            variant={'subtitle2'}
                            style={{ width: '8rem' }}
                          >
						  {formatAddress(item['userAddress'])}
                            
                          </Typography>
                        </TableCell>
						<TableCell>
                          <Typography
                            color={'text.secondary'}
                            variant={'subtitle2'}
                            style={{ width: '8rem' }}
                          >
						  {item['tokenType']}
                          </Typography>
                        </TableCell>
						<TableCell>
                          <Typography
                            color={'text.secondary'}
                            variant={'subtitle2'}
                            style={{ width: '8rem' }}
                          >
						  {item['burnAmount']}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color={'text.secondary'}
                            variant={'subtitle2'}
                          >
                            {item['burnGeod']}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color={'text.secondary'}
                            variant={'subtitle2'}
                          >
						  {toDateStr(item['burnTime'])}
						  
                          </Typography>
                        </TableCell>

                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        style={{ overflowX: 'hidden' }}
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: 'All', value: -1 },
                        ]}
                        colSpan={3}
                        count={burnList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Container>
          </Box>
        </Box>
		</Container>
  );
};

export default MyBurn;

