import React from "react"
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import Image from "next/image"

function MemberCard() {
  const members = [
    {
      id: 1,
      fullname: "Sandesh Lamichhane",
      role: "Founder & Chairman",
      image: "/member.svg",
    },
    {
      id: 2,
      fullname: "Suman Pandey",
      role: "Managing Director",
      image: "/member.svg",
    },
    {
      id: 3,
      fullname: "Biplav Bhusal",
      role: "Product Designer",
      image: "/member.svg",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row sm:flex-wrap grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-40 gap-10">
      {members.map((member) => (
        <div
          key={member.id}
          className="w-60 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-101 py-4 px-2"
        >
          <div className="bg-gray-200 rounded-2xl overflow-hidden mb-4">
            <Image
              src={member.image}
              alt="member_dummy_image"
              className="object-cover w-full h-full"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <h3 className="text-xl font-bold text-gray-900">
              {member.fullname}
            </h3>
            <p className="text-gray-600">{member.role}</p>
            <div className="flex justify-start space-x-4 mt-2">
              <a href="#">
                <FaTwitter className="w-5 h-5 hover:text-blue-500" />
              </a>
              <a href="#">
                <FaInstagram className="w-5 h-5 hover:text-pink-500" />
              </a>
              <a href="#">
                <FaLinkedinIn className="w-5 h-5 hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MemberCard