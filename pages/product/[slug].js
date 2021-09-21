import React, { useState } from "react";
import Layout from "../../components/Layout";
import NextLink from "next/link";
import {
  Grid,
  Link,
  Typography,
  List,
  ListItem,
  Card,
  Button,
} from "@material-ui/core";
import useStyles from "../../utils/styles";
import Image from "next/image";
import db from "../../utils/db";
import Product from "../../models/Product";
import { getSingleProduct } from "../../common/variables";
import { getRequest } from "../../common/API";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { useRouter } from "next/router";
import Message from "../../components/Message";

const ProductScreen = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart } = useSelector((state) => state.cartItems);
  const [open, setOpen] = useState(false);
  const [messageOption, setMessageOption] = useState({
    message: "",
    severity: "",
  });

  if (!product) {
    return <div>Product not found!</div>;
  }

  const addToCartHandler = async () => {
    const url = getSingleProduct(product._id);
    const result = await getRequest(url);

    const existItem = cart.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (result.status === 200) {
      if (result.data.countInStock < quantity) {
        setOpen(true);
        setMessageOption({
          message: "Product out of stock",
          severity: "error",
        });
        return;
      }
    }
    dispatch(addToCart({ ...product, quantity }));
    router.push("/cart");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/">
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews})
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>In stock</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <Message
        open={open}
        handleClose={handleClose}
        message={messageOption.message}
        severity={messageOption.severity}
      />
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps({ params }) {
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    }, // will be passed to the page component as props
  };
}
