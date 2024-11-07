import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import Button from './components/Button';
import InputField from './components/Input';
import Modal from './components/Modal';
import Checkbox from './components/CheckBox';
import Table from './components/StandardTable';
import DataTable from './components/DataTable';
import ModalProvider, { useModal } from './components/ModalContext';
import ModalProvider2, { useModal2 } from './components/ModalContext2';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

// Zod schema for validation
const schema = z.object({
  name: z.string().nonempty("Name is required."),
  email: z.string().email("Invalid email address."),
  age: z.number().min(1, "Age must be greater than zero."),
  isChecked: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions."
  }),
});

const productSchema = z.object({
  productName: z.string().nonempty("Product name is required."),
  productPrice: z.number().min(1, "Price must be greater than zero."),
});

function App() {

  //User Form State
  const { isModalOpen, toggleModal } = useModal();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  // Product form state
  const { isModalOpen2, toggleModal2 } = useModal2();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productErrors, setProductErrors] = useState({});

  // Retrieve data from local storage or initialize an empty array
const getLocalData = () => {
  const savedData = localStorage.getItem('userData');
  return savedData ? JSON.parse(savedData) : [];
};

const getLocalProductData = () => {
  const savedProductData = localStorage.getItem('productData');
  return savedProductData ? JSON.parse(savedProductData) : [];
};

const [data, setData] = useState(getLocalData); // Initialize data from local storage
const [productData, setProductData] = useState(getLocalProductData);  // Initialize product data from local storage


  const onSubmit = (e) => {
    e.preventDefault();

    // Validate form with zod
    const formData = { name, email, age: Number(age), isChecked };
    const result = schema.safeParse(formData);

    if (result.success) {
      setData((prevData) => [{ name, email, age }, ...prevData]);// Add new user data
      toggleModal(); // Close the modal
      setName('');
      setAge('');
      setEmail('');
      setIsChecked(false);
      setErrors({});
    } else {
      // Set zod errors
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        age: fieldErrors.age?.[0],
        terms: fieldErrors.isChecked?.[0],
      });
    }
  };

  //Product Table
  const onProductSubmit = (e) => {
    e.preventDefault();


    // Validate form with zod
    const ProductData = { productName, productPrice: Number(productPrice) };
    const ProductResult = productSchema.safeParse(ProductData);

    if (ProductResult.success) {
      setProductData((prevData) => [{ productName, productPrice }, ...prevData]); // Add new user data
      toggleModal2(); // Close the modal
      setProductName('');
      setProductPrice('');
      setProductErrors({});
    } else {
      // Set zod errors
      const ProductErrors = ProductResult.error.flatten().fieldErrors;
      setProductErrors({
        productName:ProductErrors.productName?.[0],
        productPrice: ProductErrors.productPrice?.[0],
      });
    }
  }

  //Clear all user data
  const ClearUserData = () => {
    setData([]); // Clear user data
    localStorage.removeItem('userData'); // Remove user data from localStorage
  }

  const ClearProductData = () => {
    setProductData([]); // Clear product data
    localStorage.removeItem('productData'); // Remove product data from localStorage
  }

  // Data Table Information
  const headers = [
    {label: "Product Name",  field: "product name"},
    {label: "Product Price", field:"product price"}
  ];
  const Productdatarows = productData.map(product => ({ productName: product.productName, productPrice: product.productPrice}));

  const datarows = data.map(user => ({ name: user.name, email: user.email, age:user.age}));
  const columns = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Age", field: "age" },
  ];
   
  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('productData', JSON.stringify(productData));
  }, [data, productData]);

  return (
    <ModalProvider>
      <ModalProvider2>
      <div>
        <h1 className='App-header'> User and Product Management System </h1>

        <Modal isOpen={isModalOpen} title="User Data">
          <form onSubmit={onSubmit}>
            <InputField 
              label="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your name" 
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

            <InputField 
              label="Your Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

            <InputField 
              label="Age" 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              placeholder="Enter your age" 
            />
            {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}

            <Checkbox 
              label="Accept Terms and Conditions"
              onChange={(e) => setIsChecked(e.target.checked)}
              checked={isChecked} 
            />
            {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}

            <Button label="Submit" type='submit' className="button-submit"/>
          </form>
        </Modal>
      </div>

      {/* Users Table */}
      <div className='User-container'>
        <h1 className='User-header'>User Data Table</h1>
        <div>
        <Button onClick={toggleModal} className="user-add">
          <IoIosAddCircleOutline />
        </Button>

        <Button onClick={ClearUserData} className='user-add'>
           <MdDeleteOutline />
        </Button>
        </div>
      </div>
      <DataTable columns={columns} datarows={datarows} />
      

        <Modal isOpen={isModalOpen2} title="Add Product">
          <form onSubmit={onProductSubmit}>
          <InputField 
              label="Your Product Name" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
              placeholder="Enter the product" 
            />
            {productErrors.productName && <p style={{ color: 'red' }}>{productErrors.productName}</p>}

            <InputField 
              label="Your Price" 
              type="text" 
              value={productPrice} 
              onChange={(e) => setProductPrice(e.target.value)} 
              placeholder="Enter your price" 
            />
            {productErrors.productPrice && <p style={{ color: 'red' }}>{productErrors.productPrice}</p>}

            <Button label="Submit" type='submit' className="button-submit"/>
          
          </form>
        </Modal>

      {/* Standard DataTable */}
      <div className='product-container'>
        <h1 className='Product-header'>Product Table</h1>
        <div className='button-icons'>
        <Button onClick={toggleModal2} className='user-add'>
           <IoIosAddCircleOutline />
        </Button>

        <Button onClick={ClearProductData} className='user-add'>
           <MdDeleteOutline />
        </Button>
        </div>
      </div>
        <Table headers={headers} Productdatarows={Productdatarows}/>


      </ModalProvider2>
      </ModalProvider>
  );
}

export default App;