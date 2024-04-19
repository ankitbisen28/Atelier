import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Button, IconButton } from '@mui/material';
import { AddShoppingCart, Remove, Add } from '@mui/icons-material';
import { useParams } from 'react-router-dom'
import UserContext from '../Context/UserContext';

const ProductPage = () => {
    const {id, HeaderTypeTwo} = useParams();
    const {token} = useContext(UserContext);
  const [product, setProduct] = React.useState({});
  console.log(product)
  const [quantity, setQuantity ] = React.useState(1);

  const getProductDetail = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/products/${id}`, {
          headers: HeaderTypeTwo,
        });
        setProduct(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getProductDetail();
  }, [token])

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Container sx={{marginTop:16}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img src={product.image} alt="Product" style={{ maxWidth: '100%', borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body2" paragraph>
            {product.description}
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="body2">Category:</Typography>
            </Grid>
            <Grid item>
              <label>
                <input type="checkbox" value="XS" />
                XS
              </label>
            </Grid>
            <Grid item>
              <label>
                <input type="checkbox" value="S" />
                S
              </label>
            </Grid>
            <Grid item>
              <label>
                <input type="checkbox" value="M" />
                M
              </label>
            </Grid>
            <Grid item>
              <label>
                <input type="checkbox" value="L" />
                L
              </label>
            </Grid>
            <Grid item>
              <label>
                <input type="checkbox" value="XL" />
                XL
              </label>
            </Grid>
          </Grid>
          <Typography variant="body2">Colors:</Typography>
          <Button variant="outlined" style={{ marginRight: 8 }}>Black</Button>
          <Button variant="outlined" style={{ marginRight: 8 }}>White</Button>
          <Button variant="outlined" style={{ marginRight: 8 }}>Red</Button>
          <Button variant="outlined" style={{ marginRight: 8 }}>Blue</Button>
          <Button variant="outlined">Green</Button>
          <Grid container alignItems="center" spacing={2} style={{ marginTop: 16 }}>
            <Grid item>
              <IconButton onClick={handleDecrease}>
                <Remove />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="body2">{quantity}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleIncrease}>
                <Add />
              </IconButton>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" startIcon={<AddShoppingCart />}>
                Add To Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
