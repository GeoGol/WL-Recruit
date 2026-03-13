import { memo } from 'react';

const FooterComponent = memo(() => {
  return (
      <footer className="block bg-default w-full">
        <div className={'container flex flex-col items-center justify-between gap-6 p-4'}>
          <span className={'text-base-md text-muted'}>
            Powered by: <strong className={'text-primary'}>Worklife Recruit (ex SmartCV)</strong>
          </span>
        </div>
      </footer>
  );
});

FooterComponent.displayName = 'FooterComponent';

export default FooterComponent;