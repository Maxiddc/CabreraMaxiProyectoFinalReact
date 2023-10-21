import { useContext } from 'react';
import { Layout, OrderCard } from '../components';
import { GoToTop } from '../utils';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import { totalPrice } from '../utils';
import { useCreateDate } from '../hooks';

export const CartShoppingPage = () => {

    const context = useContext(Context);
    const date = useCreateDate();
    GoToTop();

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(prod => prod.id != id);
        context.setCartProducts(filteredProducts);
    }

    const handleCheckout = () => {
        const orderToAdd = {
            id: new Date().getTime(),
            date: date,
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        context.closeCheckoutSideMenu();
        //context.setSearchByTitle(null);
    }

    return (
        <Layout>
            <h1 className='mb-5 font-bold text-4xl'>Mi carrito</h1>

            <div className='flex flex-grow justify-between items-start max-w-screen-lg'>
                <div className='overflow-y-scroll px-20'>
                    {
                        context.cartProducts.map((prod) => (
                            <OrderCard
                                key={prod.id}
                                id={prod.id}
                                title={prod.title}
                                imageUrl={prod.images[0]}
                                price={prod.price}
                                handleDelete={handleDelete}
                            />
                        ))
                    }
                </div>
                <div className='px-4 mb-4'>
                    <p className='flex flex-row justify-between items-center'>
                        <span className='mr-5'>Total en el carrito:</span>
                        
                        <span className='font-medium text-2xl text-red-800'>${totalPrice(context.cartProducts)}</span>
                    </p>
                    {
                        context.productsCount !== 0 &&
                        <div>
                            <Link to='/my-orders/last'>
                                <button
                                    type='button'
                                    className='border-2 p-2 rounded-lg w-full mt-3 bg-green-300' 
                                    onClick={() => handleCheckout()}
                                >
                                    Comprar
                                </button>
                            </Link>
                            <button
                                type='button'
                                onClick={() => context.setCartProducts([])}
                                className='border-2 p-2 rounded-lg w-full bg-green-400 mt-3'
                            >
                                Borrar todo
                            </button>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
};