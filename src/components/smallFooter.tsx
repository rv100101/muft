import FooterLinks from "./footerLinks";

const SmallFooter = () => {
  return (
    <div className="hidden sm:flex w-full px-8 lg:px-36 p-2 h-max flex items-center justify-between">
      <p className="text-white sm:text-xs text-center">
        &copy; 2023 Softnames. All Rights Reserved.
      </p>
      <div className="flex justify-between text-white">
        <FooterLinks />
      </div>
    </div>
  );
};

export default SmallFooter;
