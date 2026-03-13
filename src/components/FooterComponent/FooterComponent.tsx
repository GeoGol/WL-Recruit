import React from "react";
import {Link} from "react-router-dom";

const FooterComponent = () => {

  return (
      <footer className="block bg-default w-full">
        <div className={'container flex flex-col items-center justify-between gap-6 p-4'}>
          {/*<div className={'flex items-center justify-between gap-2 max-w-96'}>*/}
          {/*  <span className={'text-base-md text-muted text-center'}>*/}
          {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et{' '}*/}
          {/*      <Link to={'/'} className={'text-base-md font-bold text-link'}>*/}
          {/*          privacy policy*/}
          {/*      </Link>*/}
          {/*  </span>*/}

          {/*</div>*/}

          <span className={'text-base-md text-muted'}>
            Powered by: <strong className={'text-primary'}>Worklife Recruit (ex SmartCV)</strong>
          </span>
        </div>
      </footer>
  );
};

export default FooterComponent;