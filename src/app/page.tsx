import Header from "./components/Navigation/Header"
import  MainCard from "./components/Main/MainCard"

export default function Home() {
  return (
    <>
    <Header categories={false}/>
    <MainCard></MainCard>
    </>
  );
}
