const Header = ({ title, style }) => {
  return (
    <header className="flex h-[55px] items-center justify-self-start border-b border-[#d8d8d8] bg-[#a1abae] backdrop-blur-md transition-colors duration-300 ease-in-out dark:border-[#2B2B2B] dark:bg-[#171717]">
      <div className="p-[10px]">
        <h1 className={`text-2xl ${style}`}>{title}</h1>
      </div>
    </header>
  );
};
export default Header;
