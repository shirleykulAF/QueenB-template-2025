import MentorHeader from "../../components/Mentor/MentorHeader/MentorHeader";
import MentorInfo from "../../components/Mentor/MentorInfo/MentorInfo";
import MentorContact from "../../components/Mentor/MentorContact/MentorContact";
import Tips from "../../components/Tips/Tips";
import { useMentorData } from "../../hooks/useMentorData";
import { useEffect } from "react";

const MentorHome = ( {user} ) => {
  
  const mentorId = user._id;

  const { mentor, loading, error } = useMentorData(mentorId);

  // Debug logging
  useEffect(() => {
    if (mentor) {
      console.log("Mentor data available in component:", mentor);
    }
  }, [mentor]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!mentor) return <div>No mentor data found</div>;

  return (
    <div className="mentor-info">
      <MentorHeader mentor={mentor} />
      <MentorInfo mentor={mentor} />
      <MentorContact mentor={mentor} />
      
      {/* Tips Section */}
      <Tips user={user} />
    </div>
  );
}

export default MentorHome;
