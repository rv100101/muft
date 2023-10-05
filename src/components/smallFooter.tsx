import FooterLinks from "./footerLinks";

const SmallFooter = () => {
  return (
    <div className="w-full px-8 lg:px-36 p-4 h-full flex items-center justify-between">
      <p className="text-white text-xs text-center">
        &copy; 2023 Softnames. All Right Reserved.
      </p>
      <div className="flex justify-between text-white">
        <FooterLinks />
      </div>
    </div>
  );
};

export default SmallFooter;
