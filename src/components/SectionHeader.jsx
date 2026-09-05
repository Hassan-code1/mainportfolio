import React from 'react';

const SectionHeader = ({ id, title }) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-12">
      <h2 className="font-mono text-[#EDEDED] font-bold tracking-widest text-sm md:text-base uppercase">
        <span className="text-[#6E737D] mr-3">[{id}]</span>
        {title}
      </h2>
      <div className="w-full h-px bg-[#222222] relative">
        <div className="absolute left-0 top-0 h-full w-8 bg-[#00ADD8]"></div>
      </div>
    </div>
  );
};

export default SectionHeader;
