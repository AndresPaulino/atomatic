import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  img: string;
  price: string;
  title: string;
  href: string;
}
const Product = ({ product }: { product: Product }) => {
  const { img, href, price, title } = product;
  return (
    <div className='bg-default-50  p-4 rounded text-center'>
      <div className='h-12 w-12 rounded-full mb-4 mx-auto'>
        <Image src={img} alt='' height={100} width={100} className='w-full h-full rounded-full' />
      </div>
      <div className='text-default-500 text-sm mb-1  font-normal'> {price} </div>
      <div className='text-default-600  text-sm mb-4'>{title}</div>
      <Button asChild color='secondary' size='md' fullWidth>
        <Link href={href}>Best Selling Products</Link>
      </Button>
    </div>
  );
};

export default Product;