import Card from '../Components/cards/Card';
import Layout from '../Components/layout/Layout';

const Home = () => {
  return (
    <Layout title='Home' bg='bg-tenis bg-cover bg-[45%]'>
      <div className='absolute w-full px-3 pt-10 lg:top-1/4 lg:pt-0'>
        <div className='flex flex-col w-full h-full gap-20 lg:flex-row lg:justify-center'>
          <Card route='/reservar' title='Reservar' />
          <Card route='/propietarios' title='Propietarios' />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
