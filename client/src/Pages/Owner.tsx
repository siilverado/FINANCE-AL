import Card from '../Components/Card';
import Layout from '../Components/Layout';

const Owner = () => {
  return (
    <Layout title="Popietarios">
      <div className="w-full h-full overflow-scroll fixed bg-tenis-desktop bg-cover bg-[30%]">
        <div className="flex flex-col gap-16 mx-1 h-full pt-24 relative lg:flex-row lg:mx-20 lg:pt-0 lg:items-center lg:bottom-20 lg:justify-between">
          {' '}
          <Card route="/propietarios/canchas" title="Mis canchas" />
          <Card route="/propietarios/agregar-cancha" title="Agregar cancha" />
        </div>
      </div>
    </Layout>
  );
};

export default Owner;
