import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="relative left-0 bottom-0 h-[10vh] w-full flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 py-5 px-10">
        <section className="text-lg">
          <p>© 2026 EdTech. All rights reserved.</p>
        </section>
        <section className="flex justify-center items-center gap-4 text-2xl text-white duration-300">
          <Link className=" hover:text-yellow-500 transition-all ease-in-out">
            <BsFacebook />
          </Link>
          <Link className=" hover:text-yellow-500 transition-all ease-in-out">
            <BsInstagram />
          </Link>
          <Link className=" hover:text-yellow-500 transition-all ease-in-out">
            <BsLinkedin />
          </Link>
          <Link className=" hover:text-yellow-500 transition-all ease-in-out">
            <BsTwitter />
          </Link>
        </section>
      </footer>
    </>
  );
};
export default Footer;
