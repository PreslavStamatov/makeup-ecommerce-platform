import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductsFilterType } from '../Models/Product';
import { useProductsContext } from '../Context/useProductContext';
import FilterValue from './FilterValue';

const ProductsFilter:React.FC<ProductsFilterType> = ({name, filterType, filterValues}) => {
    const { addFilter, removeFilter } = useProductsContext();
    const [selectedFilter, setSelectedFilter] = useState('');
    const [isDropdownTriggered, setIsDropdownTriggered] = useState<boolean>(false);
    
    return (
    <div className='product-filter w-11/12 h-fit rounded-lg flex flex-col border
    bg-white text-black'>
        <div className='filter-heading flex justify-between items-center'>
            <p className='filter-text my-4 ml-4 text-lg font-semibold'>{name}</p>
            <div className='expand-icon text-lg mr-4 cursor-pointer'
            onClick={() => setIsDropdownTriggered(!isDropdownTriggered)}>
                <ExpandMoreIcon style={{fontSize:'35px'}}/>
            </div>
        </div>

        <div className='flex flex-col'>
            {isDropdownTriggered && filterValues.map((filter) => <FilterValue filterType={filterType} filterValue={filter}/>)}
        </div>
    </div>
    )
}

export default ProductsFilter