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
// import "./CreateProductForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductById,
  updateProduct,
} from "../../../Redux/Customers/Product/Action";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { navigation } from '../../../config/navigationMenuNew';

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const UpdateProductForm = () => {
  const [productData, setProductData] = useState({
    id : useParams(),
    imageUrl: "",
    material: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: initialSizes,
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
  });
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { productId } = useParams();
  const { customersProduct } = useSelector((store) => store);

  const [selectedTopCategory, setSelectedTopCategory] = useState("");
  const [selectedSecondCategory, setSelectedSecondCategory] = useState("");
  const [selectedThirdCategory, setSelectedThirdCategory] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const categoryData = navigation.categories;
  const handleTopCategoryChange = (e) => {
    const selectedTopCategory = e.target.value;
    console.log(selectedTopCategory);
    setSelectedTopCategory(selectedTopCategory);
    setProductData((prevState) => ({
      ...prevState,
      topLavelCategory: selectedTopCategory,
    }));
    console.log(productData);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(productData));
    console.log(productData);
  };

  useEffect(() => {
    dispatch(findProductById({productId}));
  }, [productId]);

  useEffect(()=>{
    if(customersProduct.product){
        for(let key in productData){
    setProductData((prev)=>({...prev,[key]:customersProduct.product[key]}))
    console.log(customersProduct.product[key],"--------",key)
}
    }

  },[customersProduct.product])

  return (
    <Fragment className="createProductContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Update New Product
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Material"
              name="material"
              value={productData.material}
              onChange={handleChange}
            />
          </Grid>

          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
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
      </Grid> */}
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default UpdateProductForm;



// import { useState } from "react";
// import { Typography } from "@mui/material";
// import {
//   Grid,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import { Fragment } from "react";
// // import "./CreateProductForm.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   findProductById,
//   updateProduct,
// } from "../../../Redux/Customers/Product/Action";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const initialSizes = [
//   { name: "S", quantity: 0 },
//   { name: "M", quantity: 0 },
//   { name: "L", quantity: 0 },
// ];

// const UpdateProductForm = () => {
//   const [productData, setProductData] = useState({
//     id : useParams(),
//     imageUrl: "",
//     material: "",
//     title: "",
//     color: "",
//     discountedPrice: "",
//     price: "",
//     discountPersent: "",
//     size: initialSizes,
//     quantity: "",
//     topLavelCategory: "",
//     secondLavelCategory: "",
//     thirdLavelCategory: "",
//     description: "",
//   });
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   const { productId } = useParams();
//   const { customersProduct } = useSelector((store) => store);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSizeChange = (e, index) => {
//     let { name, value } = e.target;
//     name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

//     const sizes = [...productData.size];
//     sizes[index][name] = value;
//     setProductData((prevState) => ({
//       ...prevState,
//       size: sizes,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProduct(productData));
//     console.log(productData);
//   };

//   useEffect(() => {
//     dispatch(findProductById({productId}));
//   }, [productId]);

//   useEffect(()=>{
//     if(customersProduct.product){
//         for(let key in productData){
//     setProductData((prev)=>({...prev,[key]:customersProduct.product[key]}))
//     console.log(customersProduct.product[key],"--------",key)
// }
//     }

//   },[customersProduct.product])

//   return (
//     <Fragment className="createProductContainer ">
//       <Typography
//         variant="h3"
//         sx={{ textAlign: "center" }}
//         className="py-10 text-center "
//       >
//         Update New Product
//       </Typography>
//       <form
//         onSubmit={handleSubmit}
//         className="createProductContainer min-h-screen"
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Image URL"
//               name="imageUrl"
//               value={productData.imageUrl}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Title"
//               name="title"
//               value={productData.title}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Material"
//               name="material"
//               value={productData.material}
//               onChange={handleChange}
//             />
//           </Grid>

          
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Color"
//               name="color"
//               value={productData.color}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Quantity"
//               name="quantity"
//               value={productData.quantity}
//               onChange={handleChange}
//               type="number"
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Price"
//               name="price"
//               value={productData.price}
//               onChange={handleChange}
//               type="number"
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Discounted Price"
//               name="discountedPrice"
//               value={productData.discountedPrice}
//               onChange={handleChange}
//               type="number"
//             />
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               label="Discount Percentage"
//               name="discountPersent"
//               value={productData.discountPersent}
//               onChange={handleChange}
//               type="number"
//             />
//           </Grid>
//           <Grid item xs={6} sm={4}>
//             <FormControl fullWidth>
//               <InputLabel>Top Level Category</InputLabel>
//               <Select
//                 name="topLavelCategory"
//                 value={productData.topLavelCategory}
//                 onChange={handleChange}
//                 label="Top Level Category"
//               >
//                 <MenuItem value="Dining">Dining</MenuItem>
//                 <MenuItem value="Decor">Decor</MenuItem>
//                 <MenuItem value="garden">Garden</MenuItem>
//                 <MenuItem value="Lighting">Lighting</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={6} sm={4}>
//             <FormControl fullWidth>
//               <InputLabel>Second Level Category</InputLabel>
//               <Select
//                 name="secondLavelCategory"
//                 value={productData.secondLavelCategory}
//                 onChange={handleChange}
//                 label="Second Level Category"
//               >
//                 <MenuItem value="Serveware">Serveware</MenuItem>
//                 <MenuItem value="Tableware">Tableware</MenuItem>
//                 <MenuItem value="Cutlery">Cutlery</MenuItem>
//                 <MenuItem value="Pots And Planters">Pots And Planters</MenuItem>
//                 <MenuItem value="Garden Decor">Garden Decor</MenuItem>
//                 <MenuItem value="Hanging">Hanging</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={6} sm={4}>
//             <FormControl fullWidth>
//               <InputLabel>Third Level Category</InputLabel>
//               <Select
//                 name="thirdLavelCategory"
//                 value={productData.thirdLavelCategory}
//                 onChange={handleChange}
//                 label="Third Level Category"
//               >
//                 <MenuItem value="Hanging Planters">Hanging Planters</MenuItem>
//                 <MenuItem value="Magnetic Planters">Magnetic Planters</MenuItem>
//                 <MenuItem value="Table Planters">Table Planters</MenuItem>
//                 <MenuItem value="Floor Planters">Floor Planters</MenuItem>
//                 <MenuItem value="Railing Planters">Railing Planters</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="outlined-multiline-static"
//               label="Description"
//               multiline
//               name="description"
//               rows={3}
//               onChange={handleChange}
//               value={productData.description}
//             />
//           </Grid>
//           {/* {productData.size.map((size, index) => (
//             <Grid container item spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Size Name"
//                   name="name"
//                   value={size.name}
//                   onChange={(event) => handleSizeChange(event, index)}
//                   required
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Quantity"
//                   name="size_quantity"
//                   type="number"
//                   onChange={(event) => handleSizeChange(event, index)}
//                   required
//                   fullWidth
//                 />
//               </Grid>{" "}
//             </Grid>
//           ))} */}
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               sx={{ p: 1.8 }}
//               className="py-20"
//               size="large"
//               type="submit"
//             >
//               Update Product
//             </Button>
//             {/* <Button
//               variant="contained"
//               sx={{ p: 1.8 }}
//               className="py-20 ml-10"
//               size="large"
//               onClick={()=>handleAddProducts(dressPage1)}
//             >
//               Add Products By Loop
//             </Button> */}
//           </Grid>
//         </Grid>
//       </form>
//     </Fragment>
//   );
// };

// export default UpdateProductForm;
