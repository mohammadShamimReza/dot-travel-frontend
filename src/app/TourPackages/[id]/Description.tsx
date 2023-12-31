"use client";
import { useUser } from "@/lib/UserProvider";
import { usePackageTourByIdQuery } from "@/redux/api/packageApi";
import { IPackageReviewAndRating } from "@/types";
import { Avatar, Card, Rate } from "antd";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BookingModal from "./BookingModal";

const PropertyDescriptionPage = () => {
  const { user } = useUser();
  const { id } = user;
  const pathName = usePathname();
  const parts = pathName.split("/");
  const desiredPart = parts[parts.length - 1];

  const { data: tourPackageDatas } = usePackageTourByIdQuery(desiredPart);

  const tourPackageData = tourPackageDatas?.data;

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  console.log(tourPackageData);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {" "}
      <div className="flex space-x-4">
        <div className="w-3/4">
          {!tourPackageData?.packageImage ? (
            <Card style={{ width: 250, marginTop: 16 }} loading={true}>
              <Card.Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          ) : (
            <Image
              src={tourPackageData?.packageImage}
              width={300}
              height={300}
              alt={"this is tour package image  "}
              // className="rounded-full"
            />
          )}

          <br />
          <br />
          <br />
          <p className=" text-lg mb-4">
            Desctiption:{" "}
            <span className="text-blue-600">
              {" "}
              {tourPackageData?.description}
            </span>
            <br />
            From: {tourPackageData?.from}
            <br />
            TO: {tourPackageData?.to}
            <br />
            Capability: {tourPackageData?.maxUser}
          </p>
          <br />
          <div className="">
            {tourPackageData?.packageReviewAndRating?.map(
              (packaged: IPackageReviewAndRating) => (
                <div key={packaged.id} className="">
                  <div className="flex justify-center  text-blue-600 text-lg">
                    Reviews & Ratings
                  </div>
                  <br />
                  <br />
                  <div className="flex justify-left align-middle gap-5 border p-5 rounded-lg">
                    {/* <MdTour className="w-8 h-8 hover:text-blue-600 text-blue-500" /> */}
                    <Image
                      src={
                        packaged.user.profileImage ||
                        "https://i.ibb.co/mHJTv57/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                      }
                      width={40}
                      height={40}
                      // layout="responsive"
                      // objectFit="cover"
                      alt="package image"
                      className=""
                    ></Image>
                    <div className="">
                      <span>
                        <Rate
                          disabled
                          defaultValue={parseInt(packaged.rating)}
                        />
                      </span>
                      <p className="text-blue-600 ">{packaged.review}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="w-1/4">
          {/* Sticky card */}
          <div className="sticky top-0">
            <Card className="rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold mb-4">
                {tourPackageData?.title}
              </h1>
              <div className="mb-4">
                <br />
                From: {tourPackageData?.from}
                <br />
                TO: {tourPackageData?.to}
                <br />
                Deatination: {tourPackageData?.destination}
                <br />
              </div>

              <p className="text-blue-600 font-semibold">
                Total: ${tourPackageData?.price}
              </p>
              <BookingModal tourPackageData={tourPackageData} userId={id} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDescriptionPage;
