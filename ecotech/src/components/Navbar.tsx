import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const handleOpenSideBar = () => {
    console.log("samu fucker");
  };

  return (
    <header className="flex justify-between items-center bg-cyan-800 px-4 py-1">
      <MenuIcon
        onClick={handleOpenSideBar}
        sx={{ fontSize: "3rem", color: "white" }}
      />
      <div className="flex justify-center items-center">
        <span className="text-3xl text-white font-semibold"> Eco Tech </span>
        <img src="/logo.png" alt="logo" width="100px" height="100px" />
      </div>
    </header>
  );
}
