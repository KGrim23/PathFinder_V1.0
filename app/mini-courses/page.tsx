"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const courses = [
  {
    id: "unlocking-your-potential-a-guide-to-self-moti-638657017233065814",
    title: "Unlocking Your Potential: A Guide to Self-Motivation",
    description: "A comprehensive guide to help you boost self-motivation.",
    image:
      "https://cdn.minicoursegenerator.com/production/images/kalaya638657015031762583/AI_ed8305cd-25ea-4fd2-8647-baa1c20bf934.jpg", // Ensure this is a valid URL
  },
];

const CourseList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 lg:p-8">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Mini Courses
      </h1>
      <div className="flex justify-center">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/mini-courses/${course.id}`}
            className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 p-4 transform transition duration-300 hover:scale-105"
          >
            <Image
              src={course.image} // Use the image URL from the course object
              alt={course.title}
              width={400} // Set the desired width
              height={240} // Set the desired height
              className="object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {course.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {course.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
