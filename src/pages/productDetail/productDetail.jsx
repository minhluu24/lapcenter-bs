import React, { useEffect, useState } from "react";
import Narbar from "../../components/nabar";
import "./productDetail.scss";
import { Button, Spinner } from "react-bootstrap";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SameCard from "../../components/SameCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function ProductDetail() {
  const { state } = useLocation();
  const location = useLocation()
  const [product, setProduct] = useState();
  const [productsBrand, setProductsBrand] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("product id: ", state.id);

  //callAPI
  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductById/${state.id}`
      )
      .then(function (response) {
        const data = response.data.response;
        console.log("SUCCESS: ", data);
        setProduct(data);
        setLoading(false);
        setImage(data.images[0]);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR: ", error);
      })
      .then(function () {});
  };

  const getProductBrand = () => {
    setLoading(true);
    axios
      .get(`https://lap-center-v1.herokuapp.com/api/product`, {
        params: {
          productBrand: state.brand,
        },
      })
      .then(function (response) {
        console.log("SUCCESS 1: ", response.data);
        setProductsBrand(response.data.products);
        setLoading(false);  
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR 1: ", error);
      });
  };

  useEffect(() => {
    getProductId();
    getProductBrand();
    console.log("ham nay chay 1 lan duy nhat");
  }, [location]);

  return (
    <>
      <Narbar />
      {!loading ? (
        <div>
          <div className="productDetailcontainer">
            <div className="title">
              <h3>{product?.name}</h3>
              <span>T??nh tr???ng: c??n h??ng</span>
              <span className="mx-4">B???o h??nh: 24 th??ng</span>
            </div>
            <hr />
            <div className="info row">
              <div className="productImage col">
                <img src={image} alt="" className="image" />
                <div className="text-center">
                  {product?.images.length > 0 &&
                    product?.images.map((item, index) => (
                      <img
                        src={item}
                        alt=""
                        className="imgSmail"
                        key={index}
                        onClick={() => setImage(item)}
                      />
                    ))}
                </div>
              </div>
              <div className="price col">
                <span>Gi?? b??n</span>{" "}
                <span className="amount">{product?.price} VND</span>
                <div className="gift">Khuy???n m??i: Qu?? t???ng</div>
                <div className="gitInfo">Th??ng tin qu?? t???ng</div>
                <div className="text-center">
                  <Button className="my-4 bg-danger">Mua Ngay</Button>
                  <br />
                  <span>
                    G???i ngay{" "}
                    <span className="text-danger h4">036 879 6524</span> ????? gi???
                    h??ng
                  </span>
                </div>
              </div>
              <div className="contact col">
                <b>??i???n tho???i t?? v???n - ?????t h??ng</b>
                <ul>
                  <li>Th??nh ?????t: 19001098</li>
                  <li>?????c Minh: 19008198</li>
                  <li>Trung Tu???n: 18992233</li>
                </ul>
                <b>?????a ch??? mua h??ng</b>
                <ul>
                  <li>???? N???ng: 179 Nguy???n V??n Linh</li>
                  <li>Hu???: 89 H??ng V????ng</li>
                  <li>Laos: 89 L?? ????nh L??</li>
                </ul>
              </div>
            </div>
            <hr />
            <table className="table my-5 table-secondary ">
              <thead>
                <tr>
                  <th scope="col">PH???N C???NG</th>
                  <th scope="col">TH??NG S??? K??? THU???T</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Model</td>
                  <td>{product?.model}</td>
                </tr>
                <tr>
                  <td>CPU</td>
                  <td>{product?.cpu}</td>
                </tr>
                <tr>
                  <td>RAM</td>
                  <td>{product?.ram}</td>
                </tr>
                <tr>
                  <td>??? c???ng</td>
                  <td>{product?.disk}</td>
                </tr>
                <tr>
                  <td>CARD ????? h???a</td>
                  <td>{product?.card}</td>
                </tr>
                <tr>
                  <td>M??n h??nh</td>
                  <td>{product?.monitor}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-danger h5">S???n ph???m c??ng th????ng hi???u </p>
            <hr />
          </div>
          <Carousel responsive={responsive}>
            {productsBrand?.length > 0 &&
              productsBrand?.map((item, index) => (
                <SameCard product={item} key={index} />
              ))}
          </Carousel>
        </div>
      ) : (
        <div className="text-center">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      )}
      <Footer />
    </>
  );
}
