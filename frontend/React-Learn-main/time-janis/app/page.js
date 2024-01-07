import Clock from "@/components/clock";
import ButtonPrimary from "@/components/buttonPrimary";

export default function Home() {
  return (
    <>
      <Clock />
      <ButtonPrimary href="/login">Login</ButtonPrimary>
    </>
  );
}
