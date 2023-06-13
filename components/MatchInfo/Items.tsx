import { Grid } from '@mui/material';
import React from 'react';
import Image from 'next/image';

interface ItemsProps {
  items: number[] | undefined;
}
const Items: React.FC<ItemsProps> = ({ items }) => {
  return (
    <div className="hidden md:block">
      <Grid container spacing={1}>
        <Grid container item justifyContent="start" spacing={1}>
          {[...Array(3)].map((_, index) => (
            <Grid key={index} item>
              {items![index] === 0 ? (
                <div className="w-[20px] h-[20px] bg-gray-400" />
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${
                    items![index]
                  }.png`}
                  alt="item"
                  width={20}
                  height={20}
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Grid container item justifyContent="start" spacing={1}>
          {[...Array(3)].map((_, index) => (
            <Grid key={index} item>
              {items![index + 3] === 0 ? (
                <div className="w-[20px] h-[20px] bg-gray-400" />
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${
                    items![index + 3]
                  }.png`}
                  alt="item"
                  width={20}
                  height={20}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Items;
