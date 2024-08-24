import { useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Fragment } from "react";
import "./CreateProductForm.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../Redux/Customers/Product/Action";
import { navigation } from '../../../config/navigationMenuNew';


const initialDimensions = [
  { name: "L", quantity: 0 },
  { name: "W", quantity: 0 },
  { name: "H", quantity: 0 },
];

const CreateProductFormNew = () => {
  
  const [productData, setProductData] = useState({
    imageUrl: "",
    material: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    dimension: initialDimensions,
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
  });

  const [selectedTopCategory, setSelectedTopCategory] = useState("");
  const [selectedSecondCategory, setSelectedSecondCategory] = useState("");
  const [selectedThirdCategory, setSelectedThirdCategory] = useState("");

const dispatch=useDispatch();
const jwt=localStorage.getItem("jwt")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  const handleDimensionChange = (e, index) => {
    let { name, value } = e.target;
    name==="dimension_inches"?name="inches":name=e.target.name;

    const dimensions = [...productData.dimension];
    dimensions[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      dimension: dimensions,
    }));
  };

  const handleAddDimension = () => {
    const dimensions = [...productData.dimension];
    dimensions.push({ name: "", inches: "" });
    setProductData((prevState) => ({
      ...prevState,
      dimnsion: dimensions,
    }));
  };

  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    dispatch(createProduct({data:productData,jwt}))
    console.log(productData);
  };

  const categoryData = navigation.categories;
  const handleTopCategoryChange = (e) => {
    const selectedTopCategory = e.target.value;
    setSelectedTopCategory(selectedTopCategory);
    setProductData((prevState) => ({
      ...prevState,
      topLavelCategory: selectedTopCategory,
    }));
    setSelectedSecondCategory("");
    setSelectedThirdCategory("");
  };

  const handleSecondCategoryChange = (e) => {
    const selectedSecondCategory = e.target.value;
    setSelectedSecondCategory(selectedSecondCategory);
    setProductData((prevState) => ({
      ...prevState,
      secondLavelCategory: selectedSecondCategory,
    }));
  };

  const handleThirdCategoryChange = (e) => {
    const selectedThirdCategory = e.target.value;
    setSelectedThirdCategory(selectedThirdCategory);
    setProductData((prevState) => ({
      ...prevState,
      thirdLavelCategory: selectedThirdCategory,
    }));
  };

  // const handleAddProducts=(data)=>{
  //   for(let item of data){
  //     const productsData={
  //       data:item,
  //       jwt,
  //     }
  //     dispatch(createProduct(productsData))
  //   }
  // }

  return (
    <Fragment className="createProductContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Add New Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Material"
              name="material"
              value={productData.material}
              onChange={handleChange}
              type="text"
              required
            />
          </Grid>
        
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
              pattern="[A-Za-z]{10}"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPersent"
              value={productData.discountPersent}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          {/* <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLavelCategory"
                value={productData.topLavelCategory}
                // onChange={handleChange}
                onChange={handleTopCategoryChange}
                label="Top Level Category"
              >
                <MenuItem value="Dining">Dining</MenuItem>
                <MenuItem value="Decor">Decor</MenuItem>
                <MenuItem value="garden">Garden</MenuItem>
                <MenuItem value="Lighting">Lighting</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={6} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Top Level Category</InputLabel>
          <Select
            name="topLavelCategory"
            value={selectedTopCategory}
            onChange={handleTopCategoryChange}
            label="Top Level Category"
          >
            {categoryData.map((category) => (
              <MenuItem key={category.id} value={category.value}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
          {/* <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLavelCategory"
                value={productData.secondLavelCategory}
                // onChange={handleChange}
                onChange={handleSecondCategoryChange}
                label="Second Level Category"
              >
                <MenuItem value="Serveware">Serveware</MenuItem>
                <MenuItem value="Tableware">Tableware</MenuItem>
                <MenuItem value="Cutlery">Cutlery</MenuItem>
                <MenuItem value="Pots And Planters">Pots And Planters</MenuItem>
                <MenuItem value="Garden Decor">Garden Decor</MenuItem>
                <MenuItem value="Hanging">Hanging</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={6} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Second Level Category</InputLabel>
          <Select
            name="secondLavelCategory"
            value={selectedSecondCategory}
            onChange={handleSecondCategoryChange}
            label="Second Level Category"
            disabled={!selectedTopCategory}
          >
            {selectedTopCategory &&
              categoryData.find((category) => category.value === selectedTopCategory)
                .sections.map((section) => (
                  <MenuItem key={section.id} value={section.value}>
                    {section.name}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>
          {/* <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLavelCategory"
                value={productData.thirdLavelCategory}
                // onChange={handleChange}
                onChange={handleThirdCategoryChange}
                label="Third Level Category"
              >
                
                <MenuItem value="Hanging Planters">Hanging Planters</MenuItem>
                <MenuItem value="Magnetic Planters">Magnetic Planters</MenuItem>
                <MenuItem value="Table Planters">Table Planters</MenuItem>
                <MenuItem value="Floor Planters">Floor Planters</MenuItem>
                <MenuItem value="Railing Planters">Railing Planters</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={6} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Third Level Category</InputLabel>
          <Select
            name="thirdLavelCategory"
            value={selectedThirdCategory}
            onChange={handleThirdCategoryChange}
            label="Third Level Category"
            disabled={!selectedSecondCategory}
          >
            {selectedTopCategory &&
              selectedSecondCategory &&
              categoryData
                .find((category) => category.value === selectedTopCategory)
                .sections.find((section) => section.value === selectedSecondCategory)
                .items.map((item) => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
            />
          </Grid>
          {productData.dimension.map((dimension, index) => (
            <Grid container item spacing={3} >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Dimension"
                  name="name"
                  value={dimension.name}
                  onChange={(event) => handleDimensionChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Inches"
                  name="dimension_inches"
                  type="number"
                  onChange={(event) => handleDimensionChange(event, index)}
                  required
                  fullWidth
                />
              </Grid> </Grid>
            
          ))}
          <Grid item xs={12} >
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
            {/* <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20 ml-10"
              size="large"
              onClick={()=>handleAddProducts(dressPage1)}
            >
              Add Products By Loop
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default CreateProductFormNew;