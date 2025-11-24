import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HowItWork,
  Input,
  Layout,
  Option,
  PartnerContent,
  Section,
  Select,
  SubscribePlan,
  TrendingGame,
} from "@engame/components";
import { enquiryEndpoint, headers } from "@engame/constants";
import { EnquiryForm, MediaTypeProps, PageLayoutProps } from "@engame/types";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import GoogleTag from "src/components/Header/GoogleTag";
import Carousel from "src/components/StyledContainer/carousel";
import { HowWork } from "src/components/StyledContainer/HowWork";
import useMediaQuery from "src/hooks/useMediaQuery";
import { AppContext } from "./_app";
import "react-multi-carousel/lib/styles.css";

const Home: PageLayoutProps = () => {
  const {
    handleSubmit: handleSubmitContactUs,
    control: controlContactUs,
    reset: resetContactUs,
  } = useForm<EnquiryForm>({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      company_name: "",
      category: "Others",
      message: "",
    },
  });
  const contactUs = async (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      formData.set(key, data[key]);
    }

    await fetch(enquiryEndpoint, {
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
          "Message sent successfully! Thank you for your interest and we'll get in touch with you shortly!"
        );
      })
      .catch((err) => {
        console.error("CONTACT US ERROR=>", err);
      });
  };

  const { handleToggleModal } = useContext(AppContext);
  const isMobile = useMediaQuery("(max-width: 425px)");

  return (
    <>
      <Head>
        <GoogleTag/>
        <title>Home - Engame</title>
        <meta
          name="Sell More With Tap Master"
          content="Sell More With Tap Master"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
         backgroundImage: `url("/assets/images/EG---bg.jpg")`,
         backgroundAttachment: "fixed",
         backgroundPosition: "center",
         backgroundRepeat: "repeat",
          backgroundSize: "cover",
          perspective: "5px",
        }}
      >
        <div className="relative bg-transparent">
          <Section
            bgColor="bg-transparent"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 md:pt-1">
              <div className="flex flex-col justify-center space-y-2 py-10">
                <p className="text-center md:text-left font-montserrat font-bold pb-1 text-4xl">
                  BOOST YOUR SALES IN 30 DAYS WITH TAP MASTER
                </p>
                <hr className="mx-auto md:mx-0 w-1/4 md:w-1/4 border-black border-2 "/>
                <p className="text-center md:text-left font-montserrat font pb-4 text-xl">
                  Transform your digital marketing strategy with TapMaster, the easy-to-use platform to boost your sales and promote your brand!
                </p>
                <button
                  onClick={() => handleToggleModal("signup")}
                  className="w-full uppercase md:w-60 px-5 py-2 border border-black bg-black text-white rounded font-segoeui font-bold hover:opacity-90 hover:shadow-lg"
                >
                  Sign-Up Now!
                </button>  
              </div>
              <div className="flex flex-col justify-center space-y-2 px-10 py-5">
                <video className="w-full h-full" autoPlay muted loop>
                    <source src="/assets/1280x800.mp4" type="video/mp4" />
                </video>
              </div>          
            </div>
          </Section>
        </div>

        <PartnerContent backgroundImage />
        <div style={{
              backgroundImage: "url('/assets/images/EG---bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex justify-center items-end mb-8 md:mb-0 bg-yellow-400 relative"
        >
        </div>   
        <Carousel/> 
        <div className="bg-white">
          <div
            style={{
              backgroundImage: "url('/assets/images/EG---bg-2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex justify-center items-end mb-8 md:mb-0 bg-yellow-400 relative"
          >
            <Section bgColor={"bg-transparent"}>
              <div className="flex flex-col items-center space-y-2 py-10">
                <p className="font-montserrat font-semibold text-3xl uppercase text-center">
                  Discover What Our Ecosystem Has to Offer - Take a Look!                  
                </p>
                <hr className="mx-auto w-1/4 text-center border-black border-2 "/>
                <hr/>
                <div className="grid grid-cols-1 md:grid-cols-3 ">
                  {[
                    {
                      title: "24,000+",
                      desc: "And Increasing Monthly Players",
                      image_url:
                        "/assets/images/01 Home/EG---Landing-home_icon-1(D).png",
                    },
                    {
                      title: "1,000+",
                      desc: "Monthly Voucher Redemptions",
                      image_url:
                        "/assets/images/01 Home/EG---Landing-home_icon-5(D).png",
                    },
                    {
                      title: "35K+ Hours",
                      desc: "Monthly Play Time",
                      image_url:
                        "/assets/images/01 Home/EG---Landing-home_icon-6(D).png",
                    },
                  ].map((i, k) => (
                    <div
                      key={k}
                      className="flex flex-col justify-start items-center"
                    >
                      <div className="max-w-xs md:h-32 md:w-32 flex justify-center mb-4 rounded-lg overflow-hiddens">
                        <img
                          src={i.image_url}
                          width={800}
                          height={800}
                          alt="home-2"
                        />
                      </div>
                      <p className="text-center font-montserrat font-bold text-3xl md:text-xl inline-block">
                          {i.title}
                      </p>
                      <p className="text-center font-montserrat font-bold text-xl px-10 md:text-base ">
                        {i.desc}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-center font-montserrat font-semibold text-3xl pt-5">
                  Now, Imagine 1% Of This Going To Your Business
                </p>
              </div>
            </Section>
          </div>
        </div>
        <Section>
          <div className="flex flex-col space-y-6 md:space-y-5 py-10">
            <p className="text-center font-montserrat font-semibold text-3xl uppercase">
              No Code! Even Grandmas Can Do It! 
              <hr className="mx-auto w-1/4 md:w-1/4 text-center border-black border-2 mt-2 "/>
            </p>
            <h6 className="text-center font-montserrat font text-2xl">
              Just upload your brand logo or product images to <b>Tap Master</b> and you are good to go!
            </h6>
            <div className="flex flex-col-reverse  md:flex-col items-center ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  {
                    title: "No Coding Needed!",
                    desc: "Our No-Code platform  allows you to create games for your business without writing a single line of code. So easy that even kids can do it!",
                  },
                  {
                    title: "Plenty To Choose From!",
                    desc: "Select your games from our collection of 35 unique games that fit your brand and products, then customise them INSTANTLY to compliment your marketing campaigns and events!",
                  },
                ].map((i, k) => (
                  <div
                    key={`next-${k}`}
                    className="rounded-2xl bg-yellow-100 p-10 flex flex-col justify-normal"
                  >
                    <p className="font-montserrat font-bold text-2xl mb-4">
                      {i.title}
                    </p>
                    <p className="font-lato text-lg">{i.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <h6 className="text-center font-montserrat font-semibold text-2xl">
              Join TapMaster and Watch Your Sales Skyrocket - Subscribe Now!
            </h6>
            <div className="flex justify-center">
              <button
                onClick={() => handleToggleModal("signup")}
                className="w-full uppercase md:w-60 px-5 py-2 border border-black bg-black text-white rounded text-xl font-segoeui font-bold hover:opacity-90 hover:shadow-lg"
              >
                Subscribe Now
              </button>  
            </div>
          </div>
        </Section>
        <div className="bg-white md:pt-8 lg:pt-18 xl:pt-28 2xl:pt-36 ">
          <div
            style={{
              backgroundImage: "url('/assets/images/EG---bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex justify-center items-end mb-8 md:mb-0 bg-yellow-400 md:h-28 lg:h-40 2xl:h-42 relative"
          >
            <div className="h-80 items-end hidden md:flex">
              <img
                src="/assets/images/01 Home/EG---Landing-home_arcade(D).png"
                width={1920}
                height={300}
                alt="home-1"
              />
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <img
            src="/assets/images/01 Home/EG---Landing-home_arcade(M).png"
            width={800}
            height={300}
            alt="home-1"
          />
        </div>
        <HowItWork
          mediaType={MediaTypeProps.video}
          mediaUrl="https://engame.tech/assets/images/1920x700.mp4"
        />
        <HowWork/>
        <TrendingGame />
        <div className="bg-white py-10">
        <Section bgColor="transparent">
          <div className="flex flex-col items-center">
              <p className="font-montserrat font-semibold text-center text-3xl ">
                  SUBSCRIBE AND BOOST SALES TODAY!
              </p>
              <hr className="mt-2 mb-5 mx-auto w-1/3 md:w-1/6 text-center border-black border-2 "/>
              <p className="font-montserrat text-center text-2xl ">
                Get access to Tap Master for less than $3 a day!
              </p>
          </div>
            <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 mb-10" >
                <div className="flex flex-col space-y-2 md:col-span-1 order-first md:order-last">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src="/assets/images/01 Home/home_4.png"
                            max-width= "100%"
                            height="auto"
                            alt="home-1"
                        />
                    </div>
                    <div className="flex justify-center item-center">
                      <button
                        onClick={() => handleToggleModal("signup")}
                        className="w-full uppercase md:w-60 px-5 py-2 border border-black bg-black text-xl text-white rounded font-segoeui font-bold hover:opacity-90 hover:shadow-lg"
                      >
                        Subscribe Now
                      </button>  
                    </div>

                </div>
                <div className="flex flex-col space-y-2 md:col-span-1 ">
                    <ul className="font-montserrat text-left list-decimal text-xl leading-8">
                        <li className="font-semibold text-2xl">Customised Games</li>
                        <p className="py-2">
                          Customize games to match your brand and business from our pool of fun games.
                          {/*Easily customise any games that match your brand and business from our large pool of fun, addictive and entertaining games.*/}
                        </p>
                        <li className="font-semibold text-2xl">Unlimited Vouchers</li>
                        <p className="py-2">
                          Upload as many vouchers as you want into Tap Master for FREE! 
                        </p>
                        <li className="font-semibold text-2xl">Ever-growing player base</li>
                        <p className="py-2">
                          The number of active players on Tap Master is rising day by day, bringing in more customers and more revenue
                        </p>
                        <li className="font-semibold text-2xl">Robust Community</li>
                        <p className="py-2">
                          Join our private network to connect with business owners and stay updated on local and global news.
                          {/*Get access to our Private Social Network and meet other business owners and get the latest updates and news from us, locally and globally.*/}
                        </p>
                        <li className="font-semibold text-2xl">Exciting Events</li>
                        <p className="py-2">
                          Collaborate with us to organize effective online/offline events that promote your products with Tap Master.
                          {/*Let’s work together! Whether it’s online or offline, organizing events to promote your products is always a great sales funnel. With Tap Master, that becomes so much easier! */}
                        </p>
                    </ul>
                </div>
            </div>
        </Section>
        </div>
        <SubscribePlan
          backgroundImage
          backgroundImageUrl="/assets/images/EG---bg-2.jpg"
        />
      </div>
    </>
  );
};

Home.layout = Layout;

export default Home;
