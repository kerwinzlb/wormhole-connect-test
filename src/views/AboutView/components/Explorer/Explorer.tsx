/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CountUp from 'react-countup';
//import { useTheme } from '@mui/material/styles';

const Explorer = (): JSX.Element => {
  const initData = [
    {
      title: 'Location NFT',
      number: 0,
      desc: 'veNFT',
      img: '/images/index/nft.png',
    },
    {
      title: 'Staked GEOD',
      number: 0,
      desc: 'veNFT',
      img: '/images/index/staking.png',
    },
    {
      title: 'Locked GEOD',
      number: 0,
      desc: 'veNFT',
      img: '/images/index/investors.png',
    },
  ];
  const [data, setData] = useState(initData);

  const getMinerStatistics = async () => {
    fetch(`${process.env.apiHost}/getTotalVoteCountList`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', // 根据需要设置合适的 Content-Type
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const total_nft = data['data'].itemVotes.nft;
          const total_staking = data['data'].itemVotes.supperHexStaking;
          const total_investors = data['data'].itemVotes.investor;

          const resultData = [
            {
              title: 'Location NFT',
              number: total_nft,
              desc: 'veNFT',
              img: '/images/index/nft.png',
            },
            {
              title: 'Staked GEOD',
              number: total_staking,
              desc: 'veNFT',
              img: '/images/index/staking.png',
            },
            {
              title: 'Locked GEOD',
              number: total_investors,
              desc: 'veNFT',
              img: '/images/index/investors.png',
            },
          ];

          setData(resultData);
        }
      });
  };

  useEffect(() => {
    getMinerStatistics();
  }, []);

  return (
    <Container>
      <Box>
        <Typography
          variant="h5"
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginBottom: 5,
          }}
        >
          Total veNFT real-time update
        </Typography>
        <Grid container spacing={3} alignItems={'center'}>
          {data.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                component={Card}
                bgcolor={'transparent'}
                border={'1px solid #404040'}
                padding={5}
                width={1}
                height={1}
                variant={'outlined'}
              >
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant={'h4'}
                    color={'black'}
                    gutterBottom
                    sx={{ textAlign: 'center', color: '#677788' }}
                  >
                    <img
                      src={item.img}
                      style={{ height: 40, float: 'left', marginRight: 10 }}
                    />
                    {item.title}
                  </Typography>
                  <Typography
                    variant={'h4'}
                    color={'black'}
                    gutterBottom
                    sx={{ fontWeight: 700, textAlign: 'center' }}
                  >
                    <CountUp
                      style={{
                        marginLeft: 10,
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: '#377dff',
                      }}
                      duration={2}
                      end={Number(item.number)}
                      start={0}
                    />
                  </Typography>
                  <Typography
                    variant={'h6'}
                    color={'black'}
                    gutterBottom
                    sx={{ fontWeight: 500, textAlign: 'center' }}
                    style={{ marginLeft: 10, color: '#677788' }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Explorer;
