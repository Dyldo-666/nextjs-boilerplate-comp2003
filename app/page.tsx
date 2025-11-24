import { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Footer,
  Input,
  Modal,
  Navbar,
  Option,
  Select,
} from "@engame/components";
import {
  dashboardBaseUrl,
  headers,
  loginEndpoint,
  signupEndpoint,
} from "@engame/constants";
import { LoginForm, SignupForm } from "@engame/types";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import useMediaQuery from "src/hooks/useMediaQuery";
import { AppContext } from "src/pages/_app";

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const {
    handleSubmit: handleSubmitLogin,
    control: controlLogin,
    reset: resetLogin,
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit: handleSubmitSignup,
    control: controlSignup,
    reset: resetSignup,
  } = useForm<SignupForm>({
    defaultValues: {
      contactPerson: "",
      email: "",
      password: "",
      contactNumber: "",
      companyName: "",
      industry: "Others",
    },
  });

  const { events } = useRouter();

  const [openLoginModal, setLoginModal] = useState(false);
  const [openSignupModal, setSignupModal] = useState(false);
  const [signupTitle, setSignupModalTitle] = useState<string | undefined>(
    undefined
  );

  const { modalName, handleToggleModal } = useContext(AppContext);

  useEffect(() => {
    setSignupModal(false);
    setLoginModal(false);
    setSignupModalTitle(undefined);

    switch (modalName) {
      case "login":
        setSignupModal(false);
        setLoginModal(true);
        break;
      case "signup":
        setSignupModal(true);
        setLoginModal(false);
        break;
      case "signup2":
        setSignupModal(true);
        setLoginModal(false);
        setSignupModalTitle("Register Now!");
        break;

      default:
        break;
    }
  }, [modalName]);

  const login = async (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      formData.set(key, data[key]);
    }

    await fetch(loginEndpoint, {
      method: "POST",
      body: formData,
      headers: headers,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.code !== 200) {
          toast.error(result.message);
          return;
        }
        console.log("RESULT=>", result);
        window.location.href = dashboardBaseUrl;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const signup = async (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      formData.set(key, data[key]);
    }

    await fetch(signupEndpoint, {
      method: "POST",
      body: formData,
      headers: headers,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.code !== 200) {
          toast.error(result.message);
          return;
        }
        toast.success(
          "Registration successful! Please check your email for your verification email to continue"
        );
        setSignupModal(false);
      })
      .catch((err) => {
        console.error("SIGNUP ERROR=>", err);
      });
  };

  useEffect(() => {
    events.on("routeChangeComplete", () => setShowMenu(false));
    return () => {
      events.off("routeChangeComplete", () => setShowMenu(false));
    };
  }, [events]);

  const LoginModal = () => {
    return (
      <Modal
        isOpen={openLoginModal}
        onCloseModal={() => handleToggleModal("")}
        title="Login"
      >
        <form onSubmit={handleSubmitLogin(login)}>
          <div className="grid grid-cols-1 gap-2">
            <div className="col-span-1">
              <Controller
                name="email"
                control={controlLogin}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    isRequired
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <Controller
                name="password"
                control={controlLogin}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    label="Password"
                    isRequired
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <div className="flex flex-col space-y-2 w-full">
                <button
                  type="submit"
                  className="w-full px-5 py-2 border border-black bg-black text-white rounded font-montserrat font-bold hover:opacity-90 hover:shadow-lg"
                  // onClick={login}
                >
                  Login
                </button>
                <div className="border-t my-8 w-full"></div>
                <a className="font-lato">Don&apos;t have account yet?</a>
                <button
                  onClick={() => handleToggleModal("signup")}
                  className="w-full px-5 py-2 border border-black bg-white text-black rounded font-montserrat font-bold hover:opacity-90 hover:shadow-lg"
                >
                  Create a free account
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  };

  const SignupModal = () => {
    return (
      <Modal
        isOpen={openSignupModal}
        onCloseModal={() => handleToggleModal("")}
        title={signupTitle ?? "Start your free trial now!"}
      >
        <form onSubmit={handleSubmitSignup(signup)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-8">
            <div className="col-span-1 row-span-3 flex items-center">
              <div className="flex-1 flex justify-center items-start relative h-full">
                <img
                  src="/assets/images/07 Free trial/EG---Free-trial(D).png"
                  width={231}
                  height={300}
                  alt="home-2"
                />
              </div>
            </div>
            <div className="col-span-1">
              <p className="font-lato text-xl mb-4">
                Start your free trial now and drive more sales and leads for
                your business from day one. (No risk. No credit card required.)
              </p>
            </div>
            <div className="col-span-1">
              <Controller
                name="contactPerson"
                control={controlSignup}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="contactPerson"
                    type="text"
                    label="Name"
                    isRequired
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <Controller
                name="companyName"
                control={controlSignup}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="companyName"
                    type="text"
                    label="Company Name"
                    isRequired
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <Controller
                name="email"
                control={controlSignup}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    isRequired
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <Controller
                name="password"
                control={controlSignup}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    label="Password"
                    isRequired
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <Controller
                name="contactNumber"
                control={controlSignup}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="contactNumber"
                    type="tel"
                    label="Phone Number"
                    isRequired
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <div className="flex flex-col">
                <label htmlFor="industry" className="font-lato text-md mb-1">
                  Industry <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="industry"
                  control={controlSignup}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Select
                      aria-label="Industry"
                      placeholder="Select an industry"
                      onSelectionChange={onChange}
                    >
                      <Option
                        key="Food and Beverage"
                        textValue="Food and Beverage"
                      >
                        Food and Beverage
                      </Option>
                      <Option key="Retail" textValue="Retail">
                        Retail
                      </Option>
                      <Option
                        key="Fast Moving Consumer Goods"
                        textValue="Fast Moving Consumer Goods"
                      >
                        Fast Moving Consumer Goods
                      </Option>
                      <Option key="Fashion" textValue="Fashion">
                        Fashion
                      </Option>
                      <Option key="Cosmetics" textValue="Cosmetics">
                        Cosmetics
                      </Option>
                      <Option key="Services" textValue="Services">
                        Services
                      </Option>
                      <Option key="Others" textValue="Others">
                        Others
                      </Option>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="col-span-1">
              <button
                type="submit"
                className="mb-2 w-full px-5 py-2 border border-black bg-black text-white rounded font-montserrat font-bold hover:opacity-90 hover:shadow-lg"
              >
                {signupTitle ?? "Start Free Trial"}
              </button>
              <div className="flex flex-row space-x-2">
                <span className="text-black text-lg pt-1">
                  <FiCheckCircle />
                </span>
                <p>
                  By creating an account, I agree to Engame&apos;s{" "}
                  <span className="text-blue-400 hover:text-blue-600 font-lato">
                    Website terms
                  </span>
                  ,{" "}
                  <span className="text-blue-400 hover:text-blue-600 font-lato">
                    Privacy policy
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-400 hover:text-blue-600 font-lato">
                    Licensing terms.
                  </span>
                </p>
              </div>
            </div>
            <div className="col-span-1 pt-4 flex items-center">
              <p className=" font-lato mb-10">
                Already have an account?{" "}
                <a
                  onClick={() => handleToggleModal("login")}
                  className="text-blue-400 hover:text-blue-600 font-lato"
                >
                  Log in here.
                </a>
              </p>
            </div>
          </div>
        </form>
      </Modal>
    );
  };

  const { children } = props;
  return (
    <div className="flex flex-1 flex-col h-screen">
      <Navbar
        isOpen={showMenu && isMobile}
        onClickLogin={() => handleToggleModal("login")}
        onClickStartFreeTrial={() => handleToggleModal("signup")}
        onToggleShowMenu={() => setShowMenu(!showMenu)}
      />
      <div
        className={
          "flex flex-1 flex-col" + (!!showMenu ? "" : " overflow-auto")
        }
      >
        <div id="top"></div>
        {children}
        <Footer />
      </div>
      <LoginModal />
      <SignupModal />
    </div>
  );
};

export { Layout };
