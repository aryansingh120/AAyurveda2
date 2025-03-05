import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, MapPin, Home, User, Leaf, FileText, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
const Navbar = () => {
  const {cartValue,increasefetchCart}=useCart();
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Rajasthan");
  const [userName,setUserName]=useState("");


  const redirect=()=>{
    navigate("/cartDetails")
    increasefetchCart();
  }
  

useEffect(()=>{
  const x=localStorage.getItem("username");
  if(!x)
  setUserName("Login")
  else 
  setUserName(x)
  
  

},[])

  useEffect(() => {
    if (showCities) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCities]);

  const cities = [
    "Agra", "Ahmedabad", "Allahabad", "Amritsar", "Bareilly", "Bengaluru",
    "Bhopal", "Bhubaneswar", "Chandigarh", "Chennai", "Coimbatore", "Delhi",
    "Ghaziabad", "Guwahati", "Gwalior", "Howrah", "Hyderabad", "Indore",
    "Jabalpur", "Jaipur", "Jodhpur", "Kanpur", "Kolkata", "Kota", "Lucknow",
    "Ludhiana", "Madurai", "Meerut", "Mumbai", "Mysuru", "Nagpur", "Nashik",
    "Noida", "Patna", "Pune", "Raipur", "Rajkot", "Ranchi", "Salem", "Surat",
    "Thiruvananthapuram", "Vadodara", "Varanasi",
  ];

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "About Us", icon: <User size={20} /> },
    { name: "Treatments", icon: <Leaf size={20} /> },
    { name: "Products", icon: <ShoppingCart size={20} /> },
    { name: "Blog", icon: <FileText size={20} /> },
    { name: "Contact Us", icon: <Phone size={20} /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCities && !event.target.closest(".cities-dropdown")) {
        setShowCities(false);
        setSelectedCity("Rajasthan");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCities]);

  return (
    <nav className=" bg-white p-4 shadow-md ">
      <div className="container mx-auto flex justify-between items-center h-16">
        <h1 className="text-orange-500 text-2xl font-bold">Aayurveda</h1>

        <div className="hidden md:flex items-center space-x-4 flex-grow ml-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search for Aayurvedic Products & more"
              className="p-3 pl-12 rounded-full w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div
            className="relative flex items-center space-x-2 border border-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-100 cities-dropdown"
            onClick={() => setShowCities(!showCities)}
          >
            <MapPin size={20} className="text-orange-500" />
            <span>{selectedCity}</span>
          </div>
          <Link to={"/login"}>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold">{userName}</button>
          </Link>
          <div className="relative">
            <ShoppingCart className="text-gray-700 cursor-pointer" size={28} onClick={redirect}/>
            <div
              className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center text-sm">{cartValue}</div>
          </div>
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className="md:hidden p-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search for Mobiles, Accessories & More"
            className="p-3 pl-12 rounded-full w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {showCities && (
        <div className="absolute left-0 top-full w-full bg-white shadow-md rounded-md border border-gray-300 z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 overflow-y-auto max-h-80 cities-dropdown">
          {cities.map((city, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setSelectedCity(city);
                setShowCities(false);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
{/* ***************************************************************** */}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white shadow-lg z-20 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div
            className="relative flex items-center space-x-2 border border-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-100 cities-dropdown"
            onClick={() => setShowCities(!showCities)}
          >
            <MapPin size={20} className="text-gray-600" />
            <span>{selectedCity}</span>
          </div>

          <button
            className="text-gray-700"
            onClick={() => {
              setIsOpen(false);
              setShowCities(false);
            }}
          >
            <X size={28} />
          </button>
        </div>

        {showCities ? (
          <div className="p-4 bg-white shadow-md border-t border-gray-300 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 overflow-y-auto max-h-80 cities-dropdown">
            {cities.map((city, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setSelectedCity(city);
                  setShowCities(false);
                }}
              >
                {city}
              </div>
            ))}
          </div>
        ) : (
          <nav className="mt-4 space-y-4 p-4">
            {menuItems.map((item, index) => (
              <a
                href={`#${item.name.toLowerCase().replace(/ /g, "-")}`}
                key={index}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </a>
            ))}
            <Link to={"/login"}>
              <button className="bg-orange-500 text-white px-6 py-[.8rem] rounded-sm font-bold w-full mt-4" onClick={() => setIsOpen(false)}>Login</button>
            </Link>
          </nav>
        )}
      </div>

      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
