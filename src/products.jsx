import { useState, useEffect } from 'preact/hooks';
import Card from './card';

function Products() {
    
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const loadProducts = () => {
        fetch(`https://fakestoreapi.com/products?page=${page}`)
            .then(res => res.json())
            .then(newProducts => setProducts(prevProducts => [...prevProducts, ...newProducts]));
    }

    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            setPage(prevPage => prevPage + 1);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <h1 class="title">Products</h1>
            <div id="products" class="grid">
                {products.map(product => <Card key={product.id} product={product} />)}
            </div>
        </>
    );
}

export default Products;