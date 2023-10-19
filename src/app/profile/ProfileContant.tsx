"use client";
import PackageReviewModal from "@/components/ui/modal/package/PackageReviewModal";
import {
  useBookPackageTourByIdQuery,
  useDeleteBookPackageTourMutation,
} from "@/redux/api/bookPackageApi";
import { useUsersByIdQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { IBookPackage } from "@/types";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import { MdTour } from "react-icons/md";

function ProfileContant() {
  const { id, role, email } = getUserInfo() as any;
  const { data, isLoading } = useUsersByIdQuery(id);
  const { data: BookTourdata } = useBookPackageTourByIdQuery(id);
  const [deleteBookPackageTour] = useDeleteBookPackageTourMutation();
  console.log(BookTourdata, "book data");

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center mt-6">
        <Avatar size={200} src={data?.profileImg} />
        <br />
        <br />
        <Card style={{ width: 400, marginTop: 16 }} loading={true}>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      </div>
    );
  }

  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center mt-6">
        <Avatar size={200} src={data?.profileImg} />
        <br />
        <br />
        <p className="text-lg font-semibold my-2 text-pink-600">
          {data?.firstName} {data?.lastName}
        </p>
        <p className="text-gray-500 my-1">{data?.email}</p>
        <p className="text-gray-500 my-1">{data?.address}</p>
        <p className="text-gray-500 my-1">{data?.phone}</p>
        <p className="text-gray-500 my-1">Role: {data?.role}</p>
      </div>
      <br />
      <br />
      <br />
      <p className="text-center text-5xl, text-pink-600">My Tour Packages</p>
      <br />
      <br />
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {BookTourdata?.map((packaged: IBookPackage) => (
          <Card
            key={packaged.id}
            title={packaged.package.title}
            extra={<a href="#"></a>}
            style={{ width: 250 }}
            className="hover:shadow-lg "
          >
            <div className="">
              <Link
                href={`/TourPackages/${packaged.packageId}`}
                className="text-black hover:text-purple-600"
              >
                <div className="flex justify-center align-middle">
                  <MdTour className="w-8 h-8 hover:text-pink-600 text-pink-500" />
                </div>
                <p>Price: {packaged.package.price}</p>
                <p>from: {packaged.package.from}</p>
                <p>to: {packaged.package.to}</p>
              </Link>
            </div>

            <br />
            <p className="flex justify-evenly">
              <div className="">
                <PackageReviewModal userId={id} packaged={packaged} />
              </div>

              <button onClick={() => deleteBookPackageTour(packaged.id)}>
                {" "}
                <AiFillDelete className="h-5 w-5 hover:text-pink-600 text-pink-500 hover:cursor-pointer transition duration-300 transform hover:scale-125" />
              </button>
            </p>
          </Card>
        ))}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default ProfileContant;