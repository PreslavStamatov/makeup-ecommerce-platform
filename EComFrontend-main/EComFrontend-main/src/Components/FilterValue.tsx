import React, { useEffect, useState } from 'react'
import { FilterValueType } from '../Models/Product'
import { useProductsContext } from '../Context/useProductContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FilterValue:React.FC<FilterValueType> = ({ filterType, filterValue }) => {
    const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
    const { addFilter, removeFilter, appliedFilters } = useProductsContext();

    useEffect(() => {
        appliedFilters.forEach(appliedFilter => {
            if(appliedFilter.filter===filterValue) {
                setIsFilterApplied(true);
            }
        })
    }, [])
    
  return (
    <div className='filter-value-container ml-2 mr-2 py-3 flex items-center pl-5 rounded-md hover:bg-primaryBg cursor-pointer'
    onClick={() => {
        setIsFilterApplied(!isFilterApplied);
        // isFilterApplied(filterValue);
        if(!isFilterApplied) {
            const appliedFilter = {filterType, filter: filterValue};
            addFilter(appliedFilter);
        } else {
            removeFilter(filterValue);
        }
    }}>
        <div className={`filter-checkbox border-black border-2${isFilterApplied ? 'bg-black border-black' : ''}`}
        style={{borderRadius:'50%', height:'25px', width:'25px'}}>
            {isFilterApplied && <CheckCircleIcon/>}
        </div>
        <p className='filter-value ml-4 text-base font-semibold'>
            {filterValue}
        </p>
    </div>
    
  )
}

export default FilterValue