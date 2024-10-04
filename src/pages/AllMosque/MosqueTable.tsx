import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMosqueData } from '../../redux/slice/mosqueSlice';
import { AppDispatch, RootState } from '../../redux/store/Store';

const itemsPerPage = 10; 

let baseURL = "http://13.244.112.116:8000";
const MAX_LENGTH = 30;

interface TableProps {
  token: string;
}


const MosqueTable: React.FC<TableProps> = ({ token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();
  const mosques = useSelector((state: RootState) => state.mosque.mosques);
  
  useEffect(() => {
    if (token) {
      setLoading(true);
      dispatch(getAllMosqueData(token))
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch((error: string) => {
          setLoading(false);
          setErrorMessage('Failed to fetch mosque data. Please try again later.');
          console.error('Failed to fetch mosque data:', error);
        });
    }
  }, [token, dispatch]);

  const filteredData = mosques.filter((mosque) =>
    mosque.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMosques = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

 // Adjust this value to control the truncation length

// const MosqueLocation = ({ mosque }) => {
//   const trimmedLocation = mosque.location.length > MAX_LENGTH
//     ? `${mosque.location.substring(0, MAX_LENGTH)}...`
//     : mosque.location;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">Nearby Mosques</h4>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md focus:outline-none"
        />
      </div>

      {loading && <p>Loading data...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center cursor-pointer">
          <p className="font-medium">Mosque Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex cursor-pointer">
          <p className="font-medium">Location</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Imam Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {currentMosques.map((mosque, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                {mosque.image ? (
                  <img     src={`${baseURL}${mosque.image}`} alt="mosque" />
                ) : (
                  <p>No image available</p> 
                )}
              </div>
              <p className="text-sm text-black dark:text-white">{mosque.name}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{ mosque.location.length > MAX_LENGTH
  ? `${mosque.location.slice(0, MAX_LENGTH)}...`
  : mosque.location}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">${mosque.imam}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
              Edit
            </button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between py-4 px-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MosqueTable;