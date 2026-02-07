import React from "react";
import dayjs from "dayjs";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase.config";

function JobCard(props) {
  const postedDate = dayjs(props.postedOn);
  const diffInDays = dayjs().diff(postedDate, "day");

  const handleApply = async () => {
    const currentUserRaw = localStorage.getItem("user"); // ✅ match Auth storage
    if (!currentUserRaw) {
      alert("Please login first!");
      return;
    }

    const currentUser = JSON.parse(currentUserRaw);
    const email = currentUser.email.trim().toLowerCase(); // ✅ normalize

    try {
      const applicationsRef = collection(db, "applications");

      // Check if already applied
      const existingQuery = query(
        applicationsRef,
        where("jobId", "==", props.id),
        where("userId", "==", email)
      );
      const snapshot = await getDocs(existingQuery);

      if (!snapshot.empty) {
        alert("You have already applied for this job!");
        return;
      }

      // Add application
      await addDoc(applicationsRef, {
        jobId: props.id,
        userId: email,
        status: "Pending",
        appliedOn: serverTimestamp(),
      });

      alert("Application submitted!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-40 mb-4">
      <div className="flex justify-between items-center px-6 py-4 bg-zinc-800 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103 text-white">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-lg font-semibold">{props.title} - {props.company}</h1>
          <p className="text-white">{props.type} &#x2022; {props.experience} &#x2022; {props.location}</p>
          <div className="flex items-center gap-2">
            {props.skills?.map((skill, i) => (
              <p key={i} className="text-gray-300 py-1 px-2 rounded-md border border-white">{skill}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-gray-400">
            Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago
          </p>

          <button
            onClick={handleApply}
            className="text-white bg-blue-500 border border-blue-500 px-10 py-2 rounded-md hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
