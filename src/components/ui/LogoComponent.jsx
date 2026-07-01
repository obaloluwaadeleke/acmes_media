import logo from "../../assets/acmes_media.png"

export default function LogoComponent() {
  return (
    <div className="h-full">
      <img className="h-full" src={logo} alt="Acmes Media Logo" />
    </div>
  );
}