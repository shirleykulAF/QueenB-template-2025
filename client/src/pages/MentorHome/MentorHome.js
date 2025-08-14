import MentorHeader from "../../components/MentorHeader/MentorHeader";
import MentorInfo from "../../components/MentorInfo/MentorInfo";
import MentorContact from "../../components/MentorContact/MentorContact";
import { useMentorData } from "../../hooks/useMentorData";
import { useEffect } from "react";

const MentorHome = () => {
  
  const mentorId = "6894e568d3a1b111f32f2d99"; // TODO - replace with dynamic source

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
    </div>
  );
}

export default MentorHome;
