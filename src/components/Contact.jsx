import React from 'react';
import SectionHeader from './SectionHeader';

const Contact = () => {
  return (
    <section id="contact" className="w-full flex flex-col h-auto">
      <SectionHeader id="06" title="CONTACT_NODE" />
      
      <div className="flex-1 bg-[#0E0E11] border border-[#222222] p-8 font-mono flex flex-col items-center justify-center relative group">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity text-6xl text-[#00ADD8] pointer-events-none">
          @
        </div>
        
        <h3 className="text-xl md:text-2xl text-[#EDEDED] mb-4 text-center">
          INITIATE_HANDSHAKE
        </h3>
        <p className="text-[#6E737D] text-sm text-center max-w-md mb-8">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <a 
          href={`mailto:${import.meta.env.VITE_EMAIL}`}
          className="px-8 py-4 border border-[#222222] bg-[#050505] text-[#EDEDED] font-mono text-sm flex items-center gap-2 group cursor-pointer transition-all hover:border-[#00ADD8] hover:text-[#00ADD8] hover:shadow-[0_0_10px_rgba(0,173,216,0.2)] active:scale-95"
        >
          [ SEND_TRANSMISSION ]
        </a>
      </div>
    </section>
  );
};

export default Contact;
