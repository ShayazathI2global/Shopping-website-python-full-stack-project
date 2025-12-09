import { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductDetail({cartItems, setCartItems}){
    const [product, setProduct] = useState(0);
    const [qty, setQty] = useState(1);
    const {id} = useParams();

            useEffect( () => {
                fetch(process.env.REACT_APP_API_URL+'/product/'+id)
                .then(res => res.json())
                .then(res => setProduct (res.product))

    },[])

    function addToCart() {     
    const itemExist = cartItems.find((item) => item.product._id==product._id)    
    if (!itemExist) {
        const newItem ={product, qty};
        setCartItems((state) => [...state, newItem]);
        toast.success("cart Item added successfully!")
    }   
}
 function increaseQty(){
    if(product.stock == qty){
        return;

    }
    setQty((state) => state + 1);
 }
 function decreaseQty(){
    if(qty >1 ){
        setQty((state) => state - 1);
    }
    
 }
    return product && <div ClassName="container container-fluid">
                <div ClassName="row f-flex justify-content-around">
            <div ClassName="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product.images[0].image} alt="sdf" height="500" width="500"/>
            </div>
            <div ClassName="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product #{product._id}</p>
                <hr />
                <div ClassName="rating-outer">
                    <div ClassName="rating-inner" style={{width:`${product.ratings/5*100}%`}}> </div>
                </div>
                <hr/>
                <p id="product_price">{product.price}</p>
                <div ClassName="stockCounter d-inline">
                    <span class=" btn btn-danger minus" onClick={decreaseQty}>-</span>
                    <input type="number" ClassName="form-control count d-inline" value={qty} readOnly />

                    <span Class="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                 <button type="button" onClick={addToCart} disabled={product.stock == 0} id="cart_btn" ClassName="btn btn-primary d-inline ml-4">Add to Cart</button>
                <hr />
                <p>Status:<span id="stock_status"className={product.stock > 0 ?'text-success':'text-danger'}>{product.stock >0 ? 'In Stock':'out of stock'}</span></p>
                <hr />
                <h4 ClassName="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by:<strong>{product.seller}</strong></p>				
                <div ClassName="rating w-50"></div>						
            </div>
                </div>
            </div>
}