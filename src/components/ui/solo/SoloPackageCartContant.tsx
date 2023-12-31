import { Card, Carousel } from "antd";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import heroImage1 from "../../../assets/heroImage1.jpg";
import { TourPackageData } from "../packagesTour/tourCommon";

interface TourPackageProps {
  tourPackage: TourPackageData;
}

const SoloPackageCartContant: React.FC<TourPackageProps> = ({
  tourPackage,
}) => {
  const {
    title = "Tour Package",
    description = "Tour Package Description and Features",
    images,
    pricing = "455",
    availability = "INSTOCK",
    locationFrom = "Dhaka",
    locationTo = "Chittagong",
    contactInfo = "0140141111",
    userReviews = "Great",
    relatedContent = "Nothing",
  } = tourPackage;
  return (
    <Card
      // title={title}
      hoverable
      style={{ height: "350px" }}
      bodyStyle={{ padding: 0 }}
      bordered={false}
    >
      <div className="tour-images ">
        <Carousel autoplay>
          {images.map(
            (
              image: string | StaticImport,
              index: React.Key | null | undefined
            ) => (
              <div className="w-full " key={index}>
                {" "}
                <Image
                  src={image}
                  key={index}
                  // width={100}
                  // height={100}
                  style={{ width: "100%" }}
                  alt="hrro bannar 1"
                  className="rounded-xl rounded-b-none"
                />
              </div>
            )
          )}
        </Carousel>
      </div>
      <div className="p-3">
        <Image
          src={heroImage1}
          height={50}
          width={50}
          alt="host image"
          className="w-12 h-12 rounded-full border-2 "
        />

        <div className="flex items-center justify-between">
          <p>{locationFrom}</p>

          <p>{userReviews}</p>
        </div>
        <p>$ {pricing}</p>
        <p>Availability: {availability}</p>
      </div>
    </Card>
  );
};

export default SoloPackageCartContant;
