import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  getCategory,
  getProducts,
  getUsers,
} from "../../api";
import { Grid } from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import Chart from "../chart/chart.js";
import { Helmet } from "react-helmet-async";
const { Option } = Select;
export default function Admin() {
  const items = [
    {
      key: "1",
      label: "User",
      children: <TableUser />,
    },
    {
      key: "2",
      label: "Category",
      children: <TableCategory />,
    },
    {
      key: "3",
      label: "Product",
      children: <TableProduct />,
    },
    {
      key: "4",
      label: "Chart",
      children: <Chart />,
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <Tabs
        style={{ marginTop: 75, marginLeft: 25 ,marginBottom: 300}}
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );

}
export const TableUser = () => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const result = await getUsers();
        setUsers(result.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchAllUsers();
  }, []);

  const dataUsers = users?.map((user) => ({
    key: user?._id,
    name: user?.fullName,
    email: user?.email,
    role: user?.role,
  }));
  console.log(users);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      render: (text) => text,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "30%",
      render: (text) => text,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table columns={columns} dataSource={dataUsers} />
      </div>
    </div>
  );
};
export const TableCategory = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const result = await getCategory();
        setCategories(result.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchAllCategories();
  }, []);

  const dataCategory = categories?.map((category) => ({
    key: category?._id,
    category: category?.name,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "category",
      key: "category",
      width: "90%",
      render: (text) => text,
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Link
            className="tableButton"
            onClick={() => deleteCategoryHandler(record)}
          >
            Delete
          </Link>
        </Space>
      ),
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = React.useCallback(() => {
    setModalOpen(false);
    setCategory("");
  }, []);

  const onSubmitCategory = async () => {
    await createCategory(category);
    toast.success("Category created successfully");
    handleClose();
  };

  const viewModal = React.useCallback(() => {
    setModalOpen(true);
  }, []);
  const deleteCategoryHandler = async (record) => {
    if (window.confirm("Are you sure to delete this category?")) {
      const id = record.key;
      await deleteCategory(id);
      toast.success("Category deleted successfully");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={viewModal}>Create Category</Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table columns={columns} dataSource={dataCategory} />
      </div>
      <Modal
        open={modalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        footer={null}
        style={{ width: 100, height: 150 }}
      >
        <Grid container alignItems="stretch">
          <Grid item xs={12} lg={12} className="row-new-post">
            <center>Create new category</center>
          </Grid>
          <Grid item xs={3} lg={3} />
          <Grid item xs={6} lg={6} className="row-new-post">
            <Input
              allowClear
              placeholder="Write the name of category"
              size="large"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginBottom: 15 }}
              required
            />
            <Button
              type="primary"
              block
              onClick={onSubmitCategory}
              className=" defaultButton text-dark"
            >
              Add new category
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};
export const TableProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [previewSource, setPreviewSource] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const result = await getCategory();
        setCategories(result.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchAllCategories();
  }, []);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const result = await getProducts();
        setProducts(result.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchAllProducts();
  }, []);
  const dataProduct = products?.map((product) => ({
    key: product?._id,
    title: product?.title,
    description: product?.description,
    category: product?.category.name,
    status: product?.status,
    price: product?.price,
    photos: product?.photos,
  }));

  const [modalOpenProduct, setModalOpenProduct] = useState(false);
  const handleCloseProduct = React.useCallback(() => {
    setModalOpenProduct(false);
    setProduct({});
  }, []);
  const onSubmitProduct = async () => {
    try {
      await createProduct(product);
      toast.success("Product created successfully");
      handleCloseProduct();
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const viewModalProduct = React.useCallback(() => {
    setModalOpenProduct(true);
  }, []);
  const deleteProductHandler = async (record) => {
    if (window.confirm("Are you sure to delete this product?")) {
      const id = record.key;
      await deleteProduct(id);
      toast.success("Product deleted successfully");
    }
  };
  const handleCategoryFileInputChange = (e) => {
    const file = e.target.files[0];
    file && previewCategoryFile(file);
  };
  const previewCategoryFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setProduct({ ...product, url: reader.result });
    };
  };
  const columnsProduct = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "40%",
      render: (text) => text,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "20%",
      render: (text) => text,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (text) => text,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
      render: (text) => text,
    },
    {
      title: "Photos",
      dataIndex: "photos",
      key: "photos",
      width: "20%",
      render: (text) => (
        <img style={{ width: 100, height: 100 }} src={text} alt="img" />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Link
            className="tableButton"
            onClick={() => deleteProductHandler(record)}
          >
            Delete
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={viewModalProduct}>Create Product</Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table columns={columnsProduct} dataSource={dataProduct} />
      </div>
      <Modal
        open={modalOpenProduct}
        onOk={handleCloseProduct}
        onCancel={handleCloseProduct}
        footer={null}
        style={{ width: 100, height: 150 }}
      >
        <Grid container alignItems="stretch">
          <Grid item xs={12} lg={12} className="row-new-post">
            <center>Create new product</center>
          </Grid>
          <Grid item xs={3} lg={3} />
          <Grid item xs={6} lg={6} className="row-new-post">
            <Input
              allowClear
              placeholder="Write the title of product"
              size="large"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              style={{ marginBottom: 15 }}
              required
            />
            <TextArea
              allowClear
              placeholder="Write the description of product"
              size="large"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              style={{ marginBottom: 15 }}
              required
            />
            <div style={{ marginBottom: 15 }}>
              <Select
                popupMatchSelectWidth={200}
                defaultValue={"Choose a category"}
                onChange={(e) => setProduct({ ...product, category: e })}
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
            <InputNumber
              allowClear
              size="large"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e })}
              style={{ marginBottom: 15 }}
              required
            />
            <input
              style={{ marginBottom: 15 }}
              type="file"
              id="fileInputCategory"
              onChange={handleCategoryFileInputChange}
            />
            <Button
              type="primary"
              block
              onClick={onSubmitProduct}
              className=" defaultButton text-dark"
            >
              Add new product
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};
