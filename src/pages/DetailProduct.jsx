import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';
import { deliveryDate, today } from '../utils';
import { Layout } from '../components';
import { ChevronLeftIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { GoToTop } from '../utils';

export const DetailProduct = () => {

    const context = useContext(Context);
    GoToTop();

    const navigate = useNavigate();
    const onNavigateBack = () => {
        navigate(-1);
    }

    //Image Exchange
    const [imagen, setImagen] = useState(context.showProductDetail.images[0]);
    const cambiarImagen =(element) => {
        setImagen(element)
    }
    useEffect(() => {
    }, [setImagen]);

   
}; 