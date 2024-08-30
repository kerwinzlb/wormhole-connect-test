import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Container from 'components/Container';

const PricingCompareTable = (): JSX.Element => {
  const [itemRatio, setItemRatio] = useState([]);
  const [itemPercentage, setItemPercentage] = useState([]);

  //获取票数详情
  async function getUserVoteCountlList() {
    setItemRatio([]);
    const res = await fetch(`${process.env.apiHost}/getTotalVoteCountList`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const result = await res.json();
    if (result.success) {
      setItemRatio(result.data.itemRatio);
      setItemPercentage(result.data.itemPercentage);
    } else {
      console.log(result.message, { icon: 2 }); //失败
    }
  }

  useEffect(() => {
    getUserVoteCountlList(); // 在组件加载时调用 fetchData 函数
  }, []); //

  return (
    <Container>
      <Box>
        <Box marginBottom={4}>
          <Typography fontWeight={700} variant={'h5'}>
            Total veNFT power calculation and weighting
          </Typography>
        </Box>
        <Box>
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="caption table" sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontWeight: 'medium' }}>
                      veNFT Source
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontWeight: 'medium' }}>
                      Percentage
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontWeight: 'medium' }}>
                      Calculation
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Location NFT
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {itemPercentage && itemPercentage['nft'] * 100}%
                  </TableCell>
                  <TableCell component="th" scope="row">
                    1
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Staked GEOD
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {itemPercentage && itemPercentage['supperHexStaking'] * 100}
                    %
                  </TableCell>
                  <TableCell component="th" scope="row">
                    1:{itemRatio && itemRatio['supperHexStaking']}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Locked GEOD
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {itemPercentage && itemPercentage['investor'] * 100}%
                  </TableCell>
                  <TableCell component="th" scope="row">
                    -
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default PricingCompareTable;
