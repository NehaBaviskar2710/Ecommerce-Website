import { Fragment, useEffect, useState, useRef } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { navigation } from "../../../config/navigationMenuNew";
import AuthModal from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import { getUser, logout } from "../../../Redux/Auth/Action";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import SellerAuthModal from "../Auth/SellerAuthModal";

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
  color: #5f6368;
  font-size: 25px;
  margin-left: 5px;
  margin-top: 7px;
`;

const Logo = styled("img")`
  width: 50px;
  height: auto;
`;

const FlexContainer = styled("div")`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const LoginLink = styled("button")`
  text-decoration: none;
  color: #5f6368;
  margin-left: auto;
  margin-right: 20px;
`;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const logo = "images/logos/logo.jpg";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openSellerAuthModal, setOpenSellerAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();

  //adding for submenu open in small screen
  const [openSections, setOpenSections] = useState([]);
  const dropdownRef = useRef(null);

  const toggleSubSection = (categoryName) => {
    // if (openSections.includes(categoryName)) {
    //   setOpenSections(openSections.filter((name) => name !== categoryName));
    // } else {
    //   setOpenSections([...openSections, categoryName]);
    // }
    setOpenSections((prevSubSection) =>
      prevSubSection === categoryName ? null : categoryName
    );
  };

  const isSubSectionOpen = (categoryName) => {
    return openSections === categoryName;
  };

  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (categoryName) => {
    setOpenSections((prevSubSection) =>
      prevSubSection === categoryName ? null : ""
    );
    setOpenSubMenus((prevSubMenu) =>
      prevSubMenu === categoryName ? null : categoryName
    );
  };

  const isSubMenuOpen = (categoryName) => {
    return openSubMenus === categoryName;
  };
  //

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
  }, [jwt]);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleOpenSellerAuth = () => {
    setOpenSellerAuthModal(true);
  };
  const handleCloseSellerAuth = () => {
    setOpenSellerAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.user]);

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    navigate("/");
  };
  const handleMyOrderClick = () => {
    handleCloseUserMenu();
    navigate("/account/order");
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };
  const handleDashboardClick = () => {
    handleCloseUserMenu();
    navigate("/admin");
  };

  return (
    <div className="bg-white pb-10">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* Main menu in vertical layout */}
                  {navigation.categories.map((category) => (
                    <div key={category.name} className="flow-root">
                      <div className="relative group">
                        <button
                          type="button"
                          className={`-m-2 block p-2 font-medium text-gray-900 ${
                            isSubMenuOpen(category.name)
                              ? "border-indigo-600 text-indigo-600"
                              : ""
                          }`}
                          onClick={() => toggleSubMenu(category.name)}
                        >
                          {category.name}
                        </button>
                        {isSubMenuOpen(category.name) && (
                          <div
                            className="bg-white relative z-10 mt-1 p-2 w-48  shadow-lg "
                            style={{ width: "100%" }}
                          >
                            {/* Render sub-items */}
                            <div className="grid grid-cols-2 gap-x-4">
                              {category.featured.map((item) => (
                                <div
                                  key={item.name}
                                  className="group relative text-sm"
                                >
                                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                    <img
                                      src={item.imageSrc}
                                      alt={item.imageAlt}
                                      className="object-cover object-center"
                                    />
                                  </div>
                                  <a
                                    href={item.href}
                                    className="mt-6 block font-medium text-gray-900"
                                  >
                                    <span
                                      className="absolute inset-0 z-10"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                  <p aria-hidden="true" className="mt-1">
                                    Shop now
                                  </p>
                                </div>
                              ))}
                            </div>
                            {/* Render sections and items */}
                            <div className="space-y-6 px-4 py-6">
                              {category.sections.map((section) => (
                                <div key={section.name} className="flow-root">
                                  <div className="relative group">
                                    <button
                                      type="button"
                                      className={`-m-2 block p-2 font-medium text-gray-900 ${
                                        isSubSectionOpen(section.name)
                                          ? "border-indigo-600 text-indigo-600"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        toggleSubSection(section.name)
                                      }
                                    >
                                      {section.name}
                                    </button>
                                    {isSubSectionOpen(section.name) && (
                                      <div
                                        ref={dropdownRef}
                                        className="bg-white relative z-10"
                                        style={{ width: "100%" }}
                                      >
                                        {/* Render sections and items */}
                                        {section.items.map((item) => (
                                          <a
                                            key={item.name}
                                            // href={item.href}
                                            onClick={() => {
                                              navigate(
                                                `/${category.id}/${section.id}/${item.id}`
                                              );
                                            }}
                                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                                          >
                                            {item.name}
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))} */}
                  <div className="flow-root">
                    <a
                      onClick={() => navigate("/about")}
                      className="-m-2 block p-2 font-medium text-gray-900 pe-auto cursor-pointer"
                    >
                      About Us
                    </a>
                  </div>

                  <div className="flow-root">
                    <a
                      onClick={() => navigate("/bulkorders")}
                      className="-m-2 block p-2 font-medium text-gray-900 pe-auto cursor-pointer"
                    >
                      Bulk Orders
                    </a>
                  </div>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    {auth.user ? (
                      <div>
                        <Avatar
                          className="text-white"
                          onClick={handleUserClick}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          // onClick={handleUserClick}
                          sx={{
                            bgcolor: "#9155FD",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          {auth.user?.firstName[0].toUpperCase()}
                        </Avatar>
                        {/* <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Dashboard
                      </Button> */}
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openUserMenu}
                          onClose={handleCloseUserMenu}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleProfile}>Profile</MenuItem>

                          <MenuItem onClick={handleMyOrderClick}>
                            My Orders
                          </MenuItem>
                          {auth.user.role == "ROLE_ADMIN" ? (
                            <MenuItem onClick={handleDashboardClick}>
                              Dashboard
                            </MenuItem>
                          ) : (
                            ""
                          )}
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                      </div>
                    ) : (
                      // <Button
                      //   onClick={handleOpen}
                      //   className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      // >
                      //   Signin
                      // </Button>
                      <div>
                        <Button
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleUserClick}
                        >
                          Signin
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openUserMenu}
                          onClose={handleCloseUserMenu}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleOpen}>User Sign in</MenuItem>

                          <MenuItem onClick={handleOpenSellerAuth}>
                            Seller Sign in
                          </MenuItem>
                        </Menu>
                      </div>
                    )}
                  </div>
                </div>

                {/* Favourite */}
                <div className="border-t border-gray-200 px-4 py-6">
                  <div className="ml-1 flow-root lg:ml">
                    <Button
                      onClick={() => navigate("/cart")}
                      className="group -m-2 flex items-center p-2"
                    >
                      <HeartIcon
                        className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />

                      <span className="pl-3"> View Favourites</span>
                    </Button>
                  </div>
                </div>

                {/* Cart */}
                <div className="border-t border-gray-200 px-4 py-6">
                  <div className="ml-1 flow-root lg:ml">
                    <Button
                      onClick={() => navigate("/cart")}
                      className="group -m-2 flex items-center p-2"
                    >
                      <ShoppingBagIcon
                        className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span
                        className="text-sm font-medium text-gray-700 group-hover:text-gray-800"
                        style={{ color: "#9155FD" }}
                      >
                        {cart.cart?.totalItem}
                      </span>
                      <span className="pl-3"> View Bag</span>
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p
          className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{ backgroundColor: "black" }}
        >
          Free Shipping + Free Returns
        </p>

        <nav aria-label="Top" className="mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              {/*<div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  
                  <FlexContainer>
            <Logo src="images/logos/logo.jpg" alt="logo" />
            <Heading>Kalakriti</Heading>
          </FlexContainer>
                </Link>
              </div>
              <div className="ml-4 flex lg:ml-0">
                <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
          <FlexContainer>
            <Logo src={logo} alt="logo" />
            <Heading>Kalakriti</Heading>
          </FlexContainer>
        </Link>
              </div>
                  */}

              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    src="https://giveasmile.frappe.cloud/files/Kalakriti.png"
                    alt="Kalakriti"
                    className="h-8 w-8 mr-2"
                    style={{ height: "60px", width: "100px" }}
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex m-0"
                                              >
                                                {/* <a href={item.href}> */}
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="cursor-pointer hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </p>
                                                {/* </a> */}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {/* {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      // onClick={()=> navigate({page.href})}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))} */}
                  <a
                    onClick={() => navigate("/about")}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                  >
                    About Us
                  </a>
                  <a
                    onClick={() => navigate("/bulkorders")}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                  >
                    Bulk Orders
                  </a>
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={handleUserClick}
                        sx={{
                          bgcolor: "#9155FD",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                      {/* <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Dashboard
                      </Button> */}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>

                        <MenuItem onClick={handleMyOrderClick}>
                          My Orders
                        </MenuItem>
                        {auth.user.role == "ROLE_ADMIN" ? (
                          <MenuItem onClick={handleDashboardClick}>
                            Dashboard
                          </MenuItem>
                        ) : (
                          ""
                        )}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    // <Button
                    //   onClick={handleOpen}
                    //   className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    // >
                    //   Signin
                    // </Button>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Signin
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleOpen}>User Sign in</MenuItem>

                        <MenuItem onClick={handleOpenSellerAuth}>
                          Seller Sign in
                        </MenuItem>
                      </Menu>
                    </div>
                  )}
                </div>

                {/* Favourite */}
                <div className="ml-8 flex lg:ml-6">
                  <p className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Favourite</span>
                    <HeartIcon className="h-8 w-8 mt-3" aria-hidden="true" />
                    {/* <i class="bi bi-heart"></i> */}
                  </p>
                </div>

                {/* Cart */}
                <div className="ml-1 flow-root lg:ml">
                  <Button
                    onClick={() => navigate("/cart")}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span
                      className="text-sm font-medium text-gray-700 group-hover:text-gray-800"
                      style={{ color: "#9155FD" }}
                    >
                      {cart.cart?.totalItem}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={handleClose} open={openAuthModal} />
      <SellerAuthModal
        handleClose={handleCloseSellerAuth}
        open={openSellerAuthModal}
      />
    </div>
  );
}
