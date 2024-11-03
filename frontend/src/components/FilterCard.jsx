import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Industry",
    Array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "Mobile App Developer", "Cybersecurity Analyst", "Cloud Architect", "UX/UI Designer", "Product Manager", "Blockchain Developer", "Software Engineer", "Data Engineer", "QA Engineer"]
  },
  {
    filterType: "Location",
    Array: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Chandigarh"]
  },
  {
    filterType: "Salary Range",
    Array: ["0-40k", "40k-80k", "80k-1.2L", "1.2L-1.6L", "1.6L-2L", "2L-3L", "3L-5L", "5L-8L", "8L-10L", "10L+"]
  }
];

const FilterCard = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    setSelectedValues(prev => {
      const newValues = prev[filterType] ? [...prev[filterType]] : [];
      if (newValues.includes(value)) {
        return { ...prev, [filterType]: newValues.filter(item => item !== value) };
      } else {
        return { ...prev, [filterType]: [...newValues, value] };
      }
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValues));
  }, [selectedValues]);

  return (
    <div className="h-[600px] overflow-y-auto custom-scrollbar p-4 border border-gray-400 rounded-md">
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      {filterData.map((data, index) => (
        <div key={index}>
          <h2 className='font-bold text-lg mt-4'>{data.filterType}</h2>
          {data.Array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div className='flex items-center space-x-2 my-2' key={itemId}>
                <input
                  type="checkbox"
                  id={itemId}
                  value={item}
                  checked={selectedValues[data.filterType]?.includes(item) || false}
                  onChange={() => changeHandler(data.filterType, item)}
                />
                <label htmlFor={itemId}>{item}</label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
