const Header = ({ title, style }) => {
  return (
    <header className="bg-[#171717] flex items-center justify-self-start h-[55px] backdrop-blur-md shadow-lg  border-b text-[#2A84BB]  border-[#2B2B2B]">
      <div className="p-[10px]">
        <h1 className={`text-2xl font-mono ${style}`}>{title}</h1>
      </div>
    </header>
  );
};
export default Header;
