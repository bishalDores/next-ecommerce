import {
  Button,
  Card,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import NextLink from "next/link";
import Image from "next/image";
import { getSingleProduct } from "../common/variables";
import { getRequest } from "../common/API";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
import Message from "../components/Message";

const cartScreen = () => {
  const [open, setOpen] = useState(false);
  const [messageOption, setMessageOption] = useState({
    message: "",
    severity: "",
  });
  const { cart } = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSelectHandler = async (item, quantity) => {
    const url = getSingleProduct(item._id);
    const result = await getRequest(url);
    if (result.status === 200) {
      if (result.data.countInStock < quantity) {
        setOpen(true);
        setMessageOption({
          message: "Product out of stock",
          severity: "error",
        });
      }
    }
    dispatch(addToCart({ ...item, quantity }));
  };

  const onDeleteHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {cart.length > 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                              />
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Typography>{item.name}</Typography>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell align="right">
                          <Select
                            value={item.quantity}
                            onChange={(e) =>
                              onSelectHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="right">${item.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onDeleteHandler(item._id)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="col-md-3 offet-md-1 col-12">
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                      {cart.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button variant="contained" color="primary" fullWidth>
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center">
          <Typography
            align="center"
            variant="h5"
            component="h5"
            className="py-3"
          >
            {" "}
            Cart is empty !
          </Typography>
          <NextLink href="/">
            <Button variant="contained" color="primary">
              Go Shopping
            </Button>
          </NextLink>
        </div>
      )}
      <Message
        open={open}
        handleClose={handleClose}
        message={messageOption.message}
        severity={messageOption.severity}
      />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(cartScreen), { ssr: false });
