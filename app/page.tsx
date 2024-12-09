import AuthTabs from "../components/auth/AuthTabs";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>Bienvenue sur le portail de Saint-Vinci</div>
      <AuthTabs />
    </div>
  );
}
