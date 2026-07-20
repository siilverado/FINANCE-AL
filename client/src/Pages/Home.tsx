import Card from '../Components/Card';
import Layout from '../Components/Layout';

const Home = () => {
  return (
    <Layout title="Home">
      <div className="w-full h-full overflow-scroll fixed bg-tenis bg-cover bg-[45%]">
        <div className="flex flex-col gap-16 mx-1 h-full pt-24 relative lg:flex-row lg:mx-20 lg:pt-0 lg:items-center lg:bottom-20 lg:justify-between">
          <Card route="/reservas" title="Reservas" />
          <Card route="/propietarios" title="Propietarios" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
