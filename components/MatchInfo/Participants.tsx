import React from 'react';
import Image from 'next/image';
interface ParticipantsProps {
  info: Info;
  offset: number;
}
const Participants: React.FC<ParticipantsProps> = ({ info, offset }) => {
  return (
    <div className='w-[150px] text-center mb-0 space-y-[1px] hidden lg:block'>
      {[...Array(5)].map((_, index) => (
        <div key={index + offset} className='flex items-center space-x-2'>
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${
              info.participants[index + offset].championName
            }.png`}
            width={18}
            height={18}
            alt={info.participants[0].championName as string}
            className='rounded-full'
          />
          <p className='text-xs'>
            {info.participants[index + offset].summonerName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Participants;
