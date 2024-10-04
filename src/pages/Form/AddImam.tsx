import { useState } from 'react';
import { createUser } from '../../redux/slice/authSlice';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddImam = () => {

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "", 
    email: "",
    phone: "",
    password: "",
    phoneNumber:"",
    role: "IMAM",
    profilePic: null, 
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setUserData(prevData => ({ ...prevData, profilePic: file }));
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };


  console.log(userData.profilePic,"hhe")
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.email.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }


    setLoading(true);
    try {
      const user = {
        first_name: userData.firstname,
        last_name: userData.lastname,
        other_name: userData.firstname + " " + userData.lastname,
        email: userData.email,
        phone_number: userData.phoneNumber,
        password: userData.password,
        profile_pic: userData.profilePic, 
        confirm_password: userData.password,
        role: userData.role
      }

      await dispatch(await (createUser(user) as unknown as Promise<any>)).unwrap();
      // navigate("/auth/verifyotp", { state: { email: user.email } });
      // dispatch(addUser(user));
    } catch (error) {
      console.log(error, "hjhe");
      // alert('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Add New Imam" />

      <div className="flex justify-center items-center w-[100%]">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark w-[100%]">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add New Imam
              </h3>
            </div>
            <form action="#" onSubmit={handleOnSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      value={userData.firstname}
                      onChange={handleOnChange}
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      value={userData.lastname}
                      onChange={handleOnChange}
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={handleOnChange}
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                   phone number
                  </label>
                  <input
                     value={userData.phoneNumber}
                     onChange={handleOnChange}
                    type="phone number"
                    placeholder="phone number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* <SelectGroupOne /> */}

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Add Imam
                </button>
              </div>
            </form>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default AddImam;
