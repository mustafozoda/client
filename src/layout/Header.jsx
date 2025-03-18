const Header = ({ title, style }) => {
  return (
    <header className="dark:bg-[#171717] flex  items-center bg-[#FFFFFF]  justify-self-start h-[55px] backdrop-blur-md   border-b border-[#d8d8d8] dark:border-[#2B2B2B]">
      <div className="p-[10px]">
        <h1 className={`text-2xl font-mono ${style}`}>{title}</h1>
      </div>
    </header>
  );
};
export default Header;
