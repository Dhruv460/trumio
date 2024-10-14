// import React, { useState } from "react";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import tru from "../assets/tru2.jpg";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CompleteProfilePasswordPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     password: "",
//     confirmPassword: "",
//     image: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (formData.image && formData.image.size > 2000000) {
//       toast.error("Project image must be less than 2MB.");
//       setLoading(false);
//       return;
//     }

//     // const formDataToSend = new FormData();
//     // for (const key in formData) {
//     //   formDataToSend.append(key, formData[key]);
//     // }

//     const completeData = {
//       ...location.state.formData,
//       ...formData,
//     };

//     // Sending complete data for registration
//     try {
//       console.log("Form Data:", location.state.formData);
//       console.log("Form Data to Send:", completeData);
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/register",
//         completeData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response.data);
//       const token = response.data.token;
//       localStorage.setItem("token", token);
//       toast.success("Registration successful!");
//       setLoading(false);
//       setTimeout(() => {
//         navigate("/feed");
//       }, 3000);
//     } catch (error) {
//       console.error(
//         "Registration error:",
//         error.response ? error.response.data : error.message
//       );
//       toast.error(
//         "Error registering user: " +
//           (error.response ? error.response.data.message : error.message)
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#0a0f29",
//           backgroundImage: `url(${tru})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       />

//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#000",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           color: "#fff",
//           padding: 4,
//         }}
//       >
//         <Typography variant="h4" sx={{ mb: 3 }}>
//           Set Your Password!
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
//           Please create a password to complete your registration.
//         </Typography>
//         <Box
//           sx={{ width: "100%", maxWidth: "400px" }}
//           component="form"
//           onSubmit={handleSubmit}
//         >
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             inputProps={{ style: { color: "#ffffff" } }}
//             InputLabelProps={{ style: { color: "#ffffff" } }}
//             sx={{
//               backgroundColor: "#0a0f29",
//               border: "1px solid #ffffff",
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#ffffff",
//               },
//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#ffffff",
//               },
//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#ffffff",
//               },
//             }}
//           />
//           <TextField
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             inputProps={{ style: { color: "#ffffff" } }}
//             InputLabelProps={{ style: { color: "#ffffff" } }}
//             sx={{
//               backgroundColor: "#0a0f29",
//               border: "1px solid #ffffff",
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#ffffff",
//               },
//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#ffffff",
//               },
//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#ffffff",
//               },
//             }}
//           />
//           <TextField
//             name="image"
//             type="file"
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             inputProps={{ style: { color: "#ffffff" } }}
//             InputLabelProps={{ style: { color: "#ffffff" } }}
//             sx={{
//               backgroundColor: "#0a0f29",
//               border: "1px solid #ffffff",
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#ffffff",
//               },
//             }}
//           />
//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2, backgroundColor: "#007bff" }}
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Saving... " : "Finish Registration"}
//           </Button>
//         </Box>
//       </Box>
//       <ToastContainer />
//     </Box>
//   );
// };

// export default CompleteProfilePasswordPage;

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import tru from "../assets/tru2.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompleteProfilePasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const completeData = {
      ...location.state.formData,
      ...formData,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        completeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success("Registration successful!");
      setLoading(false);
      setTimeout(() => {
        navigate("/feed");
      }, 1200);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error registering user: " +
          (error.response ? error.response.data.message : error.message)
      );
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#0a0f29",
          backgroundImage: `url(${tru})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <Box
        sx={{
          width: "50%",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          padding: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Set Your Password!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
          Please create a password to complete your registration.
        </Typography>
        <Box
          sx={{ width: "100%", maxWidth: "400px" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              backgroundColor: "#0a0f29",
              border: "1px solid #ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              backgroundColor: "#0a0f29",
              border: "1px solid #ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#007bff" }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving... " : "Finish Registration"}
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CompleteProfilePasswordPage;
