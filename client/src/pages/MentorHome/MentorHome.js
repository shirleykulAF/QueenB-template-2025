import MentorHeader from "../../components/Mentor/MentorHeader/MentorHeader";
import MentorInfo from "../../components/Mentor/MentorInfo/MentorInfo";
import MentorContact from "../../components/Mentor/MentorContact/MentorContact";
import { useMentorData } from "../../hooks/useMentorData";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./MentorHome.css";

const MentorHome = ( {user} ) => {
  
  const mentorId = user._id;

  const { mentor, loading, error } = useMentorData(mentorId);
  const navigate = useNavigate();

  // Debug logging
  useEffect(() => {
    if (mentor) {
      console.log("Mentor data available in component:", mentor);
    }
  }, [mentor]);
  
  if (loading) return <div className="mentor-home-container loading">Loading...</div>;
  if (error) return <div className="mentor-home-container error">Error: {error.message}</div>;
  if (!mentor) return <div className="mentor-home-container error">No mentor data found</div>;

  const handleEditClick = () => {
    navigate('/mentor/edit', { state: { mentorData: user } });
  };

  return (
    <div className="mentor-home-container">
      <div className="mentor-info">
        <h1>Welcome, {mentor.name}!</h1>
        <MentorHeader mentor={mentor} />
        <MentorInfo mentor={mentor} />
        <MentorContact mentor={mentor} />
        <button onClick={handleEditClick} className="edit-profile-button">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default MentorHome;
