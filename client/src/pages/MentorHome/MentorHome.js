import MentorHeader from "../../components/Mentor/MentorHeader/MentorHeader";
import MentorInfo from "../../components/Mentor/MentorInfo/MentorInfo";
import MentorContact from "../../components/Mentor/MentorContact/MentorContact";
import { useMentorData } from "../../hooks/useMentorData";
import { useEffect } from "react";
import "./MentorHome.css";

const MentorHome = ( {user} ) => {
  
  const mentorId = user._id;

  const { mentor, loading, error } = useMentorData(mentorId);

  // Debug logging
  useEffect(() => {
    if (mentor) {
      console.log("Mentor data available in component:", mentor);
    }
  }, [mentor]);
  
  if (loading) return <div className="mentor-home-container loading">Loading...</div>;
  if (error) return <div className="mentor-home-container error">Error: {error.message}</div>;
  if (!mentor) return <div className="mentor-home-container error">No mentor data found</div>;

  return (
    <div className="mentor-home-container">
      <div className="mentor-info">
        <MentorHeader mentor={mentor} />
        <MentorInfo mentor={mentor} />
        <MentorContact mentor={mentor} />
      </div>
    </div>
  );
}

export default MentorHome;
