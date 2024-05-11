import { formatCurrency } from '@/utils/number';
import { Button, Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <article className='flex flex-col gap-10'>
      <Image
        src='https://minio.thecoffeehouse.com/image/admin/1714377218_web-cu.jpg'
        alt='The Coffee House'
        width={1920}
        height={1080}
      />

      <div className='flex flex-col items-center'>
        <h2 className='font-bold'>Sản phẩm từ nhà</h2>
      </div>

      <div className='container mx-auto grid w-full grid-cols-6 gap-8'>
        {[
          {
            id: 1,
            name: 'Oolong Tứ Quý Vải',
            thumbnailUrl:
              'https://minio.thecoffeehouse.com/image/admin/1709004168_vai-xuan-1_400x400.jpg',
            price: 59000,
          },
          {
            id: 2,
            name: 'Oolong Tứ Quý Vải',
            thumbnailUrl:
              'https://minio.thecoffeehouse.com/image/admin/1709004168_vai-xuan-1_400x400.jpg',
            price: 59000,
          },
        ].map(({ id, name, thumbnailUrl, price }) => (
          <Card key={id}>
            <CardBody className='flex-col gap-3'>
              <Image src={thumbnailUrl} alt={name} width={200} height={200} className='rounded' />

              <h3 className='font-semibold'>{name}</h3>

              <div className='flex flex-row items-center justify-between'>
                <div>{formatCurrency(price)}</div>
                <Button variant='flat' color='primary' isIconOnly>
                  +
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default Home;
