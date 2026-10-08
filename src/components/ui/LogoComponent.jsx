import logo from "../../assets/acmes_media.webp"

export default function LogoComponent() {
  return (
    <div className="h-full">
      <img className="h-full w-auto" src={logo} width="667" height="160" alt="Acmes Media Logo" fetchPriority="high" />
    </div>
  );
}
