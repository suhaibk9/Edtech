import aboutMainImage from "../assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

const AboutUsPage = () => {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white items-center w-full h-full">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2  space-y-10">
            <h1>Affordable and Quality Education</h1>
            <p>
              Our mission is to democratize education by making high-quality
              courses accessible to everyone, everywhere. Whether you're looking
              to switch careers, upskill in your current role, or simply explore
              a new passion, we have the perfect course for you.
            </p>
          </section>
          <div className="flex justify-center items-center w-[50%]">
            <img
              src={aboutMainImage}
              alt="aboutMainImage"
              className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </div>
        </div>
        <div className="carousel w-1/2 my-16 m-auto">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarouselSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlides={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
};
export default AboutUsPage;
