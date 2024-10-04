import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMosque , createMosque} from '../../redux/slice/mosqueSlice';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import axios from 'axios';
import { AppDispatch, RootState } from '../../redux/store/Store';

const AddMosque = () => {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const [addMosqueData, setAddMosqueData] = useState({
    mosqueName: "",
    email: "",
    phone: "",
    imamName: "",
    content: "",
    donation: [],
  });

  console.log(token,"heyyss")

  const [location, setLocation] = useState({
    lat: 37.78825,
    long: -122.4324,
    locationDisplayName: ""
  });

  // const [locationOptions, setLocationOptions] = useState([]);

  const handleUpdateState = (name: string, value: string) => {
    setAddMosqueData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = (e: { preventDefault: () => void; }) => {

    e.preventDefault()
    const formData = new FormData();
    formData.append('name', addMosqueData.mosqueName);
    formData.append('mail', addMosqueData.email);
    formData.append('tel', addMosqueData.phone);
    formData.append('imam', addMosqueData.imamName);
    formData.append('description', addMosqueData.content);
    formData.append('location', location.locationDisplayName);
    formData.append('lat', location.lat)
    formData.append('long', location.long);
    // dispatch(addMosque({ mosqueData: formData}))
    dispatch(createMosque({ mosqueData: formData,  token: token })).unwrap()
  };

  const handleLocationBlur = async (input: string) => {
    try {
      const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: 'pk.47848036c9bfb7540f8cf9c7c2c25729',
          q: input,
          format: 'json'
        }
      });

      if (response.data.length > 0) {
        const options = response.data.map((item: { display_name: any; lat: string; lon: string; }) => ({
          label: item.display_name,
          value: {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
            locationDisplayName: item.display_name
          }
        }));
        // setLocationOptions(options);
      } else {
        alert("Could not retrieve location details. Please try again.");
      }
    } catch (error) {
      alert("Error fetching location details.");
    }
  };

  // const handleLocationSelect = (selectedLocation) => {
  //   setLocation(selectedLocation);
  //   setLocationOptions([]);
  // };


  return (
    <>
      <Breadcrumb pageName="Add New Mosque" />
      <div className="flex justify-center items-center w-[100%] ">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark w-[100%]">
          <div className="border-b border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-4 px-6.5">
            <h3 className="font-medium text-black dark:text-white ">
              Add New Mosque
            </h3>
          </div>
          <form onSubmit={handleOnSubmit} className='w-[100%] '>
            <div className="p-6.5  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Mosque Name
                  </label>
                  <input
                    type="text"
                    value={addMosqueData.mosqueName}
                    onChange={(e) => handleUpdateState("mosqueName", e.target.value)}
                    placeholder="Enter mosque name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={addMosqueData.email}
                    onChange={(e) => handleUpdateState("email", e.target.value)}
                    placeholder="Enter email"
                   className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="tel"
                  value={addMosqueData.phone}
                  onChange={(e) => handleUpdateState("phone", e.target.value)}
                  placeholder="Enter phone number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Imam Name
                </label>
                <input
                  type="text"
                  value={addMosqueData.imamName}
                  onChange={(e) => handleUpdateState("imamName", e.target.value)}
                  placeholder="Enter Imam's name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Location
                </label>
                <input
                  type="text"
                  value={location.locationDisplayName}
                  onBlur={(e) => handleLocationBlur(e.target.value)}
                  onChange={(e) => setLocation({ ...location, locationDisplayName: e.target.value })}
                  placeholder="Enter location"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Additional Info
                </label>
                <textarea
                  value={addMosqueData.content}
                  onChange={(e) => handleUpdateState("content", e.target.value)}
                  placeholder="Enter additional information"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  rows={4}
                />
              </div>

              <button type="submit" className="w-full flex justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">
                Add Mosque
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMosque;

