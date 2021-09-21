import Layout from "../components/Layout";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import NextLink from "next/link";
import db from "../utils/db";
import Product from "../models/Product";
import { getSingleProduct } from "../common/variables";
import { getRequest } from "../common/API";
import { useState } from "react";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addToCart } from "../redux/actions/cartAction";

export default function Home({ products }) {
  const [open, setOpen] = useState(false);
  const [messageOption, setMessageOption] = useState({
    message: "",
    severity: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart } = useSelector((state) => state.cartItems);

  const addToCartHandler = async (product) => {
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
    <Layout>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>

              <CardActions>
                <Typography>${product.price}</Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCartHandler(product)}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Message
        open={open}
        handleClose={handleClose}
        message={messageOption.message}
        severity={messageOption.severity}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    }, // will be passed to the page component as props
  };
}
