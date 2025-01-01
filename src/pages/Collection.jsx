import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const toggleCategory = (e) => {
    if(catagory.includes(e.target.value)){
  setCatagory(prev=> prev.filter(item => item !== e.target.value))
    }else{
      setCatagory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice();

    if(showSearch && search){
      productCopy = productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(catagory.length > 0){
      productCopy = productCopy.filter(item => catagory.includes(item.category))
    }
    if(subCategory.length > 0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productCopy)

  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch(sortType){
       case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
          break;
        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
          break;

        default:
          applyFilter(); 
          break;

    }
  }
  useEffect(()=>{
    applyFilter()
  },[catagory, subCategory, search,showSearch])

  useEffect(()=>{
    sortProduct()
  },[sortType])


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={()=>setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} `}  src={assets.dropdown_icon}/>
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          }`}
        >
          {/* Add filter content here */}
          <p className='mb-3 text-sm font-medium'>Catagories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
    <input className='w-3' type='checkbox' value={'Men'}  onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
    <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
    <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/>Kids
            </p>

          </div>
        </div>


        
        {/*Sub Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          }`}
        >
          {/* Add filter content here */}
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
    <input className='w-3' type='checkbox' value={'Topwear'}  onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
    <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
    <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
            </p>

          </div>
        </div>
      </div>
 <div className='flex-1'>
  <div className='flex justify-between text-base sm:text-2xl mb-4'>
    <Title text1={"All"} text2={"COLECTIONS"}/>

    <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
   <option value="relevent">Sort by: Relavent</option>
   <option value="low-high">Sort by: Low To High</option>
   <option value="high-low">Sort by: High To Low</option>

    </select>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filterProducts.map((item, i) => (
          <ProductItem
            key={i}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
 </div>



    </div>
  );
};

export default Collection;
