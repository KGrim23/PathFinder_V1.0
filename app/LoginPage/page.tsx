// "use client";
// import React, { useEffect, useState } from "react";
// import { ClerkProvider, SignIn } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// export default function LoginPage() {
//   const [mounted, setMounted] = useState(false); // Track if component is mounted
//   const [isClerkEnabled, setIsClerkEnabled] = useState(false); // Track if Clerk is enabled
//   const router = useRouter();

//   useEffect(() => {
//     setMounted(true);
//     setIsClerkEnabled(process.env.NEXT_PUBLIC_USE_CLERK === "true"); // Check environment variable
//   }, []);

//   // If not mounted, return null to avoid server-side issues
//   if (!mounted) {
//     return null;
//   }

//   // If Clerk is disabled, show a login button
//   if (!isClerkEnabled) {
//     return (
//       <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-gray-800">
//         <Image src="/pathfinder1.png" alt="Logo" width={200} height={200} />
//         <button
//           onClick={() => router.push("/LandingPage")}
//           className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition duration-300"
//         >
//           Test Login
//         </button>
//       </div>
//     );
//   }

//   // If Clerk is enabled, render the SignIn component
//   return (
//     <ClerkProvider>
//       <div
//         className="relative min-h-screen flex flex-col items-center justify-center bg-gray-700 text-white overflow-hidden"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle farthest-corner at -8.9% 51.2%, rgba(255,124,0,1) 0%, rgba(255,124,0,1) 15.9%, rgba(255,163,77,1) 15.9%, rgba(255,163,77,1) 24.4%, rgba(19,30,37,1) 24.5%, rgba(19,30,37,1) 66%)",
//         }}
//       >
//         <div className="z-10 w-full max-w-md px-4 space-y-8">
//           <SignIn
//             routing="hash"
//             appearance={{
//               elements: {
//                 formButtonPrimary:
//                   "bg-white text-black hover:bg-gray-200 rounded-xl",
//                 card: "bg-gray-300 rounded-xl",
//                 headerTitle: "text-black text-xl font-bold",
//                 headerSubtitle: "text-gray-700",
//                 socialButtonsBlockButton:
//                   "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700",
//                 formFieldInput:
//                   "bg-gray-400 border-gray-700 text-white placeholder-gray-400 rounded-xl",
//                 footerActionLink: "text-gray-400 hover:text-white",
//               },
//             }}
//             afterSignInUrl="/LandingPage"
//           />
//         </div>
//       </div>
//     </ClerkProvider>
//   );
// }

// // import React from "react";
// // import { ClerkProvider, SignIn } from "@clerk/nextjs";

// // export default function LoginPage() {
// //   return (
// //     <ClerkProvider>
// //       <div
// //         className="relative min-h-screen flex flex-col items-center justify-center bg-gray-700 text-white overflow-hidden"
// //         style={{
// //           backgroundImage:
// //             "radial-gradient(circle farthest-corner at -8.9% 51.2%, rgba(255,124,0,1) 0%, rgba(255,124,0,1) 15.9%, rgba(255,163,77,1) 15.9%, rgba(255,163,77,1) 24.4%, rgba(19,30,37,1) 24.5%, rgba(19,30,37,1) 66%)",
// //         }}
// //       >
// //         <div className="z-10 w-full max-w-md px-4 space-y-8">
// //           <SignIn
// //             routing="hash"
// //             appearance={{
// //               elements: {
// //                 formButtonPrimary:
// //                   "bg-white text-black hover:bg-gray-200 rounded-xl",
// //                 card: "bg-gray-300 rounded-xl",
// //                 headerTitle: "text-black text-xl font-bold",
// //                 headerSubtitle: "text-gray-700",
// //                 socialButtonsBlockButton:
// //                   "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700",
// //                 formFieldInput:
// //                   "bg-gray-400 border-gray-700 text-white placeholder-gray-400 rounded-xl",
// //                 footerActionLink: "text-gray-400 hover:text-white",
// //               },
// //             }}
// //             afterSignInUrl="/LandingPage"
// //           />
// //         </div>
// //       </div>
// //     </ClerkProvider>
// //   );
// // }
