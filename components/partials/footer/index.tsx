import React from 'react';
import FooterContent from './footer-content';

const AtomaticFooter = async () => {
  return (
    <FooterContent>
      <div className=' md:flex  justify-between text-default-600 hidden'>
        <div className='text-center ltr:md:text-start rtl:md:text-right text-sm'>
          COPYRIGHT &copy; {new Date().getFullYear()} Atomatic, All rights Reserved
        </div>
      </div>
    </FooterContent>
  );
};

export default AtomaticFooter;
